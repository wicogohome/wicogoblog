import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";

export default {
	async paths() {
		const { getArticles } = useGithubArticles();
		const articles = await getArticles();

		return articles.map(({ filename, content }) => ({
			params: {
				title: filename.replace(/\.md$/, ""),
			},
			content,
		}));
	},
};
