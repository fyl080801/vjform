import feature from "../../feature";
import { set, get, isEmpty } from "lodash-es";

const attrsValueElements = ["input", "option", "textarea"];
const domPropsValueElements = ["input", "textarea", "select"];
const domPropsCheckedElements = ["checkbox", "radio"];
const innerHTMLElements = ["textarea"];
// const requiredElements = ["input", "select", "textarea"];

function defaultHandler(field) {
  const { component, fieldOptions } = field;

  if (
    domPropsValueElements.indexOf(component) >= 0 &&
    domPropsCheckedElements.indexOf(fieldOptions.domProps.type) >= 0
  ) {
    return value => {
      return value.target.checked;
    };
  }

  if (domPropsValueElements.indexOf(component) >= 0) {
    return value => {
      return value.target.value;
    };
  }

  return value => {
    return value;
  };
}

function initFieldOptions(component, fieldOptions, currentValue) {
  const { domProps = {}, attrs = {}, props = {} } = fieldOptions;

  if (domPropsValueElements.indexOf(component) >= 0) {
    set(domProps, "value", currentValue);
  }

  if (domPropsCheckedElements.indexOf(domProps.type) >= 0) {
    set(domProps, "checked", currentValue);
  }

  if (innerHTMLElements.indexOf(component) >= 0) {
    set(domProps, "innerHtml", currentValue);
  }

  if (attrsValueElements.indexOf(component) >= 0) {
    set(attrs, "value", currentValue);
  }

  set(props, "value", currentValue);
}

function provider(field) {
  const { component, fieldOptions } = field;
  const modelDefine = Array.isArray(field.model) ? field.model : [field.model];
  const propertyName = modelDefine[0];
  const onDefine = modelDefine[1] || {};
  const {
    on = "input",
    nativeOn,
    handler = defaultHandler.call(this, field)
  } = onDefine;

  initFieldOptions.call(
    this,
    component,
    fieldOptions,
    get(this.model, propertyName)
  );

  const tirgger = isEmpty(nativeOn) ? "on" : "nativeOn";

  fieldOptions[tirgger] = fieldOptions[tirgger] || {};

  if (typeof get(fieldOptions[tirgger], nativeOn || on) !== "function") {
    Object.assign(fieldOptions[tirgger], {
      [nativeOn || on]: value => {
        this.$deepSet(this.model, propertyName, handler(value));
      }
    });
  }
}

feature("provider")("model", function(field) {
  const { model } = field;

  return (model &&
    Array.isArray(model) &&
    model.length >= 1 &&
    typeof model[0] === "string") ||
    typeof model === "string"
    ? provider
    : null;
});
