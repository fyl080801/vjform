import { register } from "../register";
import { set, get } from "lodash-es";

// const attrsValueElements = ["input", "option", "textarea"];
const domPropsValueElements = ["input", "textarea"];
const domPropsCheckedElements = ["checkbox", "radio"];
// const innerHTMLElements = ["textarea"];
// const requiredElements = ["input", "select", "textarea"];

function provider(field) {
  const { component, fieldOptions } = field;
  const propertyName = field.model[0];
  const onDefine = field.model[1] || {};
  const {
    on = "input",
    handler = domPropsValueElements.indexOf(component) >= 0
      ? value => value.target.value
      : value => value
  } = onDefine;

  const currentVaule = get(this.model, propertyName);
  // 要判断一下哪些是html原生的组件
  set(
    domPropsValueElements.indexOf(component) >= 0
      ? fieldOptions.domProps
      : fieldOptions.props,
    domPropsCheckedElements.indexOf(component) >= 0 ? "checked" : "value",
    domPropsCheckedElements.indexOf(component) >= 0
      ? currentVaule
        ? "checked"
        : ""
      : currentVaule
  );

  if (typeof get(fieldOptions.on, on) !== "function") {
    Object.assign(fieldOptions.on, {
      [on]: value => {
        set(this.model, propertyName, handler(value));
      }
    });
  }
}

register("model", function(field) {
  const { model } = field;

  return model &&
    Array.isArray(model) &&
    model.length >= 1 &&
    typeof model[0] === "string"
    ? provider
    : null;
});
