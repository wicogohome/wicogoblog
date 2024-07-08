import _ from "lodash";
import matter from "gray-matter";

import { createContentLoader, defineLoader } from "vitepress";
import useGithubArticles from "../utils/useGithubArticles.ts";
import useDataTime from "../utils/useDateTime.ts";

import type { SiteConfig } from "vitepress";

const ignoredPaths = ["/articles/[title].html", "/"];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
const { map } = config.rewrites;

export interface Data {
	url: string;
	frontmatter: {
		title: string;
		tags: Array<string>;
		date: string;
		ogUrl: string;
		lastUpdated: string;
		category: string;
	};
}
interface ArticleRoute {
	url: string;
	frontmatter: {
		title: string;
		tags: Array<string>;
		date: string;
		og_url: string;
		last_updated: string;
		category: string;
		url: string;
	};
}

declare const data: Data[];
export { data };

export default defineLoader(
	createContentLoader("**/*.md", {
		transform: async (): Promise<Data[]> => {
			const { getArticles } = useGithubArticles();

			const articleRoutes: ArticleRoute[] = (await getArticles())
				.map(({ name, content }) => {
					if (typeof content !== "string") {
						return;
					}
					const { data: frontmatter } = matter(content);
					return { frontmatter, url: "/articles/" + name.replace(/\.md$/, "") };
				})
				.filter((article): article is ArticleRoute => !!article);

			const { parseFromTZ } = useDataTime();
			return articleRoutes
				.filter(({ url }) => !ignoredPaths.includes(url))
				.map(
					({
						url,
						frontmatter: { title, tags, date, og_url: ogUrl, last_updated: lastUpdated, category },
					}): Data => {
						const formattedUrl = (map[_.trimStart(url, "/") + ".md"] ?? url).replace(/index.md$/, "");
						return {
							url: _.startsWith(formattedUrl, "/") ? "/" + formattedUrl : formattedUrl,
							frontmatter: {
								title,
								tags,
								date, // 若使用parseFromTZ()，最終頁面只能取得String而非DateTime Object
								ogUrl,
								lastUpdated,
								category,
							},
						};
					}
				)
				.sort(({ frontmatter: { date: dateA } }, { frontmatter: { date: dateB } }) => {
					return parseFromTZ(dateB).toMillis() - parseFromTZ(dateA).toMillis();
				});
		},
	})
);
