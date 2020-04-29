import { register } from "../register";

register("object", function(getOptions) {
  const { data } = getOptions();

  const instance = {
    watchs: [],
    data
  };

  instance.watchs.push(
    this.$watch(
      () => data,
      value => {
        instance.data = value;
      },
      { deep: true }
    )
  );

  return instance;
});
