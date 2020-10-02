import { isEmpty } from 'lodash-es'

export default () => {
  return field => {
    const { condition, $conditionComponent = '' } = field

    const defined = Object.getOwnPropertyDescriptor(field, 'condition')

    if (defined === undefined) {
      return
    }

    if (isEmpty($conditionComponent) && !isEmpty(field.component)) {
      field.$conditionComponent = field.component
    }

    field.component = condition ? field.$conditionComponent : null
  }
}
