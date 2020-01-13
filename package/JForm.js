import render from "./render";
import transform from "./transform";
import datasource from "./mixins/datasource";
import schema from "./mixins/schema";
import watchs from "./mixins/watchs";

export default {
  name: "j-form",
  components: {
    render
  },
  mixins: [datasource, schema, watchs],
  props: {
    value: [Object, Array],
    params: { type: [Object, Array], default: () => ({}) },
    fields: { type: Array, default: () => [] },
    schema: { type: Object, default: () => ({}) },
    datasource: { type: Object, default: () => ({}) },
    watchs: { type: Object, default: () => ({}) },
    options: { type: Object, default: () => ({}) }
  },
  watch: {
    fields: {
      handler(value) {
        this.fieldsTransform(value);
      },
      deep: true
    }
  },
  data() {
    return {
      transFields: [],
      data: {
        model: this.value,
        params: this.params,
        state: { valid: false, fields: {}, errors: [] },
        sourcedata: {},
        datasource: {}
      }
    };
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
    fieldsTransform(value) {
      this.transFields = transform.call(this.data, value);
    }
  },
  created() {
    this.fieldsTransform(this.fields);
  },
  render(h) {
    return h("render", {
      props: {
        fields: this.transFields,
        value: this.data.model,
        params: this.data.params
      },
      on: {
        input: this.onInput
      }
    });
  }
};
