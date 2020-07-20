import transform from "../features/transform";
import { isEmpty, get } from "lodash-es";

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
      },
      deep: true
    }
  },

  methods: {
    regist() {
      this.listeners.forEach(listener => {
        const transedWatch = listener.watch
          ? transform.call(this.data, {
              value: listener.watch
            })
          : null;

        this.listenerStore.push(
          this.$watch(
            () =>
              transedWatch
                ? transedWatch.value
                : get(this.data, listener.source),
            () => this.process(listener.actions),
            { deep: listener.deep, immediate: listener.immediate }
          )
        );
      });
    },
    release() {
      this.listenerStore.forEach(listener => listener());
      this.listenerStore = [];
    },
    process(actions) {
      actions.forEach(item => {
        const { model, condition = true, expression } = transform.call(
          this.data,
          item
        );

        if (!condition) {
          return;
        }

        const result = typeof result === "function" ? expression() : expression;

        if (typeof model === "string" && !isEmpty(model)) {
          if (result instanceof Promise) {
            result.then(value => {
              this.$deepSet(this.data.model, model, value);
            });
          } else {
            this.$deepSet(this.data.model, model, result);
          }
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
