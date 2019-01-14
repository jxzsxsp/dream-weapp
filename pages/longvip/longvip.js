var conf = require("../../utils/config.js"),
  app = getApp();
Page({
  data: {
    userInfo: {},
    chooseTitle: true,
    hasTrial: false,
    isDefault: true,
    DistributionInfo: "",
    isForever: true,
    vipInfo: {},
    CategoryId: 22,
    dataList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.ReferralUserId && app.setRefferUserId(options.ReferralUserId);
    var tm = this;
    app.getUserInfo(function (t) {
      tm.setData({
        userInfo: t
      })
    });
    app.getOpenId(function (t) {
      wx.request({
        url: app.getUrl("GetReferralInfo"),
        data: {
          openId: t
        },
        success: function (t) {
          app.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
        }
      });
    });
    tm.getVipInfo();
    tm.onShowProduct();
  },

  GetCheckData: function () {
    this.setData({
      DistributionInfo: app.globalData.ReferralInfo
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var i = '/pages/discovery/discovery?from=menu';
    app.globalData.userInfo && app.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + app.globalData.userInfo.UserId)
    // console.log(i);
    return {
      title: '加入亚太奥莱VIP，能省会赚，最高返40%！',
      path: i,
      imageUrl: "http://cos.qkmai.com/qkmbb/ytal/yqfx.png"
    }
  },
  changeTitle: function (e) {
    var tm = this;
    if (e.currentTarget.dataset.flag === tm.data.isForever) return;
    tm.setData({
      isForever: !tm.data.isForever
    })
  },
  toTrial: function () {
    var tm = this;
    wx.request({
      url: app.getUrl("YTALSignupDistribution"),
      data: {
        openId: tm.data.userInfo.OpenId
      },
      success: function (res) {
        app.getOpenId(function () {
          wx.request({
            url: app.getUrl("GetReferralInfo"),
            data: {
              openId: tm.data.userInfo.OpenId
            },
            success: function (t) {
              wx.showModal({
                title: '提示',
                content: '领取成功',
              })
              app.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
            }
          });
        });
      }
    });
  },
  changeList: function (e) {
    var tm = this;
    if (e.currentTarget.dataset.flag === tm.data.isDefault) return;
    tm.setData({
      isDefault: !tm.data.isDefault
    })
  },
  getVipInfo: function () {
    var tm = this;
    wx.request({
      url: app.getUrl("YTALGetInfoDistribution"),
      data: {
        openId: tm.data.userInfo.OpenId
      },
      success: function (res) {
        //console.log(res);
        tm.setData({
          vipInfo: res.data
        })
      }
    })
  },
  onShowProduct: function () {

    console.log('onShowProduct')
    var tm = this;
    wx.request({
      url: app.getUrl("GetProducts"),
      data: {
        // openId: r,
        // keyword: tm.data.KeyWord,
        // cId: tm.data.CategoryId,
        // pageIndex: a.data.PageIndex,
        // pageSize: a.data.PageSize,
        // sortBy: a.data.SortBy,
        // sortOrder: a.data.SortOrder
        // openId:"o_rWK5ULNm46IJqvZOEFWIj_xWVc",
        openId: tm.data.userInfo.OpenId,
        cId: 22
        // pageIndex:1,
        // pageSize:10,
        // keyword: "",
        // sortBy: "",
        // sortOrder:"asc"
      },
      success: function (t) {

        tm.setData({
          dataList: t.data.Data
        })
        console.log(t.data.Data)
        console.log(tm.data.dataList)
        // if ("OK" == t.data.Status) {
        //   var r = t.data.Data;
        //   if (e) {
        //     var u = a.data.ProductList;
        //     u.push.apply(u, r), a.setData({
        //       ProductList: u
        //     });
        //   } else a.setData({
        //     ProductList: r
        //   });
        // } else "NOUser" == t.data.Message || wx.showModal({
        //   title: "提示",
        //   content: t.data.Message,
        //   showCancel: !1,
        //   success: function (t) {
        //     t.confirm && wx.navigateBack({
        //       delta: 1
        //     });
        //   }
        // });
      },
      complete: function () {
        wx.hideNavigationBarLoading();
      }
    })

  },
})