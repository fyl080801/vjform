import feature from "../../feature";
import { isEmpty, merge } from "lodash-es";

function provider(field) {
  const { model, fieldOptions, errorOptions } = field;

  const $fieldOptions = fieldOptions;

  const modelPath = Array.isArray(model)
    ? model[0]
    : typeof model === "string"
    ? model
    : "";

  if (isEmpty(modelPath)) {
    return;
  }

  const error = (this.state.errors || []).find(
    item => item.dataPath === `.${modelPath}`
  );

  field.fieldOptions = error
    ? merge({}, $fieldOptions, errorOptions)
    : $fieldOptions;
}

feature("provider")("errorOptions", function(field) {
  const { model, errorOptions } = field;

  if (model === undefined || errorOptions === undefined) {
    return null;
  }

  return provider;
});
