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
    createFieldComponent(h, field) {
      provider.call(this, field);

      const { component, fieldOptions = {}, children = [] } = field;

      if (!isEmpty(component)) {
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
    return h(
      "div",
      { class: ["j-form"] },
      this.fields
        .map(item => this.createFieldComponent(h, item))
        .map(item => item)
    );
  }
});
