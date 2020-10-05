import { createRegistry } from '../registry'
import { attachKey, deepSet } from '../utils/helpers'
import commonRegistry from '../utils/register'
import { isEmpty } from 'lodash-es'
import mitt from 'mitt'
import datasource from './mixins/datasource'
import listeners from './mixins/listeners'
import functional from './mixins/functional'
import reference from './mixins/reference'

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
  mixins: [datasource, listeners, functional, reference],
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
    }
  },
  methods: {
    transformField(value) {
      this.renders = this.transform.useContext(this.context).transform(value)
      attachKey(this.renders)
    },
    renderFieldComponent(h, field) {
      const renderField = { ...field }

      this.registry.provider.forEach(({ factory }) => {
        ;(
          factory(renderField, { ...this.options, emitter: this.emitter }) ||
          new Function()
        )(renderField, this.context)
      })

      const { component, fieldOptions = {}, key } = renderField

      if (!isEmpty(component)) {
        return h(
          this.components[component] || component,
          { ...fieldOptions, key: fieldOptions.key || key },
          (field.children && Array.isArray(field.children)
            ? field.children
            : []
          )
            .map(child => this.renderFieldComponent(h, child))
            .filter(item => item !== undefined && item !== null)
        )
      }
    },
    onUpdate(payload) {
      deepSet(this.context.model, payload.path, payload.value)
    }
  },
  created() {
    this.emitter = mitt()
    this.emitter.on('update', this.onUpdate)

    this.registry = createRegistry(commonRegistry.map)
      .use(this.initialling || new Function())
      .build()
    this.registry.transform.useOptions({ emitter: this.emitter })
  },
  beforeMount() {
    this.transformField(this.fields)
  },
  render(h) {
    return h(
      this.tag,
      { class: ['v-jform'] },
      this.renders
        .map(item => this.renderFieldComponent(h, item))
        .filter(item => item !== undefined && item !== null)
    )
  },
  beforeDestory() {
    if (this.emitter) {
      this.emitter.off('update', this.onUpdate)
    }
  }
}
