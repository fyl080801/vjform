import { register } from "../register";
import { isEqual } from "lodash-es";

register("EQUAL", (v1, v2) => {
  return isEqual(v1, v2);
}).withDescription("相等判断")();
