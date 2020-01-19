import Vue from "vue";
import provider from "./provider";
import helper from "./mixins/helper";
import { isEmpty } from "lodash-es";
import Ajv from "ajv";

export default Vue.component("renderer", {
  props: {
    fields: Array,
    value: [Object, Array]
  },
  mixins: [helper],
  data() {
    return {
      ajv: new Ajv()
    };
  },
  computed: {
    model() {
      return this.value.model;
    },
    state() {
      return this.value.state;
    }
  },
  watch: {
    "value.model": {
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
            .filter(item => item !== undefined && item !== null)
        );
      }
    }
  },
  render(h) {
    return h(
      "div",
      { class: ["v-jform"] },
      this.fields
        .map(item => this.createFieldComponent(h, item))
        .filter(item => item !== undefined && item !== null)
    );
  }
});
