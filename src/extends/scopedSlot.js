import { isArray } from 'lodash-es'

export const transform = (prop, owner) => {
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

export const provider = (field, options) => {
  const { node, registry } = options

  const provider = (field, context) => {
    const scopedChildren = []

    for (let i = field.children.length; i >= 0; i--) {
      if (
        field.children[i] &&
        (field.children[i].fieldOptions || {}).scopedSlot
      ) {
        const scopedItem = field.children.splice(i, 1)[0]
        scopedItem.fieldOptions.scopedSlot =
          scopedItem.fieldOptions.scopedSlot === true
            ? 'default'
            : scopedItem.fieldOptions.scopedSlot
        scopedChildren.push(scopedItem)
      }
    }

    field.fieldOptions = field.fieldOptions || {}
    field.fieldOptions.scopedSlots = field.fieldOptions.scopedSlots || {}

    // scopedSlot是唯一根节点, 如果scopedSlot名称重复则会覆盖之前的定义
    scopedChildren.forEach(item => {
      field.fieldOptions.scopedSlots[item.fieldOptions.scopedSlot] = scope => {
        const transedChild = registry.transform
          .useContext({ ...context, scope })
          .transform(item)

        if (transedChild.fieldOptions.on) {
          transedChild.fieldOptions.on = { ...transedChild.fieldOptions.on }
        }
        if (transedChild.fieldOptions.nativeOn) {
          transedChild.fieldOptions.nativeOn = {
            ...transedChild.fieldOptions.nativeOn
          }
        }

        // 这里的事件如果用原值会报错
        if (isArray(transedChild.children)) {
          transedChild.children = transedChild.children.map(child => {
            if (child.fieldOptions.on) {
              child.fieldOptions.on = { ...child.fieldOptions.on }
            }
            if (child.fieldOptions.nativeOn) {
              child.fieldOptions.nativeOn = { ...child.fieldOptions.nativeOn }
            }
            return child
          })
        }

        return node.renderNode(node.$createElement, transedChild)
      }
    })
  }

  return (field.children || []).find(
    child => child && (child.fieldOptions || {}).scopedSlot
  )
    ? provider
    : new Function()
}
