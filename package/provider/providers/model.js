import { register } from "../register";
import { set, get } from "lodash-es";

const attrsValueElements = ["input", "option", "textarea"];
const domPropsValueElements = ["input", "textarea"];
const domPropsCheckedElements = ["checkbox", "radio"];
const innerHTMLElements = ["textarea"];
// const requiredElements = ["input", "select", "textarea"];

function defaultHandler(field) {
  const { component, fieldOptions } = field;

  if (
    domPropsValueElements.indexOf(component) >= 0 &&
    domPropsCheckedElements.indexOf(fieldOptions.domProps.type) >= 0
  ) {
    return value => value.target.checked;
  }

  if (domPropsValueElements.indexOf(component) >= 0) {
    return value => value.target.value;
  }

  return value => value;
}

function initFieldOptions(component, fieldOptions, currentValue) {
  if (domPropsValueElements.indexOf(component) >= 0) {
    set(fieldOptions.domProps, "value", currentValue);
  }

  if (domPropsCheckedElements.indexOf(fieldOptions.domProps.type) >= 0) {
    set(fieldOptions.domProps, "checked", currentValue);
  }

  if (innerHTMLElements.indexOf(component) >= 0) {
    set(fieldOptions.domProps, "innerHtml", currentValue);
  }

  if (attrsValueElements.indexOf(component) >= 0) {
    set(fieldOptions.attrs, "value", currentValue);
  }

  set(fieldOptions.props, "value", currentValue);
}

function provider(field) {
  const { component, fieldOptions } = field;
  const propertyName = field.model[0];
  const onDefine = field.model[1] || {};
  const { on = "input", handler = defaultHandler.call(this, field) } = onDefine;

  initFieldOptions(component, fieldOptions, get(this.model, propertyName));

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
