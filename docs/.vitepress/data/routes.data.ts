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
		originUrl: string | null;
	};
}

declare const data: Data[];
export { data };

export default defineLoader(
	createContentLoader("**/*.md", {
		transform: async (): Promise<Data[]> => {
			const { getMatteredArticles } = useGithubArticles();

			const articleRoutes = await getMatteredArticles();

			const { parseFromTZ } = useDataTime();
			const { formatUrlByRewrites } = useArticleUrl();
			return articleRoutes
				.filter(({ filepath }) => !ignoredPaths.includes(filepath))
				.map(
					({
						filepath,
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
							url: formatUrlByRewrites(filepath),
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
