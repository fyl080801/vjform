import { register } from "../register";
import { resolveGetter, resolveSetter } from "../helper";

export function getFunctionResult(option) {
  const { $arguments = {}, $result, $default } = option;
  const args = [];

  Object.keys($arguments).forEach(key => {
    args.push({ key, value: $arguments[key] });
  });

  const funcArgs = args.sort((a, b) => a.key.charCodeAt() - b.key.charCodeAt());
  const func = new Function(
    funcArgs.map(a => a.key),
    "return " + $result
  );

  try {
    const result = func.apply(
      this,
      funcArgs.map(a => a.value)
    );
    return result !== undefined ? result : $default;
  } catch (e) {
    return $default;
  }
}

register(
  resolveGetter("func"),
  resolveSetter("func", (context, option) =>
    getFunctionResult.call(context, option)
  )
);
