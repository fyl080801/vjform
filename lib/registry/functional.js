export const register = store => {
  return (name, fx) => {
    const instance = { fx, group: '', description: '' }

    store.set(name.toUpperCase(), instance)

    const assembly = {
      withDescription: description => {
        instance.description = description
        return assembly
      },
      withGroup: group => {
        instance.group = group
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
  const stored = []

  store.forEach((value, key) => {
    stored.push({
      ...value,
      name: key,
      description: value.description || key
    })
  })

  return stored
}
