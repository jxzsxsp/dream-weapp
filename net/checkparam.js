function showToast (hint) {
  wx.showToast({
    title: hint,
    icon: 'none',
  }) 
}

/**
 * 检查参数是否存在
 * null,undefined,空字符串，-1 都表示不存在
 *
 * @export
 * @param {Object} param 参数对象
 * @param {Object} check 校验对象
 * check: {
 *   type: '', 校验类型
 *   hint: '', 提示语
 * }
 * @returns 是否校验成功
 */
export default function (param, check) {
  for (const key in param) {
    if (!check[key].type) {
      if ((!param[key] && param[key] !== 0) || param[key] === -1) {
        showToast(check[key].hint)
        return false
      }
    } else if (check[key].type === 'tel') {
      if ((!param[key] && param[key] !== 0) || param[key] === -1) {
        showToast(check[key].hint)
        return false
      }
      if (param[key].length !== 11) {
        showToast(check[key].hint)
        return false
      }
      if (!(/^1[3|4|5|6|7|8][0-9]\d{8}$/.test(param[key]))) {
        showToast(check[key].hint)
        return false
      }
    } else {
      console.error('zachary 抛出：表单校验 type 非已知类型')
      return false
    }
  }
  return true
}