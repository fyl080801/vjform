export default (list, exp, def) => {
  const result = list.find(exp)
  return result !== undefined && result !== null ? result : def
}
