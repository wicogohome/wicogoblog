import type { Config } from "tailwindcss";

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
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				noto: ["noto-sans-tc", "Georama"],
				zilla: ["zilla-slab-highlight"],
			},
			colors: {
				transparent: "transparent",
				black: "#3E3F3B",
				white: "#FEFEFE",
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
	plugins: [],
} satisfies Config;
