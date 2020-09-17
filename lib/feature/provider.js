import { getMapDefault } from "../utils/helpers";

export default store => {
  return factory => {
    const providers = getMapDefault(store, "providers", []);

    const instance = {
      factory,
      index: 0
    };

    providers.push(instance);

    return {
      withIndex: index => {
        instance.index = index;
      }
    };
  };
};
