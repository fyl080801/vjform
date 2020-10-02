import { resolveGetter, resolveDeal } from '../../utils/transform'
import { getFunctionResult } from './func'
import { createTransform } from 'json-to-object'

export const getOnFunction = (value, options) => {
  return (...args) => {
    const { context, providers, ref } = options

    return getFunctionResult(
      providers
        .reduce((pre, cur) => pre.useProvider(cur), createTransform())
        .useRef(ref)
        .useContext({ ...context, arguments: [...args] })
        .transform(value),
      options
    )
  }
}

export const getter = resolveGetter('on')

export const deal = resolveDeal(
  (value, options) => getOnFunction(value, options),
  false
)
