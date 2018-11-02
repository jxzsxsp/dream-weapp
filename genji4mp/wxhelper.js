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
      if (params.hasOwnProperty(key)) {
        const element = params[key];
        paramUrl+=`${key}=${element}`
      }
    }
    wx.navigateTo({
      url: baseUrl + paramUrl
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