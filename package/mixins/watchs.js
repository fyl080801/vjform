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
          () => get(this.data, key),
          () => {
            const transed = transform.call(this.data, this.watchs[key]);
            Object.keys(transed).forEach(field => {
              set(this.data.model, field, transed[field]);
            });
          },
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
