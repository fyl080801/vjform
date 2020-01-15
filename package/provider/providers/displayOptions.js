import { register } from "../register";
import { get } from "lodash-es";
import Ajv from "ajv";

function provider(field) {
  const { displayOptions = {}, fieldOptions } = field;
  const { schema, model } = displayOptions;

  if (!schema || !model) {
    return;
  }

  fieldOptions.directives = fieldOptions.directives
    ? fieldOptions.directives
    : [];

  // const result = new Ajv().validate(schema, get(this.value, model));
  // const index = fieldOptions.directives.findIndex(item => item.name === "show");

  // if (index >= 0) {
  //   fieldOptions.directives.splice(index, 1);
  // }

  // const dir = { name: "show", rawName: "v-show" };
  // Object.defineProperty(dir, "value", {
  //   get: () => result
  // });
  // fieldOptions.directives.push(dir);

  field.displayComponent = field.component
    ? field.component
    : field.displayComponent;

  field.component = new Ajv().validate(schema, get(this.value, model))
    ? field.displayComponent
    : false;

  console.log(field.displayComponent, field.component);
  // this.$watch(
  //   () => get(this.value, model),
  //   value => {
  //     field.component = new Ajv().validate(schema, value)
  //       ? field.displayComponent
  //       : null;
  //   }
  // );
}

register("displayOptions", function() {
  return provider;
});
