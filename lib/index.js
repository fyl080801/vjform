import { Main } from './component'
import commonRegistry from './utils/register'

const install = function(Vue) {
  Vue.component('v-jform', Main)
}

const component = {
  ...Main,
  install,
  use(builder) {
    commonRegistry.use(builder)
    return component
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default component
