import store from "./store";

export const register = (name, fx) => {
  const instance = { name: name.toUpperCase(), fx, group: "" };

  const assembly = () => {
    store.push(instance);
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
