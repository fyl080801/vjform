import vjform from "./vjform";
import * as provider from "./provider";
import * as transform from "./transform";
import * as datasource from "./datasource";

const install = function(Vue) {
  Vue.component(vjform.name, vjform);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  ...vjform,
  install,
  provider: provider.register,
  transform: transform.register,
  datasource: datasource.register
};
