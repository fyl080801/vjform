import { isArray } from 'lodash-es'

export const Node = {
  name: 'v-jform-node',
  props: {
    context: Object,
    field: Object,
    registry: Object,
    components: Object,
    options: Object
  },
  mounted() {
    Object.assign(this.context.refs, this.$refs)
  },
  render(h) {
    const renderField = { ...this.field }

    this.registry.provider
      .useOptions({ ...this.options, registry: this.registry })
      .execute(renderField, this.context)

    const { component, fieldOptions = {}, key } = renderField

    return h(
      this.components[component] || component,
      {
        ...fieldOptions,
        key: fieldOptions.key || key
      },
      (isArray(this.field.children) ? this.field.children : [])
        .filter(child => child)
        .map(child =>
          h('v-jform-node', {
            slot: (child.fieldOptions || {}).slot,
            scopedSlots: (child.fieldOptions || {}).scopedSlots,
            props: {
              context: this.context,
              field: child,
              registry: this.registry,
              components: this.components,
              options: this.options
            }
          })
        )
    )
  }
}
