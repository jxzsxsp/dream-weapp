import env, {isOnline} from './env'
import mock from './mock'
import {$wx} from '../genji4mp/index'
import constant from '../constant/index'
import urls from './urls/index'

class Http {
  constructor () {
    this.isLoadingText = '数据加载中...'
    // 为非主域名动态添加 Get Set 方法
    for (const baseUrlName in env) {
      if (env.hasOwnProperty(baseUrlName) && baseUrlName !== 'url') {
        const baseUrl = env[baseUrlName]
        this['get' + baseUrlName] = (url, data, isLoading) => this._request(baseUrl + url, data, 'GET', isLoading, url)
        this['post' + baseUrlName] = (url, data, isLoading) => this._request(baseUrl + url, data, 'POST', isLoading, url)
        this['get' + baseUrlName + 'List'] = (url, loadingState, data, isLoading) => this._getOtherList(baseUrlName, url, loadingState, data, isLoading)
      }
    }
  }

  //  静默登录
  quietLogin () {
    let code = ''
    return $wx.login().then(res => {
      code = res.code
      return $wx.getUserInfo({withCredentials: true})
    }).then(res => {
      let data = {code, appId: constant.appId, domainName: constant.domainName, rawData: res.rawData, signature: res.signature, encryptedData: res.encryptedData, iv: res.iv}

      return this.getLogin(urls.login.quietLogin, data, true)
    }).then(res => {
      if (res.token) {
        wx.setStorageSync('token', res.token)
        getApp().globalData.token = res.token
      }
      return res
    })
  }

  /**
   * get 请求
   * @param {String} url 请求url
   * @param {Object} data 请求数据
   * @param {Bool | String} isLoading 是否显示加载框，或者显示加载框的文字
   */
  get (url, data, isLoading = true) {
    const wholeUrl = env.url + url
    return this._request(wholeUrl, data, 'GET', isLoading, url )
  }

  /**
   * 获取列表默认状态
   *
   * @param {number} [pageSize=20]
   * @returns 返回默认列表状态
   * @memberof Http
   */
  defaultLoadingState (pageSize = 25) {
    return {
      hasMore: true,
      param: {
        pageId: 1,
        pageSize,
      }
    }
  }

  /**
   * 获取列表
   * @param {String} url 请求的url
   * @param {Object} loadingState 通过 http.defaultLoadingState() 获取
   * @param {Obejct} data 请求的参数
   * @param {Bool} isLoading 是否显示加载框
   */
  getList (url, loadingState, data, isLoading) {
    // 没有更多了，直接返回
    if (!loadingState.hasMore) {
      return new Promise((resolve) => {
        resolve([])
      })
    }

    let realData = {}
    // 如果存在data，把上次的请求参数更新
    if (!!data) {
      loadingState.param = Object.assign({}, {pageId: loadingState.param.pageId, pageSize: loadingState.param.pageSize}, data)
    }
    realData = Object.assign(realData, loadingState.param)

    return this.get(url, realData, isLoading).then((res) => {
      loadingState.param.pageId += 1
      loadingState.hasMore = res.hasMore
      loadingState.totalCount = res.totalCount
      return res.list
    })

  }

  _getOtherList (baseUrlName, url, loadingState, data, isLoading) {
    if (!loadingState.hasMore) {
      return new Promise((resolve) => {
        resolve([])
      })
    }

    let realData = {}
    // 如果存在data，把上次的请求参数更新
    if (!!data) {
      loadingState.param = Object.assign({}, {pageId: loadingState.param.pageId, pageSize: loadingState.param.pageSize}, data)
    }
    realData = Object.assign(realData, loadingState.param)

    return this['get'+baseUrlName](url, realData, isLoading).then((res) => {
      loadingState.param.pageId += 1
      loadingState.hasMore = res.hasMore
      loadingState.totalCount = res.totalCount
      return res.list
    }) 
  }

  /**
   * post 请求
   * @param {String} url 请求url
   * @param {Object} data 请求数据
   * @param {Bool | String} isLoading 加载框是否显示加载框，或者显示加载框的文字
   */
  post (url, data, isLoading) {
    const wholeUrl = env.url + url
    return this._request(wholeUrl, data, 'POST', isLoading, url)
  }
  /**
   * 非链尚的get请求
   * @param {String} wholeUrl 完整的Url
   * @param {Object} data 请求数据
   * @param {Bool | String} isLoading 是否显示加载框，或者显示加载框的文字
   */
  otherGet (wholeUrl, data, isLoading) {
    return this._otherRequest(wholeUrl, data, 'GET', isLoading)
  }
  
