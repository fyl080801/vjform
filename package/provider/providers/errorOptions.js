import { register } from "../register";
import { isEmpty } from "lodash-es";

function provider(field) {
  const { model, $fieldOptions, fieldOptions, errorOptions } = field;
  const modelPath = Array.isArray(model)
    ? model[0]
    : typeof model === "string"
    ? model
    : "";

  field.$fieldOptions = field.$fieldOptions || fieldOptions;

  if (isEmpty(modelPath)) {
    return;
  }

  const error = (this.state.errors || []).find(
    item => item.dataPath === `.${modelPath}`
  );

  field.fieldOptions = error ? errorOptions : $fieldOptions;
}

register("errorOptions", function(field) {
  const { model, errorOptions } = field;

  if (model === undefined || errorOptions === undefined) {
    return null;
  }

  return provider;
});
