import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "url";

import matter from "gray-matter";
import eslint from "vite-plugin-eslint";
import useGithubArticles from "../../docs/utils/useGithubArticles.ts";

const srcDir = "posts/";

const { getArticles } = useGithubArticles();
const pages = await getArticles();
pages.map(({ name, content }) => {
	if (typeof content !== "string") {
		return;
	}
	const {
		data: { url, date },
	} = matter(content);
	const formattedDate = new Date(date);
	rewrites[page.replace("docs/" + srcDir, "")] =
		`${formattedDate.getFullYear()}/${formattedDate.getMonth()}/${formattedDate.getDate()}/${url ?? page.replace("docs/posts/articles/", "").replace(/\.md$/, "")}.md`;
});

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
	srcDir,
	lastUpdated: true,
	markdown: {},
	vite: {
		plugins: [
			eslint({
				exclude: ["./node_modules/**", "docs/.vitepress/cache"],
			}),
		],
		resolve: {
			alias: [{ find: "@@/", replacement: fileURLToPath(new URL("../../docs/", import.meta.url)) }],
			preserveSymlinks: true,
		},
	},
	rewrites,
});
