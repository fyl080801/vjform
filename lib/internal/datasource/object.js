export default resolveOptions => {
  const options = resolveOptions()

  const instance = {
    data: options.data
  }

  return instance
}
