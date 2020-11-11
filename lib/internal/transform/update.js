import { resolveGetter, resolveDeal } from '../../utils/transform'
import { getFunctionResult } from './func'
import { cloneDeep } from 'lodash-es'
import { createTransform } from 'json-to-object'

export const getAssignFunction = (value, options) => {
  return (...args) => {
    const { $model } = value
    const { context, providers, emitter } = options
    const transformer = providers
      .reduce((pre, cur) => pre.useProvider(cur), createTransform())
      .useContext({ ...context, arguments: [...args] })
    const result = getFunctionResult(transformer.transform(value), options)
    const modelPath = transformer.transform({ value: $model })

    emitter.emit('update', {
      path: modelPath.value,
      value: typeof result === 'object' ? cloneDeep(result) : result
    })
  }
}

export default (prop, owner) => {
  return resolveGetter('update')(prop, owner)
    ? resolveDeal((value, options) => getAssignFunction(value, options), false)
    : null
}
