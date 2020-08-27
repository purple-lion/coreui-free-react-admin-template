import camelCase from 'camelcase'

export const parsePaginationHeaders = headers => {
  const pagination = {}
  Object.keys(headers).forEach(key => {
    if (key.indexOf('pagination-') === 0) {
      try {
        let name = camelCase(key.replace('pagination-', ''))
        pagination[name] = eval(headers[key].toLowerCase())
      } catch (e) {
        console.log(e)
      }
    }
  })

  return pagination
}
