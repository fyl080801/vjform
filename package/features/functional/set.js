import feature from "../../feature";
import emitter from "../../utils/emitter";
import { cloneDeep } from "lodash-es";

feature
  .functional("SET", function(path, value) {
    // 从转换触发的函数不可直接修改model里的值
    emitter.$emit("update", {
      path,
      value: typeof value === "object" ? cloneDeep(value) : value
    });
  })
  .withDescription("赋值");
