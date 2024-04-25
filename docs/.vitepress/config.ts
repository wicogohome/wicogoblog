import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: "zh-TW",
	title: "WicogoBlog",
	description: "A VitePress Site",
	head: [
		["link", { rel: "icon", href: "/favicon.ico" }], // example
		["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }], // example
	],
	// sitemap: {
	// 	hostname: "https://wicotang.com/blog/",
	// },
	base: "/blog/",
	cleanUrls: true,
	outDir: "../dist/blog/",
	srcDir: "posts/",
	lastUpdated: true,
	markdown: {},
	vite: {},
});
