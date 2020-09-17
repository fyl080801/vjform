import feature from "../../feature";

feature
  .functional("INCLUDES", (data = [], value) => {
    return data.includes(value);
  })
  .withDescription("集合包含")
  .withGroup("集合");
