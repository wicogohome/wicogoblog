// https://vitepress.dev/guide/custom-theme
import Layout from "./Layout/index.vue";
import type { Theme } from "vitepress";
import "./styles/main.scss";

export default {
	Layout,
	enhanceApp({ app, router, siteData }) {
		// ...
	},
} satisfies Theme;
