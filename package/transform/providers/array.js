import { register } from "../register";
import { resolveGetter, resolveSetter } from "../helper";
import transform from "..";

export function getSourceValue(option) {
  const { $data, $field, $default } = option;
  const data = transform.call(this, [$data]);

  return (data[0] || $default || []).map((scope, index) => {
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
