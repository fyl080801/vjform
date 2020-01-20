import { register } from "../register";
import { resolveGetter, resolveSetter } from "../helper";
import { getFunctionResult } from "./func";
import transform from "../../transform";

export function getOnFunction(option) {
  return function() {
    const context = Object.assign({}, this, { arguments: [...arguments] });
    return getFunctionResult.call(context, transform.call(context, option));
  }.bind(this);
}

register(
  resolveGetter("on"),
  resolveSetter("on", (context, option) => getOnFunction.call(context, option)),
  true
);
