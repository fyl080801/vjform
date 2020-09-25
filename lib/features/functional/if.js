import feature from "../../registry";

feature
  .functional("IF", (logic, v1, v2) => {
    const result = logic ? v1 : v2;
    return typeof result === "function" ? result() : result;
  })
  .withDescription("条件判断");
