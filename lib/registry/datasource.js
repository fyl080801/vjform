export default store => {
  return (type, factory) => {
    const ds = {
      name: type,
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
