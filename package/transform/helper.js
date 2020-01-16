import { isArray } from "lodash-es";

export const resolveGetter = getterKey => {
  return function(key, owner) {
    const option = owner[key];
    return (
      key.toString().indexOf(`$${getterKey}:`) === 0 ||
      (typeof option === "object" &&
        option &&
        !isArray(option) &&
        (option[`$${getterKey}`] === true || option.$type === getterKey))
    );
  };
};

export const resolveSetter = (setterKey, setterValue) => {
  return function(key, owner) {
    const option = owner[key];
    if (key.toString().indexOf(`$${setterKey}:`) === 0) {
      const reKey = key.replace(`$${setterKey}:`, "").trim();
      owner[reKey] = undefined;
      Object.defineProperty(owner, reKey, {
        get: () => setterValue(this, option)
      });
      delete owner[key];
    } else {
      Object.defineProperty(owner, key, {
        get: () => setterValue(this, option)
      });
    }
  };
};
