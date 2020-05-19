import { register } from "../register";

register("IF", (logic, v1, v2) => {
  return logic ? v1 : v2;
}).withDescription("双条件判断")();
