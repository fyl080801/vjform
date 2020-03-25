import { register } from "../register";
import transform from "../../transform";

register("object", function(options, context) {
  const { data } = options;
  const clonedData = transform.call(context, { data: data });

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
