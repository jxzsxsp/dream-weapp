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
    brandSoruce: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    var brandId = options.brandId;
    var brandSource = options.brandSource;
    //获取品牌特卖列表        
    var tm = this;
    wx.request({
        
      url: app.getUrl("QSHGetInfoBrandRush"),
      data: {
        brandId: brandId,
        brandSource: brandSource
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
          brandSource: brandSource
        })
      }
    });
    // 执行倒计时函数
    this.countDown();


    wx.request({
      url: app.getUrl("QSHGetListRushGoods"),
      data: {
        brandId: brandId,
        goodsSource: brandSource
      },
      success: function(jd) {

        let goodsList = [];
        jd.data.forEach(o => {
          goodsList.push(o)
        });
          console.log(goodsList)
        tm.setData({
          rushGoodsList: goodsList
        })
      }
    });

  },
  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  linkProductDetail: function(event) {
    wx.navigateTo({
      url: "../productdetail/productdetail?id=" + event.currentTarget.dataset.productid
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


  },
  countDown: function() { //倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    var rushInfo = this.data.brandRushInfo;
    rushInfo.forEach(o => {
      var rushEndTime = o.rushEndTime;
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
                  showCancel: false
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
  filterNum: function (value, count) {
      var num = Number(value)
      return num.toFixed(count)
  },
  
  sharemsg: function (o) {
    wx.navigateTo({
      url: "../addprice/addprice"
    });
  }
})