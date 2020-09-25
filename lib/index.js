import vjform from "./Main.vue";
import feature from "./registry";
import functional from "./features/functional";
import datasource from "./features/datasource";
export { deepSet } from "./utils/helpers";

const install = function(Vue) {
  Vue.component(vjform.name, vjform);
};

const component = {
  ...vjform,
  install,
  use: extend => {
    if (typeof extend === "function") {
      extend(feature);
    }
    return component;
  }
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export const getFunctionals = functional;
export const getDatasources = datasource;
export default component;
