import { getFeature } from "../../feature/map";
import transform from "../transform";
import "./object";
import "./request";
import "./reference";

export const createInstance = function(context) {
  return function(options) {
    const instance = getFeature("datasource")
      .get(options.type || "object") // 默认都是 object
      .factory.call(this, () => transform.call(context, options), context);

    return instance;
  };
};

export default () => {
  const stored = [];

  getFeature("datasource").forEach((value, key) => {
    stored.push({
      ...value,
      name: key,
      description: value.description || key
    });
  });

  return stored;
};
