import feature from "../../registry";
import { isEqual } from "lodash-es";

feature
  .functional("EQUAL", (v1, v2) => {
    return isEqual(v1, v2);
  })
  .withDescription("相等判断")
  .withGroup("计算");
