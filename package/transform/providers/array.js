import { register } from "../register";
import { resolveGetter, resolveSetter } from "../helper";
import transform from "..";

export function getSourceValue(option) {
  const { $field, $default } = option;
  const transed = transform.call(this, { ...option, ...{ $field: null } });

  return (transed.$data || $default || []).map((scope, index) => {
    return transform.call(Object.assign({}, this, { scope, index }), $field);
  });
}

register(
  resolveGetter("array"),
  resolveSetter("array", (context, option) =>
    getSourceValue.call(context, option)
  ),
  true
);
