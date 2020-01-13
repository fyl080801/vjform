import { get, set } from "lodash-es";
import transform from "../transform";

export default {
  data() {
    return {
      watchstore: []
    };
  },

  watch: {
    watchs: {
      handler() {
        this.releaseWatchs();
        this.registWatchs();
      },
      deep: true
    }
  },

  methods: {
    registWatchs() {
      const watchKeys = Object.keys(this.watchs);

      watchKeys.forEach(key => {
        if (Object.keys(this.watchs[key]).length <= 0) {
          return;
        }

        const watcher = this.$watch(
          () => {
            // 兼容旧版本写法
            if (
              !key.startsWith("model.") &&
              !key.startsWith("sourcedata.") &&
              !key.startsWith("datasource.") &&
              !key.startsWith("params.")
            ) {
              return get(this.data.model, key);
            }

            // 允许监控除了model以外的数据
            return get(this.data, key);
          },
          () => {
            Object.keys(this.watchs[key]).forEach(field => {
              set(
                this.data.model,
                field,
                transform.call(this.data, [this.watchs[key][field]])[0]
              );
            });
          },
          // 不要深度监听
          { deep: false }
        );

        this.watchstore.push(watcher);
      });
    },
    releaseWatchs() {
      this.watchstore.forEach(watcher => watcher());
    }
  },

  created() {
    this.registWatchs();
  },

  mounted() {},

  beforeDestroy() {
    this.releaseWatchs();
  }
};
