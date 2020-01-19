import store from "./store";
import { register } from "./register";
import { cloneDeep, forEach } from "lodash-es";
import "./providers/bind";
import "./providers/func";
import "./providers/on";
import "./providers/array";

function processTransform(field, key, collection) {
  if (!field || (typeof field !== "object" && !Array.isArray(field))) {
    return;
  }

  const trans = store.find(item => item.getter.call(this, key, collection));

  if (trans) {
    trans.deal.call(this, key, collection);
  }

  // if (field.convert) {
  //   console.log(field);
  // }

  forEach(
    trans && trans.convert ? collection[key] : field,
    processTransform.bind(this)
  );
}

export { register };

export default function(fields, clone = true) {
  if (clone) {
    const cloned = cloneDeep(fields);
    forEach(cloned, processTransform.bind(this));
    return cloned;
  } else {
    forEach(fields, processTransform.bind(this));
    return fields;
  }
}
