export const Node = {
  name: 'v-jform-node',
  props: {
    context: Object,
    field: Object,
    registry: Object,
    components: Object,
    options: Object
  },
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
        .useOptions({
          ...this.options,
          registry: this.registry,
          node: this
        })
        .execute(renderField, this.context)

      return renderField
    },
    renderNode(h, field) {
      const renderField = this.resolveField(field)
      const {
        component,
        fieldOptions = {},
        key,
        children,
        options = {}
      } = renderField

      if (this.ignoreNodeWrappers.includes(component) || options.direct) {
        return h(
          this.components[component] || component,
          {
            ...fieldOptions,
            key: fieldOptions.key || key
          },
          (Array.isArray(children) ? children : [])
            .filter(child => child)
            .map(child => this.renderNode(h, child))
        )
      } else {
        return h('v-jform-node', {
          slot: fieldOptions.slot,
          props: {
            context: this.context,
            field: renderField,
            registry: this.registry,
            components: this.components,
            options: this.options
          }
        })
      }
    }
  },
  mounted() {
    Object.assign(this.context.refs, this.$refs)
  },
  render(h) {
    const { component, fieldOptions = {}, key, children } = this.field

    return h(
      this.components[component] || component,
      {
        ...fieldOptions,
        key: fieldOptions.key || key
      },
      (Array.isArray(children) ? children : [])
        .filter(child => child)
        .map(child => this.renderNode(h, child))
    )
  }
}
