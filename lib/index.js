import vjform from "./Main.vue";
import feature from "./feature";
import functional from "./features/functional";
import datasource from "./features/datasource";
// import * as helper from "./utils/helpers";

const install = function(Vue) {
  Vue.component(vjform.name, vjform);
};

const component = {
  ...vjform,
  install,
  use: extend => {
    extend(feature);
    return component;
  }
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export const getFunctionals = functional;
export const getDatasources = datasource;
export default component;
