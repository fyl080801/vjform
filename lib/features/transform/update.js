import feature from "../../registry";
import { resolveGetter, resolveSetter } from "./helper";
import { getTransform } from "./index";
import { getFunctionResult } from "./func";
import { deepSet } from "../../utils/helpers";
import { cloneDeep } from "lodash-es";

export function getAssignFunction(option) {
  return function() {
    const { $model } = option;
    const context = { ...this, arguments: [...arguments] };
    const result = getFunctionResult.call(
      context,
      getTransform(context).transform(option)
    );
    deepSet(
      this.model,
      $model,
      typeof result === "object" ? cloneDeep(result) : result
    );
  }.bind(this);
}

feature.transform(
  resolveGetter("update"),
  resolveSetter(
    (context, option) => getAssignFunction.call(context, option),
    false
  )
);
