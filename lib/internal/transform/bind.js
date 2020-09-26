import { resolveGetter, resolveDeal } from "../../utils/transform";
import { get } from "lodash-es";

export const getSourceValue = (value, options) => {
  const { $source, $default } = value;
  const { context } = options;
  return get(context, $source, $default);
};

export const getter = resolveGetter("bind");

export const deal = resolveDeal(getSourceValue);
