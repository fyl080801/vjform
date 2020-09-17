import { multiply } from "./multiply";
import { division } from "./division";
import feature from "../../feature";

feature
  .functional("ADDITION", function() {
    const ms = [];
    const values = [];

    for (let i = 0; i < arguments.length; i++) {
      let value;
      try {
        value = arguments[i].toString().split(".")[1].length;
      } catch {
        value = 0;
      }
      ms.push(value);
      values.push(arguments[i] || 0);
    }

    const m = Math.pow(10, Math.max.apply(null, ms));

    return division(
      values.reduce((pre, cur) => {
        return pre + multiply(cur, m);
      }, 0),
      m
    );
  })
  .withDescription("数字相加")
  .withGroup("计算");
