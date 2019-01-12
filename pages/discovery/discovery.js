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
    dataList: {},
    LowerUserSaleTotal: "",
    ExpandMemberAll: "",
    isLoadEnd: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    options.ReferralUserId && app.setRefferUserId(options.ReferralUserId);
    var tm = this;
    app.getUserInfo(function(t) {
      tm.setData({
        userInfo: t
      })
    });
    app.getOpenId(function(t) {
      wx.request({
        url: app.getUrl("GetReferralInfo"),
        data: {
          openId: t
        },
        success: function(t) {
          console.log(t.data)
          app.globalData.ReferralInfo = t.data.referral_get_response, tm.GetCheckData();
        }
      });
    });
    tm.getVipInfo();
    tm.onShowProduct();
    tm.getVipData();
  },

  GetCheckData: function() {
    console.log()
    console.log(1)
    this.setData({
      DistributionInfo: app.globalData.ReferralInfo,
      isLoadEnd: true
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var tm = this;
    tm.setData({
      isForever: true
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    var i = '/pages/discovery/discovery?from=menu';
    app.globalData.userInfo && app.globalData.userInfo.IsReferral && (i += "&ReferralUserId=" + app.globalData.userInfo.UserId)
    // console.log(i);


    var shareInfo = {
      title: '加入亚太奥莱VIP，能省会赚，最高返40%！',
      path: i,
      imageUrl: "http://cos.qkmai.com/qkmbb/ytal/yqfx.png"
    };

    app.globalData.fundebug.notifyError(new Error("VIP专区"), {
      name: "邀请好友",
      metaData: shareInfo
    });

    return shareInfo;
  },
  changeTitle: function(e) {
    var tm = this;
    if (e.currentTarget.dataset.flag === tm.data.isForever) return;
    tm.setData({
      isForever: !tm.data.isForever
    })
  },
  toTrial: function() {
    var tm = this;
    wx.request({
      url: app.getUrl("YTALSignupDistribution"),
      data: {
        openId: app.globalData.userInfo.OpenId,
      },
      success: function(res) {
        app.getOpenId(function() {
          wx.request({
            url: app.getUrl("GetReferralInfo"),
            data: {
              openId: tm.data.userInfo.OpenId
            },
            success: function(t) {
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
  changeList: function(e) {
    var tm = this;
    if (e.currentTarget.dataset.flag === tm.data.isDefault) return;
    tm.setData({
      isDefault: !tm.data.isDefault
    })
  },
  getVipInfo: function() {
    var tm = this;
    wx.request({
      url: app.getUrl("YTALGetInfoDistribution"),
      data: {
        openId: app.globalData.userInfo.OpenId,
      },
      success: function(res) {
        //console.log(res);
        tm.setData({
          vipInfo: res.data
        })
        console.log(tm.data.vipInfo)
      }
    })

  },
  onShowProduct: function() {

    console.log('onShowProduct')
    var tm = this;
    wx.request({
      url: app.getUrl("GetProducts"),
      data: {
        // openId: r,
        // keyword: tm.data.KeyWord,
        // cId: tm.data.CategoryId,
        // pageIndex:a.data.PageIndex,
        // pageSize:a.data.PageSize,
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
      success: function(t) {

        tm.setData({
          dataList: t.data.Data
        })
        //console.log(t.data.Data)
        //console.log(tm.data.dataList)
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
      complete: function() {
        wx.hideNavigationBarLoading();
      }
    })

  },
  gobrandRush: function() {
    wx.switchTab({
      url: '/pages/brandRush/brandRush',
    })
  },
  goHome: function() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },
  getVipData: function() {
    //var tm = this;
    var t = this;
    app.getOpenId(function(o) {
      wx.request({
        url: app.getUrl("SubMembers"),
        data: {
          openId: t.data.userInfo.OpenId,
          // openId: 'o_rWK5YTqOJ2ruCGdsjZn4YJ8ovI',
          pageIndex: t.data.PageIndex,
          pageSize: t.data.PageSize
        },
        success: function(a) {
          console.log(a)
          t.setData({
            ExpandMemberAll: a.data.SubMember_get_response.ExpandMemberAll,
            LowerUserSaleTotal: a.data.SubMember_get_response.LowerUserSaleTotal
          });

        }
      });
    });
    // app.getOpenId(function (r) {
    //     wx.request({
    //         url: app.getUrl("LoginByOpenId"),
    //         data: {
    //             openId: t.data.userInfo.OpenId,
    //             //status: e,

    //         },
    //         success: function (a) {
    //             console.log(a)
    //             console.log(a.data)
    //             console.log(a.data.Data)
    //             console.log(a.data.Data.WaitSendActive)
    //             t.setData({
    //                 WaitSendActive: a.data.Data.WaitSendActive,
    //                 WaitReceiveActive: a.data.Data.WaitReceiveActive
    //             });
    //             console.log(a.data.Data.WaitSendActive )
    //             console.log(a.data.Data.WaitReceiveActive)
    //         },
    //         complete: function () {
    //             wx.hideLoading();
    //         }
    //     });
    // })
  }
})