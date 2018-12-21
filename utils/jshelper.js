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

/**
 * 从源数组中删除一个数组
 *
 * @export
 * @param {Array} sourceArr 原数组
 * @param {Array} targetArr 被删除的数组
 * @param {String} id 当源数组中的id和被删除的数组中的值相等时删除
 * @returns
 */
export function removeArrayInArray(sourceArr, targetArr, id) {
  if (sourceArr instanceof Array && targetArr instanceof Array) {
    return sourceArr.filter(item => {
      return targetArr.reduce((prev, now) => {
        if (!!id) {
          return prev && (now !== item[id])
        } else {
          return prev && (now !== item)
        }
      }, true)
    })
  } else {
    console.error('zachary 抛出: 必须传入两个数组')
  }
}