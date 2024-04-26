import type { Config } from "tailwindcss";

export default {
	content: ["./docs/.vitepress/**/*.{js,ts,vue}", "./docs/**/*.md", "./src/**/*.{html,js,vue}"],
	theme: {
		extend: {},
	},
	plugins: [],
} satisfies Config;
