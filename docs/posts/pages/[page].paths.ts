import _ from "lodash";
import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";
import useViteEnv from "../../.vitepress/utils/useViteEnv.ts";

export default {
	async paths() {
		const { getEnvBy } = useViteEnv();
		const pagination = getEnvBy("VITE_PAGINATION", 10) as number;

		const { getMatteredArticles } = useGithubArticles();
		const articles = await getMatteredArticles();

		const result = _(articles)
			.chunk(pagination)
			.map((_articles, page) => ({
				params: {
					page: page + 1,
				},
			}))
			.value();
		return result;
	},
};
