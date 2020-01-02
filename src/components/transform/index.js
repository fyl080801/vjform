import store from "./store";
import { cloneDeep, forEach } from "lodash-es";
import "./providers/bind";
import "./providers/func";
import "./providers/array";

function processTransform(field, key, collection) {
  if (!field || (typeof field !== "object" && !Array.isArray(field))) {
    return;
  }

  store
    .filter(item => item.getter.call(this, key, collection))
    .forEach(trans => {
      trans.deal.call(this, key, collection);
    });

  forEach(field, processTransform.bind(this));
}

export default function(fields) {
  const cloned = cloneDeep(fields);
  forEach(cloned, processTransform.bind(this));
  return cloned;
}
