export default () => {
  return field => {
    const { condition } = field

    const defined = Object.getOwnPropertyDescriptor(field, 'condition')

    if (defined === undefined) {
      return
    }

    field.component = condition ? field.component : null
  }
}
