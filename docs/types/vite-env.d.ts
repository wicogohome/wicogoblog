/// <reference types="vite/client" />
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
declare module "markdown-it-task-checkbox";
declare module "vitepress-plugin-mermaid" {
	import type { UserConfig, DefaultTheme } from "vitepress";
	import type { MermaidPluginConfig } from "@types/mermaid";

	type OriginConfig = UserConfig<DefaultTheme.Config>;
	interface withMermaidConfig extends OriginConfig {
		mermaid: MermaidPluginConfig;
	}
	declare function withMermaid(config: withMermaidConfig): withMermaidConfig;
	export { withMermaid };
}

interface ImportMetaEnv {
	VITE_GITHUB_TOKEN: string;
	VITE_GITHUB_OWNER: string;
	VITE_GITHUB_REPO: string;
	VITE_GITHUB_PATH: string;
	VITE_PAGINATION: number;
	VITE_LIST_PAGINATION: number;
	VITE_PREVIEW_UNPUBLISHED: boolean;
	VITE_HOSTNAME: string | null;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
