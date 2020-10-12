// 除法
import multiply from './multiply'

export default (value1 = 0, value2 = 1, rnd = -1) => {
  let t1 = 0,
    t2 = 0

  try {
    t1 = value1.toString().split('.')[1].length
  } catch {
    //
  }
  try {
    t2 = value2.toString().split('.')[1].length
  } catch {
    //
  }
  const r1 = Number(value1.toString().replace('.', ''))
  const r2 = Number(value2.toString().replace('.', ''))
  return +multiply(r1 / r2, Math.pow(10, t2 - t1), rnd)
}
