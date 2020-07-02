import transform from "../features/transform";

export default {
  data() {
    return {
      watchstore: []
    };
  },

  methods: {},

  mounted() {
    const initKeys = Object.keys(this.inits);

    if (initKeys.length <= 0) {
      return;
    }

    const transed = transform.call(this.data, this.inits);

    initKeys.forEach(key => {
      this.$deepSet(this.data.model, key, transed[key]);
    });
  }
};
