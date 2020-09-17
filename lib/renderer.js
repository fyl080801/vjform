import provider from "./features/provider";
import { isEmpty } from "lodash-es";

export default {
  name: "renderer",
  props: {
    fields: { type: Array },
    model: [Object, Array],
    options: { type: Object },
    components: { type: Object }
  },
  data() {
    return {
      providers: null
    };
  },
  methods: {
    createFieldComponent(h, field) {
      const $field = { ...field };

      this.providers = this.providers || provider.call(this) || [];

      this.providers.forEach(({ factory }) => {
        (factory.call(this, $field) || function() {}).call(
          this,
          $field,
          this.options
        );
      });

      const { component, fieldOptions = {}, children = [], key } = $field;

      if (!isEmpty(component)) {
        return h(
          this.components[component] || component,
          { ...fieldOptions, key: fieldOptions.key || key },
          children
            .map(child => this.createFieldComponent(h, child))
            .filter(item => item !== undefined && item !== null)
        );
      }
    }
  },
  render(h) {
    return h(
      (this.options || {}).component || "div",
      { class: ["v-jform"] },
      this.fields
        .map(item => this.createFieldComponent(h, item))
        .filter(item => item !== undefined && item !== null)
    );
  }
};
