import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "url";

import matter from "gray-matter";
import eslint from "vite-plugin-eslint";
import useGithubArticles from "./utils/useGithubArticles.ts";

const srcDir: string = "posts/";
interface Rewrites {
	[index: string]: string;
}
const rewrites: Rewrites = { "index.md": "index.md", ":filename.md": ":filename/index.md" };

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
	rewrites["articles/" + name] =
		`${formattedDate.getFullYear()}/${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${url ?? name.replace(/\.md$/, "")}/index.md`;
});

// https://vitepress.dev/reference/site-config
export default defineConfig({
	lang: "zh-TW",
	title: "WicoGotBlog",
	description: "A VitePress Site",
	head: [
		["link", { rel: "icon", href: "/favicon.ico" }], // example
		["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
		["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }],
		[
			"link",
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Georama:ital,wght@0,100..900;1,100..900&family=Noto+Sans+TC:wght@100..900&family=Zilla+Slab+Highlight:wght@400;700&display=swap",
			},
		],
	],
	// sitemap: {
	// 	hostname: "https://wicotang.com/blog/",
	// },
	base: "/blog/",
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
			alias: [{ find: "@@/", replacement: fileURLToPath(new URL("./", import.meta.url)) }],
		},
	},
	rewrites,
});
