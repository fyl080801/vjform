export default {
  computed: {
    ignoreNodeWrappers() {
      return (this.options || {}).directComponents || []
    }
  },
  methods: {
    resolveField(field) {
      const renderField = {
        ...field,
        children: [].concat(field.children)
      }

      this.registry.provider
        .useOptions({ ...this.options, registry: this.registry })
        .execute(renderField, this.context)

      return renderField
    },
    renderNode(h, field) {
      const {
        component,
        fieldOptions = {},
        key,
        children = [],
        options = {}
      } = field

      return this.ignoreNodeWrappers.includes(component) || options.direct
        ? h(
            this.components[component] || component,
            {
              ...fieldOptions,
              key: fieldOptions.key || key
            },
            children.map(child => this.renderNode(h, child))
          )
        : h('v-jform-node', {
            slot: fieldOptions.slot,
            scopedSlots: fieldOptions.scopedSlots,
            props: {
              context: this.context,
              field: field,
              registry: this.registry,
              components: this.components,
              options: this.options
            }
          })
    }
  }
}
