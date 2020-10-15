import { resolveGetter, resolveDeal } from '../../utils/transform'

export const getFunctionResult = (value, options) => {
  const { $arguments = {}, $result, $default, $debug = false } = value
  const { context } = options
  const args = []

  if (typeof $result !== 'string') {
    return $result || $default
  }

  Object.keys($arguments).forEach(key => {
    args.push({ key, value: $arguments[key] })
  })

  const funcArgs = args
    .sort((a, b) => a.key.charCodeAt() - b.key.charCodeAt())
    .concat(context.functional.map(fx => ({ key: fx.name, value: fx.fx })))
  // 加上函数引用

  try {
    const result = new Function(
      ...funcArgs.map(a => a.key).concat(['return ' + $result])
    )(...funcArgs.map(a => a.value))

    if ($debug) {
      // eslint-disable-next-line
      console.log(result)
    }

    return result !== undefined ? result : $default
  } catch (e) {
    if ($debug) {
      // eslint-disable-next-line
      console.log(e)
    }

    return $default
  }
}

export default (prop, owner) => {
  return resolveGetter('func')(prop, owner)
    ? resolveDeal((value, options) => getFunctionResult(value, options))
    : null
}

// export const getter = resolveGetter('func')

// feature.transform(
//   resolveGetter('func'),
//   resolveSetter((context, option) => getFunctionResult.call(context, option))
// )
