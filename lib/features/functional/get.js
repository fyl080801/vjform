import feature from "../../feature";
import { get } from "lodash-es";

feature
  .functional("GET", (source, path) => {
    return get(source, path);
  })
  .withDescription("获取属性值");
