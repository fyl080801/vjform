import { get } from 'lodash-es'

export default (source, path) => {
  return get(source, path)
}
