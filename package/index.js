import JForm from "./JForm";
import * as provider from "./provider";
import * as transform from "./transform";

JForm.install = function(Vue) {
  Vue.component(JForm.name, JForm);
};

JForm.provider = provider.register;
JForm.transform = transform.register;

export default JForm;
