<template>
  <renderer
    :fields="transFields"
    :value="value"
    :params="params"
    @input="onInput"
  />
</template>

<script>
import renderer from "./renderer";
import transform from "./transform";
import datasource from "./mixins/datasource";
import schema from "./mixins/schema";
import watchs from "./mixins/watchs";

export default {
  name: "v-form",
  components: {
    renderer
  },
  mixins: [datasource, schema, watchs],
  props: {
    value: [Object, Array],
    params: [Object, Array],
    fields: Array,
    schema: Object,
    datasource: Object,
    watchs: Array
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
      transFields: []
    };
  },
  methods: {
    onInput(value) {
      this.$emit("input", value);
    },
    fieldsTransform(value) {
      this.transFields = transform.call(
        { model: this.value, params: this.params },
        value
      );
    }
  },
  created() {
    this.fieldsTransform(this.fields);
  }
};
</script>
