export default resolveOptions => {
  //
  const instance = {
    request: async () => {
      const options = resolveOptions();

      console.log(options);

      instance.data = await new Promise(resolve => {
        resolve({});
      });
    },
    data: null
  };

  return instance;
};
