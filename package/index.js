import vjform from "./vjform";
import * as provider from "./provider";
import * as transform from "./transform";

vjform.install = function(Vue) {
  Vue.component(vjform.name, vjform);
};

vjform.provider = provider.register;
vjform.transform = transform.register;

export default vjform;
