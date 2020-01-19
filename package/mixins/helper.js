import { get, toPath } from "lodash-es";

export default {
  methods: {
    $deepSet(owner, property, value) {
      const paths = toPath(property);
      let ownerCache = owner;
      let valueCache = null;

      paths.forEach((path, index) => {
        valueCache = get(ownerCache, path) || (isNaN(path) ? [] : {});
        if (index !== paths.length - 1) {
          this.$set(ownerCache, path, valueCache);
          ownerCache = valueCache;
        } else {
          this.$set(ownerCache, path, value);
        }
      });
    }
  }
};
