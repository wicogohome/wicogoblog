/// <reference types="vite/client" />
/// <reference types="vite-svg-loader" />

declare module "*.vue";

declare module "virtual:portfolio-settings" {
	const settings: string;
	export { settings };
}
