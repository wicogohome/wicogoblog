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
			.map("frontmatter.tags")
			.flatten()
			.uniq()
			.map((tag) => {
				const count = _.countBy(articles, ({ frontmatter: { tags } }) => tags.includes(tag)).true;

				return _(_.range(1, count + 1))
					.chunk(pagination)
					.map((_articles, page) => ({
						params: {
							tag,
							page: page + 1,
						},
					}))
					.value();
			})
			.flatten()
			.value()
			.concat({
				params: {
					tag: "index",
					page: 1,
				},
			});
	},
};
