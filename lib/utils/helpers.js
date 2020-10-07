import { v4 } from 'uuid'
import { isArray } from 'lodash-es'

export const attachKey = fields => {
  if (!fields || !isArray(fields)) {
    return
  }

  fields.forEach(field => {
    field.key = field.key || v4()
    attachKey(field.children)
  })
}

export const getMapDefault = (map, key, def) => {
  const value = map.get(key)
  if (value === undefined || value === null) {
    map.set(key, def)
    return map.get(key)
  } else {
    return value
  }
}

function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property)
}

function isNumberLike(value) {
  return String(value).match(/^\d+$/)
}

function toPath(pathString) {
  if (isArray(pathString)) {
    return pathString
  }
  if (typeof pathString === 'number') {
    return [pathString]
  }
  pathString = String(pathString)

  // lodash 的实现 - https://github.com/lodash/lodash
  const pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g
  const pathArray = []

  pathString.replace(pathRx, (match, number, quote, string) => {
    pathArray.push(
      quote ? string : number !== undefined ? Number(number) : match
    )
    return pathArray[pathArray.length - 1]
  })
  return pathArray
}

export function deepSet(obj, path, value) {
  const fields = isArray(path) ? path : toPath(path)
  const prop = fields.shift()

  if (!fields.length) {
    return this.$set(obj, prop, value)
  }

  if (!hasOwnProperty(obj, prop) || obj[prop] === null) {
    // 当前下标是数字则认定是数组
    const objVal = fields.length >= 1 && isNumberLike(fields[0]) ? [] : {}
    this.$set(obj, prop, objVal)
  }

  deepSet(obj[prop], fields, value)
}
