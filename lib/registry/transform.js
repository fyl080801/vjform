import { getMapDefault } from "../utils/helpers";
import { createTransform } from "json-to-object";

export const register = store => {
  return (getter, deal) => {
    const providers = getMapDefault(store, "providers", []);

    const provider = {
      getter,
      deal
    };

    providers.push(provider);
  };
};

export const merge = (store, sourceStore) => {
  const providers = getMapDefault(store, "providers", []);

  getMapDefault(sourceStore, "providers", []).forEach(item => {
    providers.push(item);
  });
};

export const resolve = store => {
  return getMapDefault(store, "providers", []).reduce(
    (pre, cur) => pre.useProvider(cur),
    createTransform()
  );
};
