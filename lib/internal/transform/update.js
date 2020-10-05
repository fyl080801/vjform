import { resolveGetter, resolveDeal } from '../../utils/transform'
import { getFunctionResult } from './func'
import { cloneDeep } from 'lodash-es'
import { createTransform } from 'json-to-object'

export const getAssignFunction = (value, options) => {
  return (...args) => {
    const { $model } = value
    const { context, providers, emitter } = options

    const result = getFunctionResult(
      providers
        .reduce((pre, cur) => pre.useProvider(cur), createTransform())
        .useContext({ ...context, arguments: [...args] })
        .transform(value),
      options
    )
    emitter.emit('update', {
      path: $model,
      value: typeof result === 'object' ? cloneDeep(result) : result
    })
  }
}

export const getter = resolveGetter('update')

export const deal = resolveDeal(
  (value, options) => getAssignFunction(value, options),
  false
)