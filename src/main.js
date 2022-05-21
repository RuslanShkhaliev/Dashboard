import "@/assets/styles/main.scss";
import Vue from "vue";
import App from "./App";
import * as config from "./config";

Vue.config.productionTip = false;
new Vue({
  ...config,
  // eslint-disable-next-line no-undef
  render: (h) => h(App),
}).$mount("#app");
