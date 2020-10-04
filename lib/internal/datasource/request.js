import { get, cloneDeep, isEmpty } from 'lodash-es'
import { loadSourceData } from '../../api/vjform'

export default resolveOptions => {
  const {
    autoload,
    dev, // 开发模式
    dataPath, // 数据路径
    defaultData, // 默认数据
    errorData // 异常数据
  } = resolveOptions()

  const instance = {
    loading: false,
    data: null
  }

  const reset = () => {
    instance.data = cloneDeep(defaultData)
  }

  const clear = () => {
    instance.data = null
  }

  const load = async () => {
    if (dev) {
      return
    }

    const options = resolveOptions()

    instance.loading = true

    try {
      const res = await loadSourceData(options)
      instance.loading = false
      instance.data =
        (!isEmpty(dataPath) ? get(res, dataPath) : res) || defaultData
    } catch (e) {
      instance.loading = false
      if (errorData !== undefined) {
        instance.data = errorData
      }
    }
  }

  instance.data = defaultData ? cloneDeep(defaultData) : null

  if (autoload) {
    load()
  }

  instance.load = load
  instance.clear = clear
  instance.reset = reset

  return instance
}
