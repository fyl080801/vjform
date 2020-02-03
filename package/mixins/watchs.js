import { get } from "lodash-es";
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
    processWatchs(key) {
      const transed = transform.call(this.data, this.watchs[key]);
      Object.keys(transed).forEach(field => {
        this.$deepSet(this.data.model, field, transed[field]);
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
