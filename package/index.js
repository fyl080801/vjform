import vjform from "./vjform";
import feature from "./feature";
import functional from "./features/functional";

const install = function(Vue) {
  Vue.component(vjform.name, vjform);
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export const getFunctionals = functional;

export default {
  ...vjform,
  install,
  feature
};
