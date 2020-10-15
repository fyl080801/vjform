import { resolveGetter, resolveDeal } from '../../utils/transform'
import { createTransform } from 'json-to-object'
import { isArray } from 'lodash-es'

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

  const isArrayData = isArray(transed.$data || $default)

  return (isArrayData ? transed.$data || $default : []).map((scope, index) => {
    return tramsform.useContext({ ...context, scope, index }).transform($field)
  })
}

export default (prop, owner) => {
  return resolveGetter('array')(prop, owner)
    ? resolveDeal((value, options) => getSourceValue(value, options), false)
    : null
}
