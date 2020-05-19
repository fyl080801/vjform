import { register } from "../register";

register("REDUCE", (array, init, mapper) => {
  return array.reduce(mapper, init);
}).withDescription("数组转换")();
