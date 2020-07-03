import feature from "../../feature";

feature("provider")(function() {
  return function(field) {
    const { text } = field;

    if (text === undefined) {
      return;
    }

    field.fieldOptions.domProps = {
      ...field.fieldOptions.domProps,
      ...{
        innerText: text
      }
    };
  };
});
