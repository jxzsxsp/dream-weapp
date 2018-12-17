// pages/screening/screening.js
var conf = require("../../utils/config.js"),
  app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brandRushInfo: [],
    rushGoodsList: [],
    brandLogo: '',
    mainTitle: '',
    subTitle: '',
    goodsId: '',
    goodsSkuId: '',
    goodsSkuName: '',
    brandSoruce: '',
    userInfo: {},
    brandId: "",
    brandSource: "",
    imgUrl: 'https://qkmai-1257905846.cos.ap-shanghai.myqcloud.com/qkmbb/myqsh/wdbjs.png',
    tagId: 0,
    dataIndex: 0,
    dataSize: 10,
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var tm = this;
    tm.setData({
      imgUrl: options.picUrl,
      tagId: options.tagId
    })
    app.getUserInfo(function(t) {
      tm.setData({
        userInfo: t,
      })
    });

    // 执行倒计时函数
    this.getListGoodsData();
    this.countDown();
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
    if (this.data.hasMore) {
      wx.showNavigationBarLoading();
      this.loadMore();
      wx.hideNavigationBarLoading();
    }
  },
  loadMore: function() {
    if (!this.data.hasMore) return;
    var tm = this;
    // console.log(tm.data.dataIndex);
    var currentUrl = app.getUrl("QSHGetPageRushGoodsByTagId");
    var currentData = {
      pi: ++this.data.dataIndex,
      ps: this.data.dataSize
    };
    // 加载页面数据
    wx.request({
      url: currentUrl,
      data: currentData,
      success: function(jd) {

        if (jd.data.length != 0) {
          let goodsList = [];
          jd.data.forEach(o => {
            goodsList.push(o)
          });
          var newList = tm.data.rushGoodsList.concat(goodsList)
          tm.setData({
            rushGoodsList: newList
          })

        } else {
          tm.setData({
            hasMore: false
          })
        }
      }
    });
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  linkProductDetail: function(event) {
    wx.navigateTo({
      url: "../productdetail/productdetail?id=" + event.currentTarget.dataset.productid
    });
  },
  countDown: function() { //倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    var rushInfo = this.data.brandRushInfo;
    rushInfo.forEach(o => {
      var rushEndTime = o.rushEndTime.replace('\-', '/').replace('\-', '/');
      let endTime = new Date(rushEndTime).getTime();
      //endTime = endTime + 8 * 60 * 60 * 1000;

      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);

        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else { //活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      o.countDownTime = obj;
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      brandRushInfo: rushInfo
    })
    setTimeout(this.countDown, 1000);
  },
  selectSkuId: function(event) {
    // if(event.currentTarget.dataset("count") == 0) return;
    var skuId = event.currentTarget.dataset["skuid"];
    var skuName = event.currentTarget.dataset["skuname"];
    var goodsId = event.currentTarget.dataset["goodsid"];
    var tm = this;
    tm.setData({
      goodsSkuId: skuId,
      goodsSkuName: skuName,
      goodsId: goodsId
    });
  },
  addGoodsToCart: function(event) {
    var tm = this;
    var goodsId = event.currentTarget.dataset["goodsid"];
    var salePrice = event.currentTarget.dataset["saleprice"];
    if (goodsId != tm.data.goodsId) {
      wx.showModal({
        title: '请选择商品规格',
        content: '',
      })
    } else {
      if (tm.data.skuId == "") {
        wx.showModal({
          title: '请选择商品规格',
          content: '',
        })
      } else {
        wx.request({
          url: app.getUrl("QSHPostAddGoodsToCart"),
          data: {
            skuId: tm.data.goodsSkuId,
            skuName: tm.data.goodsSkuName,
            goodsId: tm.data.goodsId,
            openId: app.globalData.openId,
            brandSource: tm.data.brandSource,
            salePrice: salePrice
          },
          success: function(res) {
            var jd = res.data;
            switch (jd.status) {
              default: wx.showModal({
                title: '提示',
                content: jd.message,
                showCancel: false
              })
              break;
              case 'success':
                  wx.showModal({
                  title: '',
                  content: '成功加入购物车',
                  cancelText: "再逛逛",
                  confirmText: "去结算",
                  success(res) {
                    if (res.confirm) {
                      wx.switchTab({
                        url: '/pages/shopcart/shopcart'
                      })
                    } else if (res.cancel) {

                    }
                  }
                })
                tm.setData({
                  goodsId: '',
                  goodsSkuId: '',
                  goodsSkuName: ''
                });
            }
          }
        })
      }
    }

  },
  previewImg: function(event) {
    var imgSrc = event.currentTarget.dataset['imgsrc'];
    var imgs = event.currentTarget.dataset['imgs'];

    wx.previewImage({
      current: imgSrc,
      urls: imgs
    })
  },
  filterNum: function(value, count) {
    var num = Number(value)
    return num.toFixed(count)
  },
  copy: function(e) {
    wx.setClipboardData({
      data: e.target.dataset.val,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },
  fixedGoToCart: function() {
    wx.switchTab({
      url: '/pages/shopcart/shopcart'
    })
  },
  fixedGoToHome: function() {
    wx.switchTab({
      url: '/pages/home/home'
    })
  },
  getTitle: function() {
    var tm = this;
    //获取品牌特卖列表        
    wx.request({

      url: app.getUrl("QSHGetInfoBrandRush"),
      data: {
        brandId: tm.data.brandId,
        brandSource: tm.data.brandSource
      },
      success: function(jd) {
        var infoList = [];
        let brandRush = jd.data;
        var obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
        brandRush.countDownTime = obj;
        if (brandRush.rushEndTime != null) {
          var month = brandRush.rushEndTime.split('-')[1];
          var day = brandRush.rushEndTime.split('-')[2].split(' ')[0];
          var hour = brandRush.rushEndTime.split(' ')[1].split(':')[0];
          var min = brandRush.rushEndTime.split(' ')[1].split(':')[1];

          brandRush.endTimeInfo = month + "/" + day + " " + hour + ":" + min;
        }
        infoList.push(brandRush);
        tm.setData({
          brandRushInfo: infoList,
          brandLogo: brandRush.brandLogo,
          mainTitle: brandRush.mainTitle,
          subTitle: brandRush.subTitle,
          // brandSource: brandSource
        });
        tm.goodsListNew();
        wx.stopPullDownRefresh();
      }
    });
  },
  goodsListNew: function() {
    var tm = this;
    wx.request({
      url: app.getUrl("QSHGetListRushGoods"),
      data: {
        brandId: tm.data.brandId,
        goodsSource: tm.data.brandSource
      },
      success: function(jd) {
        if (jd.data.length != 0) {
          let goodsList = [];
          jd.data.forEach(o => {
            goodsList.push(o)
          });
          tm.setData({
            rushGoodsList: goodsList
          })
        }
      }
    });
  },
  getListGoodsData: function() {
    var tm = this;
    wx.request({
      url: app.getUrl("QSHGetPageRushGoodsByTagId"),
      data: {
        tagId: tm.data.tagId,
        pi: ++tm.data.dataIndex,
        ps: tm.data.dataSize
      },
      success: function(jd) {
        if (jd.data.length == 0) {
          return;
        } else {
          if (jd.data.length != 0) {
            let goodsList = [];
            jd.data.forEach(o => {
              goodsList.push(o)
            });
            var newList = tm.data.rushGoodsList.concat(goodsList)
            tm.setData({
              rushGoodsList: newList
            })
          }
          if (jd.data.length == tm.data.dataSize) {            
            wx.stopPullDownRefresh();
          } else {
            tm.setData({
              hasMore: false
            })
          }
        }
      }
    });

  },
})