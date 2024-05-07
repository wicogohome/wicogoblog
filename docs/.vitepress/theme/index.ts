// https://vitepress.dev/guide/custom-theme
import Layout from "./Layout.vue";
import type { Theme } from "vitepress";
import "../../../src/assets/styles/main.scss";

export default {
	Layout,
	enhanceApp({ app, router, siteData }) {
		// ...
	},
} satisfies Theme;
