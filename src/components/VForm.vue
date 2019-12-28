<template>
  <renderer :fields="transFields" :value="value" @input="onInput" />
</template>

<script>
import { cloneDeep } from "lodash-es";
import renderer from "./renderer";

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
      this.transFields = cloneDeep(value);
    }
  },
  created() {
    this.fieldsTransform(this.fields);
  }
};
</script>
