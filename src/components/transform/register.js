import store from "./store";

export const register = (getter, deal, convert = false) => {
  store.push({
    getter,
    deal,
    convert
  });
};
