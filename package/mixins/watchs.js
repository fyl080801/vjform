import { get, isObject } from "lodash-es";
import transform from "../features/transform";
import { deepSet } from "../utils/helpers";

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
    processWatchs(key) {
      const transed = transform.call(this.data, this.watchs[key]);
      Object.keys(transed).forEach(field => {
        const transedValue = transed[field];
        if (field === "" && isObject(transedValue)) {
          Object.keys(transedValue).forEach(transedKey => {
            deepSet(this.data.model, transedKey, transedValue[transedKey]);
          });
        } else {
          deepSet(this.data.model, field, transedValue);
        }
      });
    },
    registWatchs() {
      const watchKeys = Object.keys(this.watchs);

      watchKeys.forEach(key => {
        if (Object.keys(this.watchs[key]).length <= 0) {
          return;
        }

        this.watchstore.push(
          this.$watch(
            () => get(this.data, key),
            () => this.processWatchs(key),
            { deep: false }
          )
        );
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
