// 如果是组件节点，并且定义了scopedSlot，则忽略下级的所有转换
export default (prop, owner) => {
  const value = owner[prop]
  if (
    value &&
    value.component &&
    value.fieldOptions &&
    value.fieldOptions.scopedSlot
  ) {
    return () => {
      return false
    }
  }

  return false
}
