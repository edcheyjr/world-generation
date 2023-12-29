export { getItem, setItem }
/**
 * gets item from local storage
 *
 * @param {string} key
 * @param {"string" | "number" | "object"} type type of the data expected
 * @return {string  | number | object | null} data
 */
function getItem(key, type = 'string') {
  const stringItem = localStorage.getItem(key)
  let item = null
  if (stringItem) {
    try {
      if (type == 'string') {
        item = stringItem
      } else if (type == 'number') {
        item = parseInt(stringItem)
      } else if (type == 'object') {
        item = JSON.parse(stringItem)
      } else {
        throw new Error(
          'That type is current not support check docs to see supported types'
        )
      }
    } catch (error) {
      console.error(error.name, 'Error', error.message)
    }
  }
  return item
}
/**
 * set item to the localstorage
 * @param {string} key
 * @param {*} value
 */
function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}
