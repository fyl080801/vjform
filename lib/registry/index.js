import { getMapDefault } from '../utils/helpers'
import * as transform from './transform'
import * as functional from './functional'
import * as datasource from './datasource'
import * as provider from './provider'

const registries = {
  provider,
  datasource,
  transform,
  functional
}

const getFeature = (map, type) => {
  return getMapDefault(map, type, new Map())
}

const registerFactory = map => {
  return type =>
    (registries[type].register || new Function())(getFeature(map, type))
}

const mergeFactory = map => {
  return (type, stored) =>
    (registries[type].merge || new Function())(
      getFeature(map, type),
      getFeature(stored, type)
    )
}

const resolveFactory = map => {
  return type =>
    (registries[type].resolve || new Function())(getFeature(map, type))
}

export const createRegistry = stored => {
  const map = new Map()
  const register = registerFactory(map)

  if (stored) {
    const merge = mergeFactory(map)

    merge('transform', stored)
    merge('functional', stored)
    merge('datasource', stored)
    merge('provider', stored)
  }

  const resolve = resolveFactory(map)

  const instance = {
    map,
    use: builder => {
      typeof builder !== 'function' ||
        builder({
          transform: register('transform'),
          functional: register('functional'),
          datasource: register('datasource'),
          provider: register('provider')
        })
      return instance
    },
    build: () => {
      return {
        transform: resolve('transform'),
        functional: resolve('functional'),
        datasource: resolve('datasource'),
        provider: resolve('provider')
      }
    }
  }

  return instance
}
