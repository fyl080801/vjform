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

  return providers.sort((a, b) => a.index - b.index)
}
