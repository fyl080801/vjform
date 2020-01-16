import { register } from "../register";
import { get, isEmpty } from "lodash-es";
import Ajv from "ajv";

function provider(field) {
  if (!field.displayOptions) {
    return;
  }

  const { schema, model } = field.displayOptions;

  if (!schema || !model) {
    return;
  }

  if (isEmpty(field.displayComponent) && !isEmpty(field.component)) {
    field.displayComponent = field.component;
  }

  field.component = new Ajv().validate(schema, get(this.value, model))
    ? field.displayComponent
    : null;
}

register("displayOptions", function() {
  return provider;
});
