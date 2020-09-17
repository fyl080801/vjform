import feature from "../../feature";

feature
  .functional("MAP", (array, mapper) => {
    return array.map(mapper);
  })
  .withDescription("集合转换")
  .withGroup("集合");
