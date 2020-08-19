import feature from "../../feature";
import { deepSet } from "../../utils/helpers";

feature
  .functional("SET", (obj, path, value) => {
    deepSet(obj, path, value);
  })
  .withDescription("赋值");
