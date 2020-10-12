import Vue from 'vue'

export default Vue.extend({
  props: { value: String },
  render() {
    return <p>{this.value}</p>
  }
})
