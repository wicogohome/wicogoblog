import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "url";

import _ from "lodash";
import eslint from "vite-plugin-eslint";
import { withMermaid } from "vitepress-plugin-mermaid";
import markdownItCheckbox from "markdown-it-task-checkbox";
import useGithubArticles from "./utils/useGithubArticles.ts";

const srcDir: string = "posts/";
interface Rewrites {
	[index: string]: string;
}

const rewrites: Rewrites = {
	"index.md": "index.md",
	":filename.md": ":filename/index.md",
};

// add pagination
const PAGINATION_PREFIXS = [
	{ name: "categories", param: "category" },
	{ name: "tags", param: "tag" },
	{ name: "list", param: "list", withIndex: true },
	{ name: null, param: null },
];
PAGINATION_PREFIXS.forEach(({ name, param, withIndex = false }) => {
	if (!name || !param) {
		rewrites["pages/1.md"] = "index.md";
		rewrites["pages/:page.md"] = "pages/:page/index.md";
		return;
	}
	rewrites[`${name}/index-1.md`] = `${name}/index.md`;
	if (withIndex) {
		rewrites[`${name}/index-:page.md`] = `${name}/pages/:page/index.md`;
	}

	rewrites[`${name}/:${param}-1.md`] = `${name}/:${param}/index.md`;
	rewrites[`${name}/:${param}-:page.md`] = `${name}/:${param}/pages/:page/index.md`;
});

// add articles
const { getMatteredArticles } = useGithubArticles();
const pages = await getMatteredArticles();
pages.forEach(({ filepath, filename, frontmatter: { url, date } }) => {
	const formattedDate = new Date(date);
	rewrites[_.trimStart(filepath, "/")] =
		`${formattedDate.getFullYear()}/${formattedDate.getMonth() + 1}/${formattedDate.getDate()}/${url ?? filename.replace(/\.md$/, "")}/index.md`;
});

// https://vitepress.dev/reference/site-config
export default defineConfig(
	withMermaid({
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
		outDir: "../dist/blog/",
		srcDir,
		lastUpdated: true,
		markdown: {
			// shiki
			theme: "vitesse-dark",
			config: (md: MarkdownIt) => {
				md.use(markdownItCheckbox, {
					disabled: true,
					divWrap: false,
					divClass: "checkbox",
					idPrefix: "cbx_",
					ulClass: "task-list",
					liClass: "task-list-item",
				});
			},
		},
		mermaid: {
			theme: "dark",
		},
		vite: {
			envDir: "../../",
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
	})
);
