export default () => {
  return field => {
    field.fieldOptions = field.fieldOptions || {}

    const { fieldOptions } = field

    fieldOptions.attrs = fieldOptions.attrs || {}
    fieldOptions.props = fieldOptions.props || {}
    fieldOptions.domProps = fieldOptions.domProps || {}
  }
}
