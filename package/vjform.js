import renderer from "./renderer";
import transform from "./transform";
import datasource from "./mixins/datasource";
import schema from "./mixins/schema";
import watchs from "./mixins/watchs";
import helper from "./mixins/helper";
import inits from "./mixins/init";

export default {
  name: "vjform",
  components: {
    renderer
  },
  mixins: [datasource, schema, watchs, inits, helper],
  props: {
    value: [Object, Array],
    params: { type: [Object, Array], default: () => ({}) },
    fields: { type: Array, default: () => [] },
    schema: { type: Object, default: () => ({}) },
    datasource: { type: Object, default: () => ({}) },
    watchs: { type: Object, default: () => ({}) },
    inits: { type: Object, default: () => ({}) },
    components: { type: Object, default: () => ({}) },
    options: { type: Object, default: () => ({}) }
  },
  watch: {
    fields: {
      handler(value) {
        this.transform(value);
      },
      deep: true
    },
    params: {
      handler(value) {
        this.data.params = value;
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
      this.renderFields = transform.call(
        { ...this.data, $context: this },
        value,
        { context: this }
      );
    }
  },
  created() {
    this.transform(this.fields);
  },
  render(h) {
    return h("renderer", {
      props: {
        fields: this.renderFields,
        value: this.data,
        components: this.components,
        options: this.options
      },
      on: {
        input: this.onInput
      }
    });
  }
};
