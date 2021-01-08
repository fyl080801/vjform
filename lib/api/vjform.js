import qs from 'qs'

export const loadSourceData = async ({
  url,
  method,
  params,
  data,
  headers,
  dataType = 'json'
}) => {
  const urlArray = url.split('?')
  const query = Object.assign(
    urlArray.length > 1
      ? qs.parse(urlArray[1], { ignoreQueryPrefix: true })
      : {},
    params || {}
  )
  const response = await fetch(
    `${urlArray[0]}${
      Object.keys(query).length > 0
        ? qs.stringify(query, { addQueryPrefix: true })
        : ''
    }`,
    {
      method,
      body: dataType === 'json' ? JSON.stringify(data) : data,
      headers
    }
  )

  return await response[dataType]()
}
