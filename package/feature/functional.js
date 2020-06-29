export default store => {
  return (name, fx) => {
    const instance = { fx, group: "" };

    store.set(name.toUpperCase(), instance);

    const assembly = {
      withDescription: description => {
        instance.description = description;
        return assembly;
      },
      withGroup: group => {
        instance.group = group;
        return assembly;
      }
    };

    return assembly;
  };
};
