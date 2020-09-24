import { isArray } from "lodash-es";

export const resolveGetter = getterKey => {
  return function(key, owner) {
    const option = owner[key];

    return (
      typeof option === "object" &&
      option &&
      !isArray(option) &&
      option.$type === getterKey
    );
  };
};

export const resolveSetter = (setterValue, result) => {
  return function(key, owner, context) {
    const option = owner[key];
    Object.defineProperty(owner, key, {
      get: () => setterValue(context, option)
    });
    return result;
  };
};
