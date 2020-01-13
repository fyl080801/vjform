import Vue from "vue";
import provider from "./provider";
import { isEmpty } from "lodash-es";

export default Vue.component("renderer", {
  props: {
    fields: Array,
    value: [Object, Array],
    params: [Object, Array]
  },
  watch: {
    value: {
      handler(value) {
        this.$emit("input", value);
      },
      deep: true
    }
  },
  methods: {
    createFields(h) {
      return this.fields
        .map(item => this.createFieldComponent(h, item))
        .filter(item => item !== null);
    },
    createFieldComponent(h, field) {
      const { component } = field;

      if (!component) {
        return null;
      }

      provider.call({ model: this.value, params: this.params }, field);

      const { fieldOptions = {}, children = [] } = field;

      return !isEmpty(component)
        ? h(
            component,
            { ...fieldOptions },
            children
              .map(child => this.createFieldComponent(h, child))
              .filter(item => item !== null)
          )
        : null;
    }
  },
  render(h) {
    return h("div", { class: ["j-form"] }, this.createFields(h));
  }
});
