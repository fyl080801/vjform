import transform from "../features/transform";
import { isEmpty } from "lodash-es";

export default {
  data() {
    return {
      listenerStore: []
    };
  },

  watch: {
    listeners: {
      handler() {
        this.release();
        this.regist();
      }
    }
  },

  methods: {
    regist() {
      this.listeners.forEach(listener => {
        const transedWatch = transform.call(this.data, {
          value: listener.watch
        });

        this.listenerStore.push(
          this.$watch(
            () => transedWatch.value,
            () => this.process(listener.actions),
            { deep: listener.deep, immediate: listener.immediate }
          )
        );
      });
    },
    release() {
      this.listenerStore.forEach(listener => listener());
    },
    process(actions) {
      actions.forEach(item => {
        const { model, result } = transform.call(this.data, item);
        const value = typeof result === "function" ? result() : result;

        if (typeof model === "string" && !isEmpty(model)) {
          this.$deepSet(this.data.model, model, value);
        }
      });
    }
  },

  created() {
    this.regist();
  },

  mounted() {},

  beforeDestroy() {
    this.release();
  }
};
