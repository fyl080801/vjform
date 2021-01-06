import { createRegistry } from '../registry'
import { attachKey, deepSet } from '../utils/helpers'
import commonRegistry from '../utils/register'
import datasource from './mixins/datasource'
import listeners from './mixins/listeners'
import functional from './mixins/functional'
import reference from './mixins/reference'
import node from './mixins/node'
import { Node } from './node'
import { isArray } from 'lodash-es'

export const Main = {
  name: 'v-jform',
  props: {
    tag: { type: String, default: 'div' },
    value: { type: Object, default: () => ({}) },
    params: { type: Object, default: () => ({}) },
    fields: { type: Array, default: () => [] },
    datasource: { type: Object, default: () => ({}) },
    listeners: { type: Array, default: () => [] },
    components: { type: Object, default: () => ({}) },
    initialling: Function,
    options: Object
  },
  components: { 'v-jform-node': Node },
  mixins: [reference, functional, datasource, listeners, node],
  data() {
    return {
      registry: null,
      renders: {},
      context: {
        model: this.value,
        params: this.params,
        datasource: {},
        functional: {},
        refs: {}
      },
      emitter: null
    }
  },
  computed: {
    transform() {
      return this.registry.transform
    }
  },
  watch: {
    fields: {
      handler(value) {
        this.transformField(value)
      },
      deep: true
    },
    params: {
      handler(value) {
        this.context.params = value
      }
    },
    value: {
      handler(value) {
        this.context.model = value
      }
    }
  },
  methods: {
    transformField(value) {
      this.renders = this.transform.useContext(this.context).transform(value)
      attachKey(this.renders)
    },
    onUpdate(payload) {
      if (payload.path === '*') {
        const isarr = isArray(payload.value) && isArray(this.context.model)
        Object.keys(payload.value).forEach(key => {
          deepSet.call(
            this,
            this.context.model,
            isarr ? +key : key,
            payload.value[key]
          )
        })
      } else {
        deepSet.call(this, this.context.model, payload.path, payload.value)
      }
    }
  },
  created() {
    this.registry = createRegistry(commonRegistry.map)
      .use(this.initialling || new Function())
      .build()
    this.registry.emitter.on('update', this.onUpdate)
  },
  beforeMount() {
    this.transformField(this.fields)
  },
  render(h) {
    return h(
      this.tag,
      { class: ['v-jform'] },
      this.renders.filter(item => item).map(item => this.renderNode(h, item))
    )
  },
  beforeDestory() {
    if (this.registry) {
      this.registry.destory()
    }
  }
}
