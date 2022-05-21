import "@/assets/styles/main.scss";
import { createApp } from "vue";
import App from "./App";
import * as config from "./config";

createApp(App).use(config.router).use(config.store).mount("#app");
