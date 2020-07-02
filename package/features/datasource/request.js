import { get } from "lodash-es";
import { loadSourceData } from "../../api/vjform";

import feature from "../../feature";

feature("datasource")("request", function(getOptions, context) {
  const {
    watchs = [],
    autoload,
    dev, // 开发模式
    dataPath, // 数据路径
    defaultData, // 默认数据
    errorData // 异常数据
  } = getOptions();

  const instance = {
    loading: false,
    data: null,
    watchs: []
  };

  const load = async () => {
    if (dev) {
      return;
    }

    const options = getOptions();

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
})
  .withName("HTTP请求")
  .withDescription("发起HTTP请求");
