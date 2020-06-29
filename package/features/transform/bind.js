import feature from "../../feature";
import { get, isEmpty } from "lodash-es";
import { resolveGetter, resolveSetter } from "./helper";

export function getSourceValue(option) {
  const { $source, $path, $default } =
    typeof option === "string" ? { $source: option } : option;
  const source = isEmpty($path) ? this : get(this, $source);
  const path = isEmpty($path) ? $source : $path;
  return get(source, path, $default);
}

feature("transform")(
  resolveGetter("bind"),
  resolveSetter("bind", (context, option) =>
    getSourceValue.call(context, option)
  )
);
