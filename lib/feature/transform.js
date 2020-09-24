import { getMapDefault } from "../utils/helpers";

export default store => {
  return (getter, deal) => {
    const providers = getMapDefault(store, "providers", []);

    const provider = {
      getter,
      deal
    };

    providers.push(provider);
  };
};
