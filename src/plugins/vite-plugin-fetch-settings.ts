// vite-plugin-fetch-settings.ts
import { Plugin } from "vite";
import useGithubArticles from "./useGithubArticles";

export default function fetchSettingsPlugin(): Plugin {
	let cachedSettings: object = {};
	let config: { env: Record<string, string> };
	return {
		name: "vite-plugin-fetch-settings",
		configResolved(resolvedConfig) {
			// 保存解析後的配置
			config = resolvedConfig;
		},
		async buildStart() {
			try {
				const { getSetting } = useGithubArticles(config);

				cachedSettings = await getSetting();
				console.log("✅ 預先拉取設定成功");
			} catch (error) {
				console.error("❌ 預先拉取設定失敗:", error);
				cachedSettings = {};
			}
		},
		resolveId(id) {
			if (id === "virtual:portfolio-settings") {
				return "virtual:portfolio-settings";
			}
			return null;
		},
		load(id) {
			if (id === "virtual:portfolio-settings") {
				return `export const settings = ${JSON.stringify(cachedSettings)};`;
			}
			return null;
		},
	};
}
