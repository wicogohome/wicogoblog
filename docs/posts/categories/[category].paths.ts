import _ from "lodash";
import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";

export default {
	async paths() {
		const { getMatteredArticles } = useGithubArticles();
		const articles = await getMatteredArticles();

		return _(articles)
			.uniqBy("frontmatter.category")
			.map(({ frontmatter: { category } }) => ({
				params: {
					category,
				},
			}))
			.value()
			.concat({
				params: {
					category: "index",
				},
			});
	},
};
