export default (...args) => {
  let str = ''
  for (let i = 0; i < args.length; i++) {
    str += `${args[i]}`
  }
  return str
}
