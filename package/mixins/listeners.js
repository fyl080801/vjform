import transform from "../features/transform";
import { isEmpty, get } from "lodash-es";
import { deepSet } from "../utils/helpers";

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
        if (!listener.watch) {
          return;
        }

        this.listenerStore.push(
          this.$watch(
            () =>
              typeof listener.watch === "string"
                ? get(this.data, listener.watch)
                : transform.call(this.data, { value: listener.watch }).value,
            () => {
              const { condition = true, actions } = listener;

              if (!condition) {
                return;
              }

              this.$nextTick(() => {
                this.process(actions);
              });
            },
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
        const {
          model,
          condition = true,
          expression,
          async = false
        } = transform.call(this.data, item);

        if (!condition) {
          return;
        }

        const executor = options => {
          const { model, expression } = options;

          const result =
            typeof expression === "function" ? expression() : expression;

          if (typeof model === "string" && !isEmpty(model)) {
            if (result instanceof Promise) {
              result.then(value => {
                deepSet(this.data.model, model, value);
              });
            } else {
              deepSet(this.data.model, model, result);
            }
          }
        };

        if (async) {
          setTimeout(() => {
            executor({ model, expression });
          });
        } else {
          executor({ model, expression });
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
