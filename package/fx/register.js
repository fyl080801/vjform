import store from "./store";

export const register = (name, fx) => {
  const instance = { fx, group: "" };

  const assembly = () => {
    store.set(name.toUpperCase(), instance);
  };
  assembly.withDescription = description => {
    instance.description = description;
    return assembly;
  };
  assembly.withGroup = group => {
    instance.group = group;
    return assembly;
  };

  return assembly;
};
