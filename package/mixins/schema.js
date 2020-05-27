import Ajv from "ajv";
import { isEqual } from "lodash-es";

export default {
  data() {
    return {
      ajv: new Ajv({ ...{ allErrors: true } })
    };
  },
  methods: {
    validate(value) {
      this.ajv.validate(this.schema, value);

      if (!isEqual(this.data.state.errors, this.ajv.errors)) {
        this.data.state.valid =
          this.ajv.errors === null || this.ajv.errors.length <= 0;
        this.data.state.invalid =
          this.ajv.errors !== null && this.ajv.errors.length > 0;
        this.data.state.errors = this.ajv.errors || [];
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
    "data.state": {
      handler(value) {
        this.$emit("state-changed", value);
      },
      deep: true
    }
  },
  mounted() {
    this.validate(this.data.model);
  }
};
