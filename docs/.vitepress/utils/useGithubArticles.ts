import { Octokit } from "@octokit/rest";
import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import { components } from "@octokit/openapi-types";
import matter from "gray-matter";
import useViteEnv from "./useViteEnv.ts";
import useBasicFrontmatter from "./useBasicFrontmatter.ts";
import type { BasicFrontmatter } from "./useBasicFrontmatter.ts";

export default function useGithubArticles() {
	const { getEnv } = useViteEnv();
	const env = getEnv();
	const octokit = new Octokit({
		auth: env.VITE_GITHUB_TOKEN,
	});

	type Contents = GetResponseTypeFromEndpointMethod<typeof octokit.rest.repos.getContent>["data"];

	async function getContents(): Promise<Contents> {
		const { data } = await octokit.rest.repos.getContent({
			mediaType: {
				format: "raw",
			},
			owner: env.VITE_GITHUB_OWNER,
			repo: env.VITE_GITHUB_REPO,
			path: env.VITE_GITHUB_PATH,
		});
		return data;
	}

	type Directory = components["schemas"]["content-directory"];
	let cachedArticles: Directory = [];

	async function getArticles(): Promise<Directory> {
		if (cachedArticles.length > 0) {
			return cachedArticles;
		}
		const data = await getContents();
		const articles = (!Array.isArray(data) ? [data] : data) as Directory;
		const ignoredNames = [".obsidian"];
		cachedArticles = await Promise.all(
			articles
				.filter(({ name }) => !ignoredNames.includes(name))
				.map(async (article) => {
					if (article?.download_url) {
						const content = await fetch(article.download_url)
							.then((res) => res.blob())
							.then((blob: Blob): Promise<string> => blob.text());
						return {
							...article,
							content,
						};
					}
					return article;
				})
		);

		return cachedArticles;
	}

	interface MatteredArticle {
		filepath: string;
		filename: string;
		frontmatter: BasicFrontmatter;
	}
	let cachedMatteredArticles: MatteredArticle[] = [];
	const { formatWithDefault } = useBasicFrontmatter();
	async function getMatteredArticles(): Promise<MatteredArticle[]> {
		if (cachedMatteredArticles.length > 0) {
			return cachedMatteredArticles;
		}
		cachedMatteredArticles = (await getArticles())
			.map(({ name, content }) => {
				if (typeof content !== "string") {
					return;
				}
				const {
					data: { title, tags, date, og_url: ogUrl, last_updated: lastUpdated, category, url },
				} = matter(content);
				return {
					frontmatter: formatWithDefault({ title, tags, date, ogUrl, lastUpdated, category, url }),
					filepath: "/articles/" + name,
					filename: name,
				};
			})
			.filter((article): article is MatteredArticle => !!article);
		return cachedMatteredArticles;
	}

	return { getArticles, getMatteredArticles };
}
