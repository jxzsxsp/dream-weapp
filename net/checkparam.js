/**
 * 检查参数是否存在
 *
 * @export
 * @param {Object} param 参数对象
 * @param {Object} hint 提示对象
 * @returns
 */
export default function (param, hint) {
  for (const key in param) {
    if (!!hint[key]) {
      if (!param[key]) {
        wx.showToast({
          title: '请输入' + hint[key],
          icon: 'none',
        })
        return false
      }
    }
  }
  return true
}