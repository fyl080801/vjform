import feature from "../../registry";
import { resolveGetter, resolveSetter } from "./helper";
import { getTransform } from "./index";

export function getSourceValue(option) {
  const { $field, $default } = option;

  const transed = getTransform(this).transform({
    ...option,
    $field: null,
    $type: null
  });

  const isArrayData = Array.isArray(transed.$data || $default);

  return (isArrayData ? transed.$data || $default : []).map((scope, index) => {
    return getTransform({ ...this, scope, index }).transform($field);
  });
}

feature.transform(
  resolveGetter("array"),
  resolveSetter(
    (context, option) => getSourceValue.call(context, option),
    false
  )
);
