import { register } from "../register";

function provider(field) {
  field.fieldOptions = field.fieldOptions || {};

  const { fieldOptions } = field;

  fieldOptions.props = fieldOptions.props || {};
  fieldOptions.domProps = fieldOptions.domProps || {};
  fieldOptions.on = fieldOptions.on || {};
}

register("fieldOptions", function() {
  return provider;
});
