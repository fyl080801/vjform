<template>
  <renderer :fields="transFields" :value="value" @input="onInput" />
</template>

<script>
import renderer from "./renderer";
import transform from "./transform";

export default {
  name: "v-form",
  components: {
    renderer
  },
  props: {
    value: [Object, Array],
    params: [Object, Array],
    fields: Array
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
      this.transFields = transform(value);
    }
  },
  created() {
    this.fieldsTransform(this.fields);
  }
};
</script>
