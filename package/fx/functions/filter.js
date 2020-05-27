import { register } from "../register";

register("FILTER", (array, filter) => {
  return array.filter(filter);
}).withDescription("数组过滤")();
