import renderer from "./renderer";
import transform from "./features/transform";
import datasource from "./mixins/datasource";
import listeners from "./mixins/listeners";
import emitter from "./utils/emitter";
import { deepSet } from "./utils/helpers";
import { v4 } from "uuid";

export default {
  name: "vjform",
  components: {
    renderer
  },
  mixins: [datasource, listeners],
  props: {
    value: [Object, Array],
    params: { type: [Object, Array], default: () => ({}) },
    fields: { type: Array, default: () => [] },
    datasource: { type: Object, default: () => ({}) },
    listeners: { type: Array, default: () => [] },
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
    },
    attachKey(fields = []) {
      fields.forEach(field => {
        field.key = field.key || v4();
        this.attachKey(field.children);
      });
    },
    onUpdate({ path, value }) {
      deepSet(this.data.model, path, value);
    }
  },
  created() {
    this.transform(this.fields);
    this.attachKey(this.renderFields);
    emitter.$on("update", this.onUpdate);
  },
  beforeDestroy() {
    emitter.$off("update", this.onUpdate);
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
