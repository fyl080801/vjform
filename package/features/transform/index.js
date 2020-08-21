import { cloneDeep, forEach } from "lodash-es";
import { getMapDefault } from "../../utils/helpers";
import { getFeature } from "../../feature/map";
import "./bind";
import "./func";
import "./on";
import "./array";
import "./update";

const getProviders = () => {
  const stored = getFeature("transform");
  return getMapDefault(stored, "providers", []);
};

function processTransform(field, key, collection) {
  if (!field || (typeof field !== "object" && !Array.isArray(field))) {
    return;
  }

  const trans = getProviders().find(item =>
    item.getter.call(this, key, collection)
  );

  let result;

  if (trans) {
    result = trans.deal.call(this, key, collection);
  }

  if (result !== false) {
    forEach(
      trans && trans.convert ? collection[key] : field,
      processTransform.bind(this)
    );
  }
}

export default function(obj, clone = true) {
  const ref = clone ? cloneDeep(obj) : obj;
  forEach(ref, processTransform.bind(this));
  return ref;
}
