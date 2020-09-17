import feature from "../../feature";
import { resolveGetter, resolveSetter } from "./helper";
import functional from "../functional";

export function getFunctionResult(option) {
  const { $arguments = {}, $result, $default, $debug = false } = option;
  const args = [];

  if (typeof $result !== "string") {
    return $result || $default;
  }

  Object.keys($arguments).forEach(key => {
    args.push({ key, value: $arguments[key] });
  });

  const funcArgs = args
    .sort((a, b) => a.key.charCodeAt() - b.key.charCodeAt())
    .concat(functional().map(fx => ({ key: fx.name, value: fx.fx })));
  // 加上函数引用

  try {
    const result = new Function(
      funcArgs.map(a => a.key),
      "return " + $result
    ).apply(
      this,
      funcArgs.map(a => a.value)
    );

    if ($debug) {
      // eslint-disable-next-line
      console.log(result);
    }

    return result !== undefined ? result : $default;
  } catch (e) {
    if ($debug) {
      // eslint-disable-next-line
      console.log(e);
    }

    return $default;
  }
}

feature.transform(
  resolveGetter("func"),
  resolveSetter("func", (context, option) =>
    getFunctionResult.call(context, option)
  )
);
