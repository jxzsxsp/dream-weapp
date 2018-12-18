/**
 * 判断传入的是否是一个对象
 *
 * @export
 * @param {Object} obj 待确认对象
 * @returns Bool
 */
export function isObject(obj) {
  return typeof (obj) === 'object'
}

/**
 * 判断是否是一个空对象
 *
 * @export
 * @param {Object} obj
 * @returns
 */
export function isEmptyObject(obj) {
  if (!isObject(obj)) {
    return false
  }
  return JSON.stringify(obj) === '{}'
}