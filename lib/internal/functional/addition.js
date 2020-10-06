import multiply from './multiply'
import division from './division'

export default (...args) => {
  const ms = []
  const values = []

  for (let i = 0; i < args.length; i++) {
    let value
    try {
      value = args[i].toString().split('.')[1].length
    } catch {
      value = 0
    }
    ms.push(value)
    values.push(args[i] || 0)
  }

  const m = Math.pow(10, Math.max.apply(null, ms))

  return division(
    values.reduce((pre, cur) => {
      return pre + multiply(cur, m)
    }, 0),
    m
  )
}
