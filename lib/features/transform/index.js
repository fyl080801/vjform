// import { cloneDeep, forEach } from "lodash-es";

import { createTransform } from "json-to-object";
import { getMapDefault } from "../../utils/helpers";
import { getFeature } from "../../registry/map";
import "./bind";
import "./func";
import "./on";
import "./array";
import "./update";

const getProviders = () => {
  const stored = getFeature("transform");
  return getMapDefault(stored, "providers", []);
};

export const getTransform = data => {
  const transform = createTransform().useContext(data);

  getProviders().forEach(p => {
    transform.useProvider({
      getter: p.getter,
      deal: p.deal
    });
  });

  return transform;
};
