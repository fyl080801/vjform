import store from "./store";

export const register = (name, factory) => {
  store.set(name, factory);
};

export const registerProvider = (name, provider) => {
  register(name, function() {
    return provider;
  });
};
