import { Octokit } from "@octokit/rest";
import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import matter from "gray-matter";
import type { GrayMatterFile, Input } from "gray-matter";
import useViteEnv from "./useViteEnv.ts";
import useBasicFrontmatter from "./useBasicFrontmatter.ts";
import type { BasicFrontmatter } from "./useBasicFrontmatter.ts";
import _ from "lodash";

const { getEnv } = useViteEnv();
const env = getEnv();

export interface Article {
	filepath: string;
	filename: string;
	frontmatter: BasicFrontmatter;
	content: string;
}

interface NullableArticle {
	filepath: string;
	filename: string;
	frontmatter: BasicFrontmatter | Record<string, never>;
	content: string | null;
}
const LINES_COUNT = 6;
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

	let cachedArticles: Article[] = [];

	const hasValidContent = (content: string | null): boolean => typeof content === "string" && content.length > 0;

	async function getArticles(): Promise<Article[]> {
		if (cachedArticles.length > 0) {
			return cachedArticles;
		}
		const data = await getContents();
		const articles = !Array.isArray(data) ? [data] : data;
		const ignoredNames = [".obsidian"];
		cachedArticles = (
			await Promise.all(
				articles
					.filter(
						({ name, download_url: downloadUrl }) =>
							!ignoredNames.includes(name) && name.endsWith(".md") && downloadUrl !== null
					)
					.map(async ({ name, download_url: downloadUrl }): Promise<NullableArticle> => {
						if (downloadUrl === null) {
							throw new Error(`Article ${name} has no download URL`);
						}

						const oriContent = await fetch(downloadUrl)
							.then((res) => res.blob())
							.then((blob: Blob): Promise<string> => blob.text());

						const { frontmatter = {}, content = null } = formatContent(oriContent);

						return {
							filename: name,
							filepath: `/articles/${name}`,
							frontmatter,
							content,
						};
					})
			)
		).filter(({ content }) => hasValidContent(content)) as Article[];

		return cachedArticles;
	}

	const { formatWithDefault } = useBasicFrontmatter();

	function formatContent(oriContent: string) {
		if (!hasValidContent(oriContent)) {
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
			excerpt: getFirstNLines,
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
	function getFirstNLines(file: GrayMatterFile<Input>): () => string {
		file.excerpt = file.content
			.split("\n")
			.filter((line) => !_.startsWith(line, "#") && !_.startsWith(line, "!") && !_.startsWith(line, "```"))
			.slice(0, LINES_COUNT)
			.join(" ");
		return () => file.excerpt as string;
	}

	return { getArticles };
}
