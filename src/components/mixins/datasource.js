import ds from "../datasource";

export default {
  data() {
    return {
      datasourcestore: {},
      watchedSourcedata: []
    };
  },

  watch: {
    datasource: {
      handler(val) {
        this.releaseDatasource(val);
        this.registDatasource();
      },
      deep: true
    }
  },

  methods: {
    registDatasource() {
      Object.keys(this.datasource).forEach(key => {
        const instance =
          ds(this.data).call(this, {
            ...this.datasource[key],
            dev: this.options.mode === "design"
          }) || undefined;
        if (instance) {
          this.$set(this.datasourcestore, key, instance);
        }
      });

      // // 第一次先赋值一次
      Object.keys(this.datasourcestore).forEach(key => {
        this.$set(this.data.sourcedata, key, this.datasourcestore[key].data);
        this.$set(this.data.datasource, key, this.datasourcestore[key]);

        this.watchedSourcedata.push(
          this.$watch(
            () => this.datasourcestore[key].data,
            val => this.$set(this.data.sourcedata, key, val)
          )
        );
      });
    },
    releaseDatasource() {
      // 回头这里加比对机制，只将不存在的数据源进行释放
      Object.keys(this.datasourcestore).forEach(key => {
        if (!this.datasourcestore[key]) {
          return;
        }
        const { watchs = [] } = this.datasourcestore[key];
        watchs.forEach(watch => watch());
      });

      this.watchedSourcedata.forEach(item => item());

      this.data.datasource = {};
      this.data.sourcedata = {};
      this.datasourcestore = {};
      this.watchedSourcedata = [];
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
