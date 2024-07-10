import _ from "lodash";
import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";
import useDateTime from "../../.vitepress/utils/useDateTime";
export default {
	async paths() {
		const { parseFromTZ } = useDateTime();
		const { getMatteredArticles } = useGithubArticles();
		const articles = await getMatteredArticles();

		const result = _(articles)
			.groupBy(({ frontmatter: { date } }) => {
				const dateTime = parseFromTZ(date);
				return dateTime.year + "-" + dateTime.month;
			})
			.mapValues((_articles, period) => ({
				params: {
					period,
				},
			}))
			.values()
			.value()
			.concat({
				params: {
					period: "index",
				},
			});

		return result;
	},
};
