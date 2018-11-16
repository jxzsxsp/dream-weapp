function _justifyColorItem (item) {
  const rgbArr = item.rgb.split(',')
  if (rgbArr.length !== 3) {
    console.error('每一项必须含有以逗号分隔的rgb值')
    return
  }
  let isDeep = ((rgbArr[0]*0.299 + rgbArr[1]*0.578 + rgbArr[2]*0.114) >= 190) ? false : true
  console.log(isDeep)
  item.textColor = isDeep ? '#ffffff' : '#252525'
}

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

