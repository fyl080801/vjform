import store from "./store";

export const register = (type, factory) => {
  store.set(type, factory);
};
