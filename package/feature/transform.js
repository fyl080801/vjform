import { getMapDefault } from "../utils/helpers";

export default store => {
  return (getter, deal) => {
    const providers = getMapDefault(store, "providers", []);

    const provider = {
      getter,
      deal,
      convert: false
    };

    providers.push(provider);

    return {
      isConvert: () => {
        provider.convert = true;
      }
    };
  };
};
