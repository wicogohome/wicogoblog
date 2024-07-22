import _ from "lodash";
import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";
import useDateTime from "../../.vitepress/utils/useDateTime.ts";
import useViteEnv from "../../.vitepress/utils/useViteEnv.ts";

export default {
	async paths() {
		const { getEnvBy } = useViteEnv();
		const pagination = getEnvBy("VITE_LIST_PAGINATION", 20) as number;

		const { parseFromTZ } = useDateTime();
		const { getMatteredArticles } = useGithubArticles();
		const articles = await getMatteredArticles();

		function chunkByPagination(period: string, total: number) {
			return _(_.range(1, total))
				.chunk(pagination)
				.map((_articles, page) => ({
					params: {
						period,
						page: page + 1,
					},
				}))
				.value();
		}

		const indexPages = chunkByPagination("index", articles.length + 1);
		return _(articles)
			.groupBy(({ frontmatter: { date } }) => parseFromTZ(date).year)
			.mapValues((articles, period) => chunkByPagination(period, articles.length + 1))
			.values()
			.flatten()
			.value()
			.concat(indexPages);
	},
};
