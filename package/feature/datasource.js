export default store => {
  return (type, factory) => {
    store.set(type, factory);
  };
};
