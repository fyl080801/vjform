export default store => {
  return (name, factory) => {
    const instance = {
      name,
      factory,
      index: 0
    };

    store.set(name, instance);

    return {
      withIndex: index => {
        instance.index = index;
      }
    };
  };
};
