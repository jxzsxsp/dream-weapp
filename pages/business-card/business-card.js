import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'
import constant from '../../constant/index'

const props = {
}

const data = {
  showShop: true,
  shopId: 0,
  userId: 0,
  shopInfo: {},
  userInfo: {},
  isFollow: false,
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query)

    const scene = decodeURIComponent(query.scene)
    const scenes = scene.split(',')
    
    let type = parseInt(scenes[0])
    let shopId = parseInt(scenes[1])
    let userId = parseInt(scenes[2])
    
    this.setData({
      type: type,
      shopId: shopId,
      userId: userId,
    })

    if (constant.QrCodeType.SHOP === type || constant.QrCodeType.TO_SHOP === type) {
      $wx.setNavigationBarTitle({
        title: '店铺名片',
      })
      this.setData({
        showShop: true,
      })
    }

    if (constant.QrCodeType.PERSONAL_BUSINESS_CARD === type) {
      $wx.setNavigationBarTitle({
        title: '个人名片',
      })
      this.setData({
        showShop: false,
      })
    }

  },
  onShow: function () {

    $wx.app.getAppUserInfo().then(res => {
      if ($wx.app.globalData.appUserInfo.isAuthorizationPermit === 0) {
        let _this = this

        wx.showModal({
          title: '蜥奇申请',
          content: '与店铺运营方共享您的昵称、头像、手机号码',
          showCancel: true,
          confirmText: '允许',
          confirmColor: '#0ea2ef',
          cancelText: '拒绝',
          success: function (e) {
            if (e.confirm) {
              _this.sharingAuthorization()

              _this.show()
            }

            if (e.cancel) {
              wx.showModal({
                title: '提示',
                content: '拒绝授权将不能正常浏览，确认拒绝为您返回首页',
                showCancel: true,
                confirmText: '允许',
                confirmColor: '#0ea2ef',
                cancelText: '拒绝',
                success: function (e) {
                  if (e.confirm) {
                    _this.sharingAuthorization()

                    _this.show()
                  }

                  if (e.cancel) {
                    $wx.switchTab($wx.router.mainPage)
                  }
                }
              })
            }
          }
        })
      } else {
        this.show()
      }
    })

  }
}

const privateMethods = {
  bindCustomer: function () {
    let source = 0
    let type = this.data.type

    if (constant.QrCodeType.SHOP === type) {
      source = constant.BindCustomerSource.SHOP
    } else if (constant.QrCodeType.TO_SHOP === type) {
      source = constant.BindCustomerSource.TO_SHOP
    } else if (constant.QrCodeType.PERSONAL_BUSINESS_CARD === type) {
      source = constant.BindCustomerSource.PERSONAL_BUSINESS_CARD
    }

    return http.post(urls.bindCustomer, {
      // mock: true,
      shopId: this.data.shopId,
      source: source,
      empId: this.data.userId,
    })
  },
  getShopDetail: function (shopId) {
    return http.get(urls.shopDetail, {
      // mock: true,
      shopId: shopId
    })
  },
  getPersonDetail: function (shopId, userId) {
    return http.get(urls.personDetail, {
      // mock: true,
      shopId: shopId,
      userId: userId,
    })
  },
  sharingAuthorization: function () {
    return http.postLogin(urls.login.sharingAuthorization, {}).then(res => {
      $wx.app.getAppUserInfo()
    })
  },
  show: function() {

    this.bindCustomer().then((res) => {
      let type = this.data.type
      let shopId = this.data.shopId
      let userId = this.data.userId

      if (constant.QrCodeType.SHOP === type || constant.QrCodeType.TO_SHOP === type) {
        this.getShopDetail(shopId).then((res) => {
          this.setData({
            shopInfo: res,
            isFollow: res.isFollow === 1,
          })
        })
      }

      if (constant.QrCodeType.PERSONAL_BUSINESS_CARD === type) {
        this.getPersonDetail(shopId, userId).then((res) => {
          this.setData({
            userInfo: res,
            isFollow: res.shopDetail.isFollow === 1,
          })
        })
      }
    })

  }
}

const viewAction = {
  followShop: function () {
    http.get(urls.followSupplier, {
      // mock: true,
      shopId: this.data.shopId,
      source: constant.BindCustomerSource.WEAPP_VIEW,
    }).then((res) => {
      this.setData({
        isFollow: true,
      })
    })
  },
  gotoShopHome: function () {
    $wx.navigateTo($wx.router.shop, {
      shopId: this.data.shopId
    })
  },
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)