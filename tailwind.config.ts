import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
export default {
	content: [
		"./docs/.vitepress/**/*.{js,ts,vue}",
		"./docs/**/*.md",
		"./dist/blog/**/*.html",
		"./src/**/*.{html,js,vue}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"black-textured":
					"linear-gradient(to bottom, rgba(62,63,59,0.5) ,rgba(62,63,59,0.5)), url('/black-textured.webp')",
				headshot: "url('/headshot.webp')",
				"yellow-textured": "url('/paperboard.webp')",
			},
			fontFamily: {
				// noto / zilla-highlight are still used by the SPA under src/;
				// this config is shared between the SPA build and the VitePress blog.
				noto: ["Georama", "Zilla Slab", "Noto Sans TC"],
				"zilla-highlight": ["Zilla Slab Highlight"],
				zilla: ["Zilla Slab", "serif"],
				newsreader: ["Newsreader", "Noto Serif TC", "serif"],
				"serif-tc": ["Noto Serif TC", "Newsreader", "Georgia", "serif"],
				// Noto Serif TC catches CJK glyphs (IBM Plex Mono has none) so mono-styled
				// labels don't fall back to a random system font for Chinese text.
				mono: ["IBM Plex Mono", "Noto Serif TC", "ui-monospace", "monospace"],
			},
			colors: {
				transparent: "transparent",
				black: "#3E3F3B",
				codeblock: "#2b2b2b",
				highlignt: "#65758529",
				white: {
					default: "#FEFEFE",
					light: "#FFFFE8",
				},
				green: "#8DFF1C",
				yellow: {
					default: "#FFD337",
					dark: "#9A9D01",
					light: "#FFEFB8",
				},
				ink: {
					DEFAULT: "#16150E",
					2: "#1d1c13",
				},
				ivory: {
					DEFAULT: "#ECE5CE",
					dim: "#a8a187",
					// Was #6f6b56 (3.41:1 on ink, fails WCAG AA for small mono text).
					// #90896c holds ≥4.5:1 even over the paper texture layer (which
					// lightens the effective background to ~#242420 at opacity 0.35).
					faint: "#90896c",
				},
				olive: {
					DEFAULT: "#9A9D01",
					bright: "#c8cc3a",
				},
			},
			width: {
				"codeblock-line": "calc(100% + 2rem)",
				"main-content": "calc(100vw - 4rem)",
				"big-main-content": "calc(100vw - 10rem)",
			},
			spacing: {
				gutter: "clamp(20px, 4vw, 64px)",
			},
			screens: {
				// Ad-hoc breakpoints used by the "book" layout (sidebar collapse / post-row reflow).
				compact: { max: "880px" },
				narrow: { max: "520px" },
			},
			gradientColorStops: {},
			gradientColorStopPositions: {},
		},
	},
	plugins: [
		plugin(function ({ addUtilities }) {
			addUtilities({
				".horizontal-tb": {
					writingMode: "horizontal-tb",
				},
				".vertical-rl": {
					writingMode: "vertical-rl",
				},
				".vertical-lr": {
					writingMode: "vertical-lr",
				},
			});
		}),
	],
} satisfies Config;
