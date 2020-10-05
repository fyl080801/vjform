import { resolveGetter, resolveDeal } from '../../utils/transform'
import { createTransform } from 'json-to-object'

const getSourceValue = (value, options) => {
  const { $field, $default } = value
  const { context, providers } = options

  const tramsform = providers.reduce(
    (pre, cur) => pre.useProvider(cur),
    createTransform()
  )

  const transed = tramsform.useContext({ ...context }).transform({
    ...value,
    $field: null,
    $type: null
  })

  const isArrayData = Array.isArray(transed.$data || $default)

  return (isArrayData ? transed.$data || $default : []).map((scope, index) => {
    return tramsform.useContext({ ...context, scope, index }).transform($field)
  })
}

export const getter = resolveGetter('array')

export const deal = resolveDeal(
  (value, options) => getSourceValue(value, options),
  false
)