import store from "./store";

export const register = (name, factory) => {
  store.set(name, factory);
};
