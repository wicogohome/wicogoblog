import _ from "lodash";
import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";

export default {
	async paths() {
		const { getMatteredArticles } = useGithubArticles();
		const articles = await getMatteredArticles();

		const result = _(articles)
			.map("frontmatter.tags")
			.flatten()
			.map((tag) => ({
				params: {
					tag,
				},
			}))
			.uniq()
			.value()
			.concat({
				params: {
					tag: "index",
				},
			});
		return result;
	},
};
