import feature from "../../feature";

feature
  .provider(function() {
    return function(field) {
      field.fieldOptions = field.fieldOptions || {};

      const { fieldOptions } = field;

      fieldOptions.attrs = fieldOptions.attrs || {};
      fieldOptions.props = fieldOptions.props || {};
      fieldOptions.domProps = fieldOptions.domProps || {};
    };
  })
  .withIndex(-1024);
