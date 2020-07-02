import feature from "../../feature";

feature("functional")("REDUCE", (array, init, mapper) => {
  return array.reduce(mapper, init);
})
  .withDescription("数组转换")
  .withGroup("数组");
