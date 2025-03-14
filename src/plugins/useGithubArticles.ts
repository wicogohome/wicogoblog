import { Octokit } from "@octokit/rest";
import { GetResponseTypeFromEndpointMethod } from "@octokit/types";
import _ from "lodash";

export default function useGithubArticles(config: { env: Record<string, string> }): {
	getSetting: () => Promise<object>;
} {
	const octokit = new Octokit({
		auth: config.env.VITE_GITHUB_TOKEN,
	});

	type Contents = GetResponseTypeFromEndpointMethod<typeof octokit.rest.repos.getContent>["data"];

	async function getContentSetting(): Promise<Contents> {
		const contentFileName = config.env.VITE_PORT_CONTENT_FILE_NAME;
		const { data } = await octokit.rest.repos.getContent({
			mediaType: {
				format: "raw",
			},
			owner: config.env.VITE_GITHUB_OWNER,
			repo: config.env.VITE_GITHUB_REPO,
			path: config.env.VITE_GITHUB_PATH + "/portfoilo/" + contentFileName,
		});
		return data;
	}

	let cachedSetting = {};

	async function getSetting(): Promise<object> {
		if (!_.isEmpty(cachedSetting)) {
			return cachedSetting;
		}

		cachedSetting = await getContentSetting();

		return cachedSetting;
	}

	return { getSetting };
}
