import { register } from "../register";
import { get, isEmpty } from "lodash-es";

function provider(field) {
  const { displayOptions } = field;
  const { schema, model } = displayOptions;

  if (isEmpty(displayOptions.$component) && !isEmpty(field.component)) {
    displayOptions.$component = field.component;
  }

  field.component = this.ajv.validate(schema, get(this.model, model))
    ? displayOptions.$component
    : null;
}

register("displayOptions", function(field) {
  const { displayOptions } = field;

  if (displayOptions === undefined) {
    return null;
  }

  const { schema, model } = displayOptions;

  if (!schema || !model) {
    return null;
  }

  return provider;
});
