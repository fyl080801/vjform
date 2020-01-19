import { registerProvider } from "../register";

registerProvider("fieldOptions", function(field) {
  field.fieldOptions = field.fieldOptions || {};

  const { fieldOptions } = field;

  fieldOptions.attrs = fieldOptions.attrs || {};
  fieldOptions.props = fieldOptions.props || {};
  fieldOptions.domProps = fieldOptions.domProps || {};
  fieldOptions.on = fieldOptions.on || {};
});
