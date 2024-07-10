import matter from "gray-matter";

import { createContentLoader, defineLoader } from "vitepress";
import useGithubArticles from "../utils/useGithubArticles.ts";
import useDataTime from "../utils/useDateTime.ts";
import useArticleUrl from "../utils/useArticleUrl.ts";

const ignoredPaths = ["/articles/[title].html", "/"];

export interface Data {
	url: string;
	frontmatter: {
		title: string;
		tags: Array<string>;
		date: string;
		ogUrl: string;
		lastUpdated: string;
		category: string;
		originUrl: string;
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
			const { formatUrlByRewrites } = useArticleUrl();
			return articleRoutes
				.filter(({ url }) => !ignoredPaths.includes(url))
				.map(
					({
						url,
						frontmatter: {
							title,
							tags,
							date,
							og_url: ogUrl,
							last_updated: lastUpdated,
							category,
							url: originUrl,
						},
					}): Data => {
						return {
							url: formatUrlByRewrites(url),
							frontmatter: {
								title,
								tags,
								date, // 若使用parseFromTZ()，最終頁面只能取得String而非DateTime Object
								ogUrl,
								lastUpdated,
								category,
								originUrl,
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
