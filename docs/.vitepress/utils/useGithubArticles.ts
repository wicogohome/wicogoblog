import { Octokit } from "@octokit/rest";
import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import { components } from "@octokit/openapi-types";
import matter from "gray-matter";
import type { GrayMatterFile, Input } from "gray-matter";
import useViteEnv from "./useViteEnv.ts";
import useBasicFrontmatter from "./useBasicFrontmatter.ts";
import type { BasicFrontmatter } from "./useBasicFrontmatter.ts";
import _ from "lodash";

const { getEnv } = useViteEnv();
const env = getEnv();

export default function useGithubArticles() {
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
	interface Article {
		name: string;
		frontmatter?: BasicFrontmatter | Record<string, never>;
		content?: string | null;
	}
	let cachedArticles: Article[] = [];

	async function getArticles(): Promise<Article[]> {
		if (cachedArticles.length > 0) {
			return cachedArticles;
		}
		const data = await getContents();
		const articles = (!Array.isArray(data) ? [data] : data) as Directory;
		const ignoredNames = [".obsidian"];
		cachedArticles = await Promise.all(
			articles
				.filter(({ name }) => !ignoredNames.includes(name))
				.map(async (article): Promise<Article> => {
					if (article?.download_url) {
						const oriContent = await fetch(article.download_url)
							.then((res) => res.blob())
							.then((blob: Blob): Promise<string> => blob.text());

						const { frontmatter = {}, content = null } = formatContent(oriContent);

						return {
							name: article.name,
							frontmatter,
							content,
						};
					}
					return {
						name: article.name,
					};
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
			.map(({ name, frontmatter, content }) => {
				if (typeof content !== "string") {
					return;
				}
				return {
					frontmatter,
					filepath: "/articles/" + name,
					filename: name,
				};
			})
			.filter((article): article is MatteredArticle => !!article);
		return cachedMatteredArticles;
	}

	function formatContent(oriContent) {
		if (typeof oriContent !== "string") {
			return {};
		}

		const {
			data: {
				title,
				description,
				tags,
				date,
				og_url: ogUrl,
				last_updated: lastUpdated,
				category,
				url,
				published,
			},
			excerpt,
			content,
		} = matter(oriContent, {
			// TODO 型別
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			excerpt: getFirstEightLines,
		});

		if (env.VITE_PREVIEW_UNPUBLISHED !== "true" && !published) {
			return {};
		}

		const formattedFrontmatter = formatWithDefault({
			title,
			description: description ?? excerpt,
			tags,
			date,
			ogUrl,
			lastUpdated,
			category,
			url,
		});

		return {
			frontmatter: formattedFrontmatter,
			content: matter.stringify(content, formattedFrontmatter),
		};
	}
	function getFirstEightLines(file: GrayMatterFile<Input>): () => string {
		file.excerpt = file.content
			.split("\n")
			.filter((line) => !_.startsWith(line, "#") && !_.startsWith(line, "!"))
			.slice(0, 8)
			.join(" ");
		return () => file.excerpt as string;
	}

	return { getArticles, getMatteredArticles };
}
