import _ from 'underscore'

export function cleanUpSearchParams(obj) {
  return _.chain(obj)
    .mapObject(val => {
      if (typeof val === 'string') {
        return val.trim()
      }
      return val
    })
    .omit(val => {
      return val === '' || val === null || typeof val === 'undefined'
    })
    .value()
}
