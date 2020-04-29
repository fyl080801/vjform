import { register } from "../register";
import { get } from "lodash-es";
import { loadSourceData } from "../../api/vjform";

register("request", function(getOptions, context) {
  const options = getOptions();
  const {
    watchs = [],
    autoload,
    dev, // 开发模式
    dataPath, // 数据路径
    defaultData, // 默认数据
    errorData // 异常数据
  } = options;

  const instance = {
    loading: false,
    data: null,
    watchs: []
  };

  const load = async () => {
    if (dev) {
      return;
    }

    instance.loading = true;

    try {
      const res = await loadSourceData(options);
      instance.loading = false;
      instance.data = get(res, dataPath || "data") || defaultData;
    } catch (e) {
      instance.loading = false;
      if (errorData !== undefined) {
        instance.data = errorData;
      }
    }
  };

  this.$nextTick(() => {
    const { defaultData } = getOptions();

    instance.data = defaultData || null;

    watchs.forEach(watch => {
      instance.watchs.push(
        this.$watch(
          () => get(context, watch),
          () => load()
        )
      );
    });

    if (autoload) {
      load();
    }
  });

  instance.load = load;

  return instance;
});
