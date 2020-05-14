import { get, toPath, isArray } from "lodash-es";

export default {
  methods: {
    $deepSet(owner, property, value) {
      const paths = toPath(property);
      let ownerCache = owner;
      let valueCache = null;

      paths.forEach((path, index) => {
        if (index !== paths.length - 1) {
          const isNumber = /^[0-9]*$/g.test(paths[index + 1]);
          const currentValue = get(ownerCache, path);
          valueCache =
            currentValue === undefined || currentValue === null
              ? isNumber
                ? []
                : {}
              : currentValue;
          this.$set(
            ownerCache,
            isArray(ownerCache) ? parseInt(path) : path,
            valueCache
          );
          ownerCache = valueCache;
        } else {
          this.$set(ownerCache, path, value);
        }
      });
    }
  }
};
