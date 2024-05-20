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
					"linear-gradient(to bottom, rgba(62,63,59,0.5) ,rgba(62,63,59,0.5)), url('/blog/black-concrete-textured.jpg')",
				headshot: "url('/blog/headshot.jpg')",
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				noto: ["Georama", "Noto Sans TC"],
				zilla: ["Zilla Slab Highlight"],
			},
			colors: {
				transparent: "transparent",
				black: "#3E3F3B",
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
