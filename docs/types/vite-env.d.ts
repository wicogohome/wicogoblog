/// <reference types="vite/client" />

interface ImportMetaEnv {
	VITE_GITHUB_TOKEN: string;
	VITE_GITHUB_OWNER: string;
	VITE_GITHUB_REPO: string;
	VITE_GITHUB_PATH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
