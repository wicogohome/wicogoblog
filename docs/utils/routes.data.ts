import { createContentLoader } from "vitepress";
import type { SiteConfig } from "vitepress";

const config: SiteConfig = (globalThis as unknown).VITEPRESS_CONFIG;
const { map } = config.rewrites;
export default createContentLoader("**/*.md", {
	transform: (files) => {
		return files.map((file) => {
			file.url = (map[file.url.replace("/", "") + ".md"] ?? file.url).replace(/\.md$/, "");

			return file;
		});
	},
});
