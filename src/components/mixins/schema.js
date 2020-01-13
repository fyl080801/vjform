import Ajv from "ajv";
import { isEqual } from "lodash-es";

export default {
  data() {
    return {
      ajv: new Ajv()
    };
  },
  methods: {
    validate(value) {
      this.ajv.validate(this.schema, value);
      if (!isEqual(this.data.state.errors, this.ajv.errors)) {
        this.data.state = {
          valid: this.ajv.errors === null,
          fields: {},
          errors: this.ajv.errors
        };
      }
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
