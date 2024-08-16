import { createApp } from "vue";
import "./assets/styles/main.scss";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { faMap as faSolidMap } from "@fortawesome/free-solid-svg-icons";

library.add(faMap, faSolidMap);

createApp(App).component("FontAwesomeIcon", FontAwesomeIcon).mount("#app");