  /**
   * 非链尚的post 请求
   * @param {String} wholeUrl 完整的Url
   * @param {Object} data 请求数据
   * @param {Bool | String} isLoading 是否显示加载框，或者显示加载框的文字
   */
  otherPost (wholeUrl, data, isLoading) {
    return this._otherRequest(wholeUrl, data, 'POST', isLoading)
  }

  _request (url, data={}, method, isLoading = true, mockUrl) {
    // 注入mock数据
    if (data && data.hasOwnProperty('mock')) {
      return new Promise((resolve) => {
        resolve(mock[mockUrl] || {})
      })
    }

    // 真实的网络请求
    if (isLoading) {
      wx.showLoading({
        title: (typeof isLoading === 'string') ? isLoading : this.isLoadingText,
        mask: true
      })
    }
    return new Promise((resolve, reject) => {
      // 没有 token 先取出token
      if (!getApp().globalData.token) {
        getApp().globalData.token = wx.getStorageSync('token')
      }
      wx.request({
        url: url,
        method: method,
        data: data,
        header: {
          'appType': 2,
          'content-type': 'application/json',
          'token': getApp().globalData.token
        },
        success (res) {
          if (isLoading) {
            wx.hideLoading()
          }

          if (res.data.code === 200) {
            let resData = {}
            if (res.data.data instanceof Array) {
              resData = {list: res.data.data, requestParam: data}
            } else {
              resData = {...res.data.data, requestParam: data}
            }

            // 非线上环境打印请求
            if (!isOnline) {
              console.log('----请求成功-------网络请求的 url 为-----'+ url)
              console.log(resData)
            }

            resolve(resData)
          } else if (res.data.code === 100) {
            // 没有token，重新登录
            this.quietLogin().then(res => {
              if (!!res.token) {
                // token 失效的情况
                wx.showToast({
                  title: '请求失败，请刷新重试',
                  icon: 'none',
                  mask: true
                })
              } else if (!!res.bindId) {
                // 没有绑定手机号的情况
                $wx.showModal({title: '绑定手机', content: '本功能需要绑定手机才能体验', cancelText: false}).then(res => {
                  $wx.navigateTo($wx.router.bindPhone, {bindId: res.bindId})
                })
              }
            })

          } else {
            // 非线上环境打印请求
            if (!isOnline) {
              console.log('----请求失败-------网络请求的 url 为-----:'+ url)
              console.log('----错误请求参数------:')
              console.log(data)
              console.log('----错误请求码-------:' + res.data.code)
              console.log('----错误请求信息------:' + res.data.message)
            }

            wx.showToast({
              title: res.data.message,
              icon: 'none',
              mask: true
            })
            reject(res.data || {})
          }
        },
        fail (error) {

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
  _otherRequest (url, data = {}, method, isLoading = true) {
    // 注入mock数据
    if (data && data.hasOwnProperty('mock')) {
      return new Promise((resolve) => {
        resolve(mock[url] || {})
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
          'token': getApp().globalData.token
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

  // 获取时间戳＋6位随机数
  // _randomNub () {
  //   var getTime = new Date().getTime()
  //   var random = Math.floor(Math.random() * 1000000)
  //   return getTime + '-' + random
  // }

  // 保存设备信息，为后端交互提供基础信息
  // saveSystemInfo () {
  //   if (!wx.getStorageSync('systemInfo')) {
  //     var systemInfo = wx.getSystemInfoSync()
  //     var param = {
  //       'platform': systemInfo.platform,
  //       'platformVersion': systemInfo.system,
  //       'deviceModel': systemInfo.model,
  //       'appType': 2,
  //       'appVersion': systemInfo.SDKVersion,
  //       'deviceId': systemInfo.brand + '-' + systemInfo.model + '-' + this.randomNub()
  //     }
  //     wx.setStorageSync('systemInfo', param)
  //   }
  // }
}

export default new Http()