import { register } from "../register";
import { resolveGetter, resolveSetter } from "../helper";
import { getFunctionResult } from "./func";
import transform from "../../transform";

export function getOnFunction(option) {
  return arg => {
    const context = Object.assign({}, this, { arg });
    return getFunctionResult.call(context, transform.call(context, option));
  };
}

register(
  resolveGetter("on"),
  resolveSetter("on", (context, option) => getOnFunction.call(context, option))
);
