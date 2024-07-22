import _ from "lodash";
import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";
import useViteEnv from "../../.vitepress/utils/useViteEnv.ts";
export default {
	async paths() {
		const { getEnvBy } = useViteEnv();
		const pagination = getEnvBy("VITE_PAGINATION", 10) as number;

		const { getMatteredArticles } = useGithubArticles();
		const articles = await getMatteredArticles();

		return _(articles)
			.groupBy("frontmatter.category")
			.mapValues((articles, category) =>
				_(_.range(1, articles.length + 1))
					.chunk(pagination)
					.map((_articles, page) => ({
						params: {
							category,
							page: page + 1,
						},
					}))
					.value()
			)
			.values()
			.flatten()
			.value()
			.concat({
				params: {
					category: "index",
					page: 1,
				},
			});
	},
};
