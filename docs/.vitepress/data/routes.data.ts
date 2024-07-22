import { createContentLoader, defineLoader } from "vitepress";
import useGithubArticles from "../utils/useGithubArticles.ts";
import useDataTime from "../utils/useDateTime.ts";
import useArticleUrl from "../utils/useArticleUrl.ts";
import type { BasicFrontmatter } from "../utils/useBasicFrontmatter.ts";

const ignoredPaths = ["/articles/[title].html", "/"];

export interface Data {
	url: string;
	excerpt: string;
	frontmatter: BasicFrontmatter;
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
					({ filepath, frontmatter, excerpt }): Data => ({
						url: formatUrlByRewrites(filepath),
						excerpt,
						frontmatter,
					})
				)
				.sort(({ frontmatter: { date: dateA } }, { frontmatter: { date: dateB } }) => {
					return parseFromTZ(dateB).toMillis() - parseFromTZ(dateA).toMillis();
				});
		},
	})
);
