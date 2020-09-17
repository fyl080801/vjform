import feature from "../../feature";

feature
  .datasource("reference", function(getOptions) {
    const { ref } = getOptions();

    const instance = {
      refs: null
    };

    Object.defineProperty(instance, "instance", {
      get: () => (instance.refs || {})[ref]
    });

    this.$nextTick(() => {
      // children 是 renderer
      // 组件里定义的 ref 都在 renderer 里
      instance.refs = this.$children[0].$refs;
    });

    return instance;
  })
  .withName("引用")
  .withDescription("可获得组件实例，使用组件方法");
