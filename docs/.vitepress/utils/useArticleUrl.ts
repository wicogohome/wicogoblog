import _ from "lodash";
import type { SiteConfig } from "vitepress";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: SiteConfig = (globalThis as any).VITEPRESS_CONFIG;
const { map: rewritesMap } = config.rewrites;

export default function useArticleUrl() {
	function formatUrlByRewrites(filepath: string) {
		const formattedUrl = (rewritesMap[_.trimStart(filepath, "/")] ?? filepath.replace(/\.md$/, "/")).replace(
			/index.md$/,
			""
		);
		return _.startsWith(formattedUrl, "/") ? formattedUrl : "/" + formattedUrl;
	}

	return { formatUrlByRewrites };
}
