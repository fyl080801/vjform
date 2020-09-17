import feature from "../../feature";

feature
  .functional("FIND", (list, exp, def) => {
    const result = list.find(exp);
    return result !== undefined && result !== null ? result : def;
  })
  .withDescription("查找集合唯一元素")
  .withGroup("集合");
