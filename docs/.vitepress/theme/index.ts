// https://vitepress.dev/guide/custom-theme
import Layout from "./Layout/index.vue";
import type { Theme } from "vitepress";
import "./styles/main.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default {
	Layout,
	enhanceApp({ app }) {
		library.add(faGithub, faArrowRight, faArrowLeft);
		app.component("FontAwesomeIcon", FontAwesomeIcon);
	},
} satisfies Theme;
