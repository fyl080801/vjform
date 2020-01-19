import Vue from "vue";
import Element from "element-ui";
import App from "./App";
import router from "./router";

import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;

Vue.use(Element);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
