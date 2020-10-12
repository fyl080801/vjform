export const createInstance = (datasource, transform) => {
  return options => {
    const { type } = options

    return datasource[type || 'object'].factory(() =>
      transform.transform(options)
    )
  }
}
