import feature from "../../feature";
import { resolveGetter, resolveSetter } from "./helper";
import transform from "./index";
import { getFunctionResult } from "./func";
import { deepSet } from "../../utils/helpers";
import { cloneDeep } from "lodash-es";

export function getAssignFunction(option) {
  return function() {
    const { $model } = option;
    const context = { ...this, arguments: [...arguments] };
    const result = getFunctionResult.call(
      context,
      transform.call(context, option)
    );
    deepSet(
      this.model,
      $model,
      typeof result === "object" ? cloneDeep(result) : result
    );
  }.bind(this);
}

feature
  .transform(
    resolveGetter("update"),
    resolveSetter("update", (context, option) =>
      getAssignFunction.call(context, option)
    )
  )
  .isConvert();
