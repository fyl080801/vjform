import { createInstance } from "../features/datasource";

export default {
  watch: {
    datasource: {
      handler() {
        this.releaseDatasource();
        this.registDatasource();
      },
      deep: true
    }
  },

  methods: {
    registDatasource() {
      Object.keys(this.datasource).forEach(key => {
        const instance =
          createInstance(this.data).call(this, {
            ...this.datasource[key],
            dev: this.options.mode === "design"
          }) || undefined;
        if (instance) {
          this.$set(this.data.datasource, key, instance);
        }
      });
    },
    releaseDatasource() {
      this.data.datasource = {};
    }
  },

  created() {
    this.registDatasource();
  },

  mounted() {},

  beforeDestroy() {
    this.releaseDatasource();
  }
};
