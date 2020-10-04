import { createInstance } from '../../utils/datasource'

export default {
  watch: {
    datasource: {
      handler() {
        this.releaseDatasource()
        this.registDatasource()
      },
      deep: true
    }
  },
  methods: {
    registDatasource() {
      const transform = this.transformInstance.useContext(this.context)

      Object.keys(this.datasource).forEach(key => {
        const instance =
          createInstance(
            this.registry.datasource,
            transform
          )({
            ...this.options,
            ...this.datasource[key]
          }) || undefined

        if (instance) {
          this.$set(this.context.datasource, key, instance)
        }
      })
    },
    releaseDatasource() {
      this.context.datasource = {}
    }
  },
  beforeMount() {
    this.registDatasource()
  },
  beforeDestroy() {
    this.releaseDatasource()
  }
}
