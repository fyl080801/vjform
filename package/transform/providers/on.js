import { register } from "../register";
import { resolveGetter, resolveSetter } from "../helper";
import { getFunctionResult } from "./func";
import transform from "../../transform";
import { get, set } from "lodash-es";

export function getOnFunction(option) {
  return function() {
    const { $setters } = option;
    const context = Object.assign({}, this, { arguments: [...arguments] });

    if ($setters !== undefined) {
      const setters = transform.call(context, $setters);
      Object.keys(setters).forEach(key => {
        const currentValue = get(this.model, key);
        if (currentValue === undefined) {
          this.$context.$deepSet(this.model, key, setters[key]);
        } else {
          set(this.model, key, setters[key]);
        }
      });
    }

    return getFunctionResult.call(
      context,
      transform.call(context, { ...option, ...{ $setters: undefined } })
    );
  };
}

register(
  resolveGetter("on"),
  resolveSetter("on", (context, option, vue) =>
    getOnFunction.call(context, option, vue)
  ),
  true
);
