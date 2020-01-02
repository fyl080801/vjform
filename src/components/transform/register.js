import store from "./store";

export const register = (getter, deal) => {
  store.push({
    getter,
    deal
  });
};
