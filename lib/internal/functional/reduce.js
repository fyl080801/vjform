export default (array, init, mapper) => {
  return array.reduce(mapper, init)
}
