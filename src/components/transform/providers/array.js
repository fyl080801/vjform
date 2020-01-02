import { register } from "../register";
import { resolveGetter, resolveSetter } from "../helper";
import transform from "../index";

export function getSourceValue(option) {
  const { $data, $field, $default } = option;

  console.log($field);
  const list = ($data || $default || []).map(item => {
    return transform.call({ scope: item, ...this }, $field);
  });
  return list;
}

register(
  resolveGetter("array"),
  resolveSetter("array", (context, option) =>
    getSourceValue.call(context, option)
  )
);
