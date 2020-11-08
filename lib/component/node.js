import { isArray } from 'lodash-es'
import node from './mixins/node'

export const Node = {
  name: 'v-jform-node',
  props: {
    context: Object,
    field: Object,
    registry: Object,
    components: Object,
    options: Object
  },
  mixins: [node],
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
      (isArray(children) ? children : [])
        .filter(child => child)
        .map(child => this.renderNode(h, child))
    )
  }
}
