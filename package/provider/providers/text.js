import { registerProvider } from "../register";

registerProvider("text", function(field) {
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
});
