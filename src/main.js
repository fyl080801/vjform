import Vue from "vue";
import Element from "element-ui";
import App from "./App";
import router from "./router";
import vjform from "../lib";

import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(Element);
Vue.use(vjform);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
