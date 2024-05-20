import _ from "lodash";
import matter from "gray-matter";

import { createContentLoader, defineLoader } from "vitepress";
import useGithubArticles from "../../utils/useGithubArticles";
import useDataTime from "../../utils/useDateTime.ts";

import type { SiteConfig } from "vitepress";
import type { DateTime } from "luxon";

const ignoredPaths = ["/articles/[title].html", "/"];
const config: SiteConfig = globalThis.VITEPRESS_CONFIG;
const { map } = config.rewrites;

export interface Data {
	url: string;
	frontmatter: {
		title: string;
		tags: Array<string>;
		date: DateTime;
		og_url: string;
		last_updated: DateTime;
		catagory: string;
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
		catagory: string;
		url: string;
	};
}

declare const data: Data;
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
						frontmatter: { title, tags, date, og_url: ogUrl, last_updated: lastUpdated, catagory },
					}): Data => {
						const formattedUrl = (map[_.trimStart(url, "/") + ".md"] ?? url).replace(/\index.md$/, "");
						return {
							url: _.startsWith(formattedUrl, "/") ? "/" + formattedUrl : formattedUrl,
							frontmatter: {
								title,
								tags,
								date: parseFromTZ(date),
								og_url: ogUrl,
								last_updated: parseFromTZ(lastUpdated),
								catagory,
							},
						};
					}
				)
				.sort(({ frontmatter: { date: dateA } }, { frontmatter: { date: dateB } }) => {
					return dateB.toMillis() - dateA.toMillis();
				});
		},
	})
);
