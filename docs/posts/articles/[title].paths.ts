import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";

export default {
	async paths() {
		const { getArticles } = useGithubArticles();

		const articles = (await getArticles()).filter(({ content }) => typeof content === "string");

		return articles.map(({ name, content }) => ({
			params: {
				title: name.replace(/\.md$/, ""),
			},
			content,
		}));
	},
};
