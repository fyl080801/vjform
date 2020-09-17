import Element from "element-ui";
import vjform from "../../lib";

import "element-ui/lib/theme-chalk/index.css";

export default ({ Vue, options, router, siteData }) => {
  Vue.use(Element);
  Vue.use(vjform);
};
