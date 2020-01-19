import { register } from "../register";
import { get, isEmpty } from "lodash-es";

function provider(field) {
  const { displayOptions } = field;

  if (displayOptions === undefined) {
    return;
  }

  const { schema, model } = displayOptions;

  if (!schema || !model) {
    return;
  }

  if (isEmpty(displayOptions.$component) && !isEmpty(field.component)) {
    displayOptions.$component = field.component;
  }

  field.component = this.ajv.validate(schema, get(this.value, model))
    ? displayOptions.$component
    : null;
}

register("displayOptions", function() {
  return provider;
});
