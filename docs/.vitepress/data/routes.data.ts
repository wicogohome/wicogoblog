import { createContentLoader } from "vitepress";
import type { SiteConfig } from "vitepress";
import useGithubArticles from "../../utils/useGithubArticles";
import matter from "gray-matter";
import _ from "lodash";

const config: SiteConfig = globalThis.VITEPRESS_CONFIG;
const { map } = config.rewrites;

const ignoredPaths = ["/articles/[title].html", "/"];

export default createContentLoader("**/*.md", {
	transform: async (files) => {
		const { getArticles } = useGithubArticles();
		type ArticleRoute = {
			frontmatter: Record<string, any>;
			url: string;
		};

		const articleRoutes: ArticleRoute[] = (await getArticles())
			.map(({ name, content }) => {
				if (typeof content !== "string") {
					return;
				}
				const { data: frontmatter } = matter(content);
				return { frontmatter, url: "/articles/" + name.replace(/\.md$/, "") };
			})
			.filter((article): article is ArticleRoute => !!article);

		return articleRoutes
			.concat(files)
			.filter(({ url }) => !ignoredPaths.includes(url))
			.map((file) => {
				file.url = (map[_.trimStart(file.url, "/") + ".md"] ?? file.url).replace(/\index.md$/, "");
				return file;
			});
	},
});
