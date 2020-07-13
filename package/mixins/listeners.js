export default {
  data() {
    return {
      store: []
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
        this.store.push(
          this.$watch(
            () => ({ value: listener.watch }.value),
            () => this.process(),
            { deep: false }
          )
        );
      });
    },
    release() {
      this.store.forEach(listener => listener());
    },
    process() {}
  },

  created() {
    this.regist();
  },

  mounted() {},

  beforeDestroy() {
    this.release();
  }
};
