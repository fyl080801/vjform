import { register } from "../register";

register("object", function(getOptions) {
  const clonedData = getOptions();

  const instance = {
    watchs: [],
    data: clonedData.data
  };

  instance.watchs.push(
    this.$watch(
      () => clonedData.data,
      value => {
        instance.data = value;
      },
      { deep: true }
    )
  );

  return instance;
});
