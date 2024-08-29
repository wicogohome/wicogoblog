import useGithubArticles from "../../.vitepress/utils/useGithubArticles.ts";
import useViteEnv from "../../.vitepress/utils/useViteEnv.ts";
import usePagination from "../../.vitepress/utils/usePagination.ts";

const { createSimplePagination } = usePagination();
export default {
	async paths() {
		const { getEnvBy } = useViteEnv();
		const { getArticles } = useGithubArticles();

		const pagination = getEnvBy("VITE_PAGINATION", 10) as number;
		const articles = await getArticles();

		return createSimplePagination(articles, pagination);
	},
};
