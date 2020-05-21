import { register } from "../register";
import { get } from "lodash-es";

register("GET", (source, path) => {
  return get(source, path);
}).withDescription("获取属性值")();
