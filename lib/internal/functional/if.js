export default (logic, v1, v2) => {
  const result = (typeof logic === 'function' ? logic() : logic) ? v1 : v2
  return typeof result === 'function' ? result() : result
}
