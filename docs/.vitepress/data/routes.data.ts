import { createContentLoader, defineLoader } from "vitepress";
import useGithubArticles from "../utils/useGithubArticles.ts";
import useDataTime from "../utils/useDateTime.ts";
import useArticleUrl from "../utils/useArticleUrl.ts";
import type { BasicFrontmatter } from "../utils/useBasicFrontmatter.ts";

const ignoredPaths = ["/articles/[title].html", "/"];

export interface Data {
	url: string;
	frontmatter: BasicFrontmatter;
}

declare const data: Data[];
export { data };

export default defineLoader(
	createContentLoader("**/*.md", {
		transform: async (): Promise<Data[]> => {
			const { getArticles } = useGithubArticles();

			const articleRoutes = await getArticles();

			const { parseFromTZ } = useDataTime();
			const { formatUrlByRewrites } = useArticleUrl();

			return articleRoutes
				.filter(({ filepath }) => !ignoredPaths.includes(filepath))
				.map(
					({ filepath, frontmatter }): Data => ({
						url: formatUrlByRewrites(filepath),
						frontmatter,
					})
				)
				.sort(({ frontmatter: { date: dateA } }, { frontmatter: { date: dateB } }) => {
					return parseFromTZ(dateB).toMillis() - parseFromTZ(dateA).toMillis();
				});
		},
	})
);
