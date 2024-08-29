import { createApp } from "vue";
import "./assets/styles/main.scss";
import App from "./App.vue";

import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faMap as faSolidMap } from "@fortawesome/free-solid-svg-icons";

library.add(faMap, faSolidMap);

const app = createApp(App).component("FontAwesomeIcon", FontAwesomeIcon);
app.use(VueViewer);
app.mount("#app");
