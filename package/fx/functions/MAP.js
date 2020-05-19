import { register } from "../register";

register("MAP", (array, mapper) => {
  return array.map(mapper);
}).withDescription("数组转换")();
