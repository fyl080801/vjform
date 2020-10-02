export const register = store => {
  return (type, factory) => {
    const ds = {
      name: type,
      description: '',
      factory
    }

    store.set(type, ds)

    const assembly = {
      withName: str => {
        ds.name = str
        return assembly
      },
      withDescription: str => {
        ds.description = str
        return assembly
      }
    }

    return assembly
  }
}

export const merge = (store, sourceStore) => {
  sourceStore.forEach((value, key) => {
    store.set(key, value)
  })
}

export const resolve = store => {
  const stored = {}

  store.forEach((value, key) => {
    stored[key] = {
      ...value,
      name: key,
      description: value.description || key
    }
  })

  return stored
}
