export const register = store => {
  return (type, factory) => {
    const ds = {
      name: type,
      description: "",
      factory
    };

    store.set(type, ds);

    const assembly = {
      withName: str => {
        ds.name = str;
        return assembly;
      },
      withDescription: str => {
        ds.description = str;
        return assembly;
      }
    };

    return assembly;
  };
};

// eslint-disable-next-line no-unused-vars
export const merge = (store, sourceStore) => {
  //
};

export const resolve = () => {
  //
};
