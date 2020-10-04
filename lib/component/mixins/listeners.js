import { get } from 'lodash-es'

export default {
  data() {
    return {
      listenerStore: []
    }
  },

  watch: {
    listeners: {
      handler() {
        this.releaseListeners()
        this.registListeners()
      },
      deep: true
    }
  },

  methods: {
    registListeners() {
      this.listeners.forEach(listener => {
        if (!listener.watch) {
          return
        }
        this.listenerStore.push(
          this.$watch(
            () =>
              typeof listener.watch === 'string'
                ? get(this.context, listener.watch)
                : this.transform
                    .useContext(this.context)
                    .transform({ value: listener.watch }).value,
            () => {
              this.$nextTick(() => {
                this.process(listener.actions)
              })
            },
            { deep: listener.deep, immediate: listener.immediate }
          )
        )
      })
    },
    releaseListeners() {
      this.listenerStore.forEach(listener => listener())
      this.listenerStore = []
    },
    process(actions) {
      actions.forEach(item => {
        const {
          condition = true,
          handler,
          async = false,
          timeout
        } = this.transform.useContext(this.context).transform(item)

        if (!condition) {
          return
        }

        const executor = options => {
          const { handler } = options

          if (typeof handler !== 'function') {
            return
          }

          handler()
        }

        if (async) {
          setTimeout(() => {
            executor({ handler })
          }, timeout)
        } else {
          executor({ handler })
        }
      })
    }
  },

  beforeMount() {
    this.registListeners()
  },

  beforeDestroy() {
    this.releaseListeners()
  }
}
