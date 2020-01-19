import { register } from "../register";

function provider(field) {
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
}

register("text", function() {
  return provider;
});
