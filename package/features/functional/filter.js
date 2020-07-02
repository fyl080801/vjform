import feature from "../../feature";

feature("functional")("FILTER", (array, filter) => {
  return array.filter(filter);
})
  .withDescription("数组过滤")
  .withGroup("数组");
