import feature from "../../feature";

feature("functional")("IF", (logic, v1, v2) => {
  return logic ? v1 : v2;
}).withDescription("条件判断");
