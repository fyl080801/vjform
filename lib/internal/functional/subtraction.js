import multiply from './multiply'
import division from './division'

export default (value1 = 0, value2 = 0) => {
  let r1, r2
  try {
    r1 = value1.toString().split('.')[1].length
  } catch {
    r1 = 0
  }
  try {
    r2 = value2.toString().split('.')[1].length
  } catch {
    r2 = 0
  }
  const m = Math.pow(10, Math.max(r1, r2))
  const n = r1 >= r2 ? r1 : r2
  return (+division(+multiply(value1, m) - +multiply(value2, m), m)).toFixed(n)
}
