import router from '../router'

for (const key in router) {
  if (router.hasOwnProperty(key)) {
    const element = router[key];
    router[key] = `/pages/${element}/${element}`
  }
}

let baseService = {
  router,
  navigateTo: function (baseUrl, params) {
    let paramUrl = '?'
    for (const key in params) {
      if (typeof key === 'object') {
        throw new Error('小程序跳转参数内部不能包含 object：' + key)
      }
      if (params.hasOwnProperty(key)) {
        const element = params[key];
        paramUrl+=`${key}=${element}&`
      }
    }
    paramUrl = paramUrl.substr(0, paramUrl.length-1)

    wx.navigateTo({
      url: baseUrl + (paramUrl === '?' ? '' : paramUrl)
    })
  }
}

export default new Proxy(baseService, {
  get: function (target, property) {
    if (property in target) {
      return target[property]
    } else if (property in wx) {
      return (param = {}) => {
        return new Promise((resolve, reject) => {
          param.success = (...args) => resolve(...args)
          param.fail = (...args) => reject(...args)
          wx[property](param)
        })
      }
    } else {
      throw new Error(property + '不存在')
    }
  }  
})