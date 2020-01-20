import Ajv from "ajv";

export default {
  data() {
    return {
      ajv: new Ajv({ ...{ allErrors: true } })
    };
  },
  methods: {
    validate(value) {
      this.ajv.validate(this.schema, value);
      this.data.state.valid = this.ajv.errors === null;
      this.data.state.errors = this.ajv.errors;
    }
  },
  watch: {
    "data.model": {
      handler(value) {
        this.validate(value);
      },
      deep: true
    },
    ["data.state"](value) {
      this.$emit("state-changed", value);
    }
  },
  mounted() {
    this.validate(this.data.model);
  }
};
