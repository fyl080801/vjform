import { isArray } from 'lodash-es'

export const resolveGetter = key => {
  return (prop, owner) => {
    const option = owner[prop]
    return (
      typeof option === 'object' &&
      option &&
      !isArray(option) &&
      option.$type === key
    )
  }
}

export const resolveDeal = (deal, result) => {
  return (prop, owner, options) => {
    const value = owner[prop]

    Object.defineProperty(owner, prop, {
      get: () => deal(value, options)
    })

    return result
  }
}
