import _ from "lodash";
import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";

export default {
	async paths() {
		const { getMatteredArticles } = useGithubArticles();
		const articles = await getMatteredArticles();

		return _(articles)
			.groupBy("frontmatter.category")
			.mapValues((_articles, category) => ({
				params: {
					category,
				},
			}))
			.values()
			.value()
			.concat({
				params: {
					category: "index",
				},
			});
	},
};
