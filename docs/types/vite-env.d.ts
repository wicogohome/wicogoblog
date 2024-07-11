/// <reference types="vite/client" />
declare module "*.vue" {
	import type { DefineComponent } from "vue";
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
interface ImportMetaEnv {
	VITE_GITHUB_TOKEN: string;
	VITE_GITHUB_OWNER: string;
	VITE_GITHUB_REPO: string;
	VITE_GITHUB_PATH: string;
	VITE_PAGINATION: number;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
