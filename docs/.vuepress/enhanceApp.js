import Element from "element-ui";
import vjform from "../../package/index";

import "element-ui/lib/theme-chalk/index.css";

export default ({ Vue, options, router, siteData }) => {
  Vue.use(Element);
  Vue.use(vjform);
};
