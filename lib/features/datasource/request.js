import { get, cloneDeep } from "lodash-es";
import { loadSourceData } from "../../api/vjform";

import feature from "../../registry";

feature
  .datasource("request", function(getOptions) {
    const {
      autoload,
      dev, // 开发模式
      dataPath, // 数据路径
      defaultData, // 默认数据
      errorData // 异常数据
    } = getOptions();

    const instance = {
      loading: false,
      data: null
    };

    const reset = () => {
      instance.data = cloneDeep(defaultData);
    };

    const clear = () => {
      instance.data = null;
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
      instance.data = defaultData ? cloneDeep(defaultData) : null;

      if (autoload) {
        load();
      }
    });

    instance.load = load;
    instance.clear = clear;
    instance.reset = reset;

    return instance;
  })
  .withName("HTTP请求")
  .withDescription("发起HTTP请求");
