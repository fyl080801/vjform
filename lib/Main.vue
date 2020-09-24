<template>
  <renderer
    :model="this.value"
    :fields="renderFields"
    :components="components"
    :options="options"
  ></renderer>
</template>

<script>
import renderer from "./renderer";
import datasource from "./mixins/datasource";
import listeners from "./mixins/listeners";
import { v4 } from "uuid";
import { getTransform } from "./features/transform";

export default {
  name: "v-jform",
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
        datasource: {}
      }
    };
  },
  methods: {
    transform(value) {
      this.renderFields = getTransform(this.data).transform(value);
      this.attachKey(this.renderFields);
    },
    attachKey(fields = []) {
      fields.forEach(field => {
        field.key = field.key || v4();
        this.attachKey(field.children);
      });
    }
  },
  created() {
    this.transform(this.fields);
  }
};
</script>
