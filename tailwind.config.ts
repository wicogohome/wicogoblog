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
					"linear-gradient(to bottom, rgba(62,63,59,0.5) ,rgba(62,63,59,0.5)), url('/black-concrete-textured.jpg')",
				headshot: "url('/headshot.jpg')",
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				noto: ["Georama", "Noto Sans TC"],
				zilla: ["Zilla Slab Highlight"],
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
			},
			width: {
				"codeblock-line": "calc(100% + 2rem)",
				"main-content": "calc(100vw - 4rem)",
				"big-main-content": "calc(100vw - 10rem)",
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
