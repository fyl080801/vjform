import feature from "../../feature";
import { resolveGetter, resolveSetter } from "./helper";
import { getFunctionResult } from "./func";
import { getTransform } from "./index";

export function getOnFunction(option) {
  return function() {
    const context = { ...this, arguments: [...arguments] };
    return getFunctionResult.call(
      context,
      getTransform(context).transform(option)
    );
  }.bind(this);
}

feature.transform(
  resolveGetter("on"),
  resolveSetter((context, option) => getOnFunction.call(context, option), false)
);
