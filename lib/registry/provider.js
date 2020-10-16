import { getMapDefault } from '../utils/helpers'

export const register = store => {
  return factory => {
    const providers = getMapDefault(store, 'providers', [])

    const instance = {
      factory,
      index: 0
    }

    providers.push(instance)

    return {
      withIndex: index => {
        instance.index = index
      }
    }
  }
}

export const merge = (store, sourceStore) => {
  const providers = getMapDefault(store, 'providers', [])

  getMapDefault(sourceStore, 'providers', []).forEach(item => {
    providers.push(item)
  })
}

export const resolve = store => {
  const providers = []

  getMapDefault(store, 'providers', []).forEach(item => {
    providers.push(item)
  })

  const options = {}
  const sorted = providers.sort((a, b) => a.index - b.index)

  const instance = {
    useOptions: extend => {
      Object.assign(options, extend)
      return instance
    },
    execute: (field, context) => {
      sorted.forEach(({ factory }) => {
        ;(factory(field, options) || new Function())(field, context)
      })
    }
  }
  // return
  return instance
}
