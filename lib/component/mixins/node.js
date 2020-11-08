import { isArray } from 'lodash-es'

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
          (isArray(children) ? children : [])
            .filter(child => child)
            .map(child => this.renderNode(h, child))
        )
      } else {
        return h('v-jform-node', {
          slot: fieldOptions.slot,
          scopedSlots: fieldOptions.scopedSlots,
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
  }
}
