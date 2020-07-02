import feature from "../../feature";

feature("functional")("MAP", (array, mapper) => {
  return array.map(mapper);
})
  .withDescription("数组转换")
  .withGroup("数组");
