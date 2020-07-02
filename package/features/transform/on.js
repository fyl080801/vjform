import feature from "../../feature";
import { resolveGetter, resolveSetter } from "./helper";
import { getFunctionResult } from "./func";
import transform from "./index";

export function getOnFunction(option) {
  return function() {
    const context = Object.assign({}, this, { arguments: [...arguments] });
    return getFunctionResult.call(context, transform.call(context, option));
  }.bind(this);
}

feature("transform")(
  resolveGetter("on"),
  resolveSetter("on", (context, option) => getOnFunction.call(context, option))
).isConvert();
