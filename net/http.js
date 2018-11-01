// import login from './urls/login'
import env from './env'
import mock from './mock'

export default class Http {
  constructor () {
    this.isLoadingText = '数据加载中...'
    // 为非主域名动态添加 Get Set 方法
    for (const baseUrlName in env) {
      if (env.hasOwnProperty(baseUrlName) && baseUrlName !== 'url') {
        const baseUrl = env[baseUrlName]
        this[baseUrlName + 'Get'] = (url, data, isLoading = true) => this._request(baseUrl + url, data, 'GET', isLoading, url)
        this[baseUrlName + 'Post'] = (url, data, isLoading = true) => this._request(baseUrl + url, data, 'POST', isLoading, url)
      }
    }
  }

  /**
   * get 请求k
   * @param {String} url 请求url
   * @param {Object} data 请求数据
   * @param {Bool | String} isLoading 是否显示加载框，或者显示加载框的文字
   */
  get (url, data, isLoading = true) {
    wholeUrl = env.url + url
    return this._request(wholeUrl, data, 'GET', isLoading, url )
  }

  /**
   * post 请求
   * @param {String} url 请求url
   * @param {Object} data 请求数据
   * @param {Bool | String} isLoading 加载框是否显示加载框，或者显示加载框的文字
   */
  post (url, data, isLoading = true) {
    wholeUrl = env.url + url
    return this._request(wholeUrl, data, 'POST', isLoading, url)
  }
  /**
   * 非链尚的get请求
   * @param {String} wholeUrl 完整的Url
   * @param {Object} data 请求数据
   * @param {Bool | String} isLoading 是否显示加载框，或者显示加载框的文字
   */
  otherGet (wholeUrl, data, isLoading = true) {
    return this.otherRequest(wholeUrl, data, 'GET', isLoading)
  }
  
  /**
   * 非链尚的post 请求
   * @param {String} wholeUrl 完整的Url
   * @param {Object} data 请求数据
   * @param {Bool | String} isLoading 是否显示加载框，或者显示加载框的文字
   */
  otherPost (wholeUrl, data, isLoading = true) {
    return this.otherRequest(wholeUrl, data, 'POST', isLoading)
  }

  // 请求实体
  _request (url, data, method, isLoading, mockUrl) {
    // 注入mock数据
    if (data && data.hasOwnProperty('local')) {
      return new Promise((resolve) => {
        resolve(mock[mockUrl] || {})
      })
    }

    data = this._getQuestData(data)
    // 真实的网络请求
    if (isLoading) {
      wx.showLoading({
        title: (typeof isLoading === 'string') ? isLoading : this.isLoadingText,
        mask: true
      })
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: method,
        data: data,
        header: {
          'appType': 2,
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success (res) {
          if (isLoading) {
            wx.hideLoading()
          }
          if (res.data.code === 200) {
            resolve(Object.assign({}, res.data.data, { requestParam: data.data }))
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              mask: true
            })
            reject(res.data || {})
          }
        },
        fail (error) {
          // console.log('获取数据失败');
          wx.showToast({
            title: '网络出错！',
            icon: 'none',
            mask: true
          })
        },
        complete () {

        }
      })
    })
  }

  // otherRequest
  otherRequest (url, data, method, isLoading) {
    // 注入mock数据
    if (data && data.hasOwnProperty('local')) {
      return new Promise((resolve) => {
        resolve(mock[mockUrl] || {})
      })
    }

    if (isLoading) {
      wx.showLoading({
        title: (typeof isLoading === 'string') ? isLoading : this.isLoadingText,
        mask: true
      })
    }
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: method,
        data: data,
        header: {
          'appType': 2,
          'content-type': 'application/json',
          'token': wx.getStorageSync('token')
        },
        success (res) {
          if (isLoading) {
            wx.hideLoading()
          }
          resolve(res || {})
        },
        fail (error) {
          // console.log('获取数据失败');
          wx.showToast({
            title: '网络出错！',
            icon: 'none',
            mask: true
          })
          reject(error || {})
        },
        complete () {

        }
      })
    })
  }

  // 封装和后端数据格式
  _getQuestData (data) {
    var param = wx.getStorageSync('systemInfo') || {}
    param.data = data
    return param
  }

  // 获取时间戳＋6位随机数
  _randomNub () {
    var getTime = new Date().getTime()
    var random = Math.floor(Math.random() * 1000000)
    return getTime + '-' + random
  }

  //  静默登录
  quietLogin (code) {
    var data = {}
    data = this._getQuestData(data)
    data.data.code = code
    var url = this.root + '/buyer/user/mini-app/quick-login/v1'
    this.otherPost(url, data, true).then(res => {
      if (res.data.code == 200) {
        wx.setStorageSync('token', res.data.data.token)
        var lsUserInfo = {
          avatar: res.data.data.headImgUrl,
          imNickName: res.data.data.nickName
        }
        wx.setStorageSync('lsUserInfo', lsUserInfo)
      }
    }, res => {
      console.log(res)
    })
  }

  // 保存设备信息，为后端交互提供基础信息
  saveSystemInfo () {
    if (!wx.getStorageSync('systemInfo')) {
      var systemInfo = wx.getSystemInfoSync()
      var param = {
        'platform': systemInfo.platform,
        'platformVersion': systemInfo.system,
        'deviceModel': systemInfo.model,
        'appType': 2,
        'appVersion': systemInfo.SDKVersion,
        'deviceId': systemInfo.brand + '-' + systemInfo.model + '-' + this.randomNub()
      }
      wx.setStorageSync('systemInfo', param)
    }
  }
}

