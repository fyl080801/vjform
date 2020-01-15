import Vue from "vue";
import provider from "./provider";

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
        .filter(item => item);
    },
    createFieldComponent(h, field) {
      const { component } = field;

      if (!component) {
        return null;
      }

      provider.call(this, field);

      const { fieldOptions = {}, children = [] } = field;

      if (component) {
        return h(
          component,
          { ...fieldOptions },
          children
            .map(child => this.createFieldComponent(h, child))
            .filter(item => item !== null)
        );
      }
    }
  },
  render(h) {
    return h("div", { class: ["j-form"] }, this.createFields(h));
  }
});
