import { get, toPath } from "lodash-es";

export default {
  methods: {
    $deepSet(owner, property, value) {
      const paths = toPath(property);
      let ownerCache = owner;
      let valueCache = null;

      paths.forEach((path, index) => {
        if (index !== paths.length - 1) {
          const isNumber = /^[0-9]*$/g.test(paths[index + 1]);
          valueCache = get(ownerCache, path) || (isNumber ? [] : {});
          this.$set(ownerCache, path, valueCache);
          ownerCache = valueCache;
        } else {
          this.$set(ownerCache, path, value);
        }
      });
    }
  }
};
