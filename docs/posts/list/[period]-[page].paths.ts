import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";
import useDateTime from "../../.vitepress/utils/useDateTime.ts";
import useViteEnv from "../../.vitepress/utils/useViteEnv.ts";
import usePagination from "../../.vitepress/utils/usePagination.ts";

const { createPaginatedParams, createPaginationRange } = usePagination();

export default {
	async paths() {
		const { getEnvBy } = useViteEnv();
		const pagination = getEnvBy("VITE_LIST_PAGINATION", 20) as number;

		const { parseFromTZ } = useDateTime();
		const { getArticles } = useGithubArticles();
		const articles = await getArticles();

		// For year-based pagination
		const yearParams = createPaginatedParams(
			articles,
			(article) => parseFromTZ(article.frontmatter.date).year.toString(),
			"period",
			pagination
		);

		// For index pages
		const indexParams = createPaginationRange(articles.length, pagination, { period: "index" });

		return [...yearParams, ...indexParams];
	},
};
