
function _justifyColorItem (item) {
  const rgbArr = item.rgb.split(',')
  if (rgbArr.length !== 3) {
    console.error('每一项必须含有以逗号分隔的rgb值')
    return
  }
  let isDeep = ((rgbArr[0]*0.299 + rgbArr[1]*0.578 + rgbArr[2]*0.114) >= 190) ? false : true
  item.textColor = isDeep ? '#ffffff' : '#252525'
}

/**
 * 判断颜色是深色还是浅色
 *
 * @param {Array | Object} colorList 颜色信息对象，对象中必须包含以逗号隔开的 rgb 字段
 */
export function justifyColor (colorList) {
  if (colorList instanceof Array) {
    colorList.forEach(item => {
      _justifyColorItem(item)
    });
  } else if (typeof(colorList) === 'object') {
    _justifyColorItem(colorList)
  } else {
    console.error('颜色格式错误')
  }
}

export function fixLab (lab) {
  const labArr = lab.split(',')
  const fixedArr = labArr.map(item => parseFloat(item).toFixed(2))
  return fixedArr.join(',')
}

