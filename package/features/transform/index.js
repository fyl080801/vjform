import { cloneDeep, forEach } from "lodash-es";
import { getMapDeault } from "../../utils";
import { getFeature } from "../../feature/map";
import "./bind";
import "./func";
import "./on";
import "./array";

const getProviders = () => {
  const stored = getFeature("transform");
  return getMapDeault(stored, "providers", []);
};

function processTransform(field, key, collection) {
  if (!field || (typeof field !== "object" && !Array.isArray(field))) {
    return;
  }

  const trans = getProviders().find(item =>
    item.getter.call(this, key, collection)
  );

  if (trans) {
    trans.deal.call(this, key, collection);
  }

  forEach(
    trans && trans.convert ? collection[key] : field,
    processTransform.bind(this)
  );
}

export default function(fields, clone = true) {
  const ref = clone ? cloneDeep(fields) : fields;
  forEach(ref, processTransform.bind(this));
  return ref;
}
