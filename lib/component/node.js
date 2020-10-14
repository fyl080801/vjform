import { isEmpty, isArray } from 'lodash-es'

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

    this.registry.provider.forEach(({ factory }) => {
      ;(
        factory(renderField, {
          ...this.options,
          emitter: this.registry.emitter
        }) || new Function()
      )(renderField, this.context)
    })

    const { component, fieldOptions = {}, key } = renderField

    return !isEmpty(component)
      ? h(
          this.components[component] || component,
          {
            ...fieldOptions,
            key: fieldOptions.key || key
          },
          (this.field.children && isArray(this.field.children)
            ? this.field.children
            : []
          )
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
            .filter(item => item !== undefined && item !== null)
        )
      : null
  }
}
