import feature from "../../feature";

feature("datasource")("object", function(getOptions) {
  const options = getOptions();

  const instance = {
    watchs: [],
    data: options.data // 这里只能关联options的data，因为data的转换表达式最终转换到options的对象里
  };

  instance.watchs.push(
    this.$watch(
      () => options.data,
      value => {
        instance.data = value;
      },
      { deep: true }
    )
  );

  return instance;
}).withName("对象");
