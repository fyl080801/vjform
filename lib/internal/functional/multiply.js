export default (value1 = 0, value2 = 0, rnd = -1) => {
  let m = 0
  const s1 = value1.toString()
  const s2 = value2.toString()
  try {
    m += s1.split('.')[1].length
  } catch {
    //
  }
  try {
    m += s2.split('.')[1].length
  } catch {
    //
  }
  const result =
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)

  return rnd <= 0 ? result : +result.toFixed(rnd)
}
