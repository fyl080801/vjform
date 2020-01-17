import render from "./render";
import transform from "./transform";
import datasource from "./mixins/datasource";
import schema from "./mixins/schema";
import watchs from "./mixins/watchs";

export default {
  name: "vjform",
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
        this.transform(value);
      },
      deep: true
    }
  },
  data() {
    return {
      renderFields: [],
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
    transform(value) {
      this.renderFields = transform.call(this.data, value);
    }
  },
  created() {
    this.transform(this.fields);
  },
  render(h) {
    return h("render", {
      props: {
        fields: this.renderFields,
        value: this.data.model
      },
      on: {
        input: this.onInput
      }
    });
  }
};
