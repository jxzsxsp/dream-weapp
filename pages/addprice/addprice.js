// pages/addprice/addprice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    one:true,
    two: false,
    three: false,
    four: false,
    priceadd:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  onShareAppMessage: function (event) {
    var barndId = event.target.dataset['brandid'];
    var brandSoruce = event.target.dataset['brandsource'];
    var brandName = event.target.dataset['maintitle'];
    return {
      title: '正在清仓特卖，手慢无！',
      path: '/pages/brandInfo/brandInfo?brandId=' + barndId + "&brandSource=" + brandSoruce,
      imgUrl: '/images/ICON_09.png'
    }

    
  },
  bindtapone:function(){
    this.setData({
      one:true,
      two: false,
      three: false,
      four: false,
    })
  },
   bindtaptwo: function () {
    this.setData({
      one: false ,
      two: true,
      three: false,
      four: false,
    })
  },
  
  bindtapthree: function () {
    this.setData({
      one: false,
      two: false,
      three: true,
      four: false,
    })
  }
  ,
  bindtapfour: function () {
    this.setData({
      one: false,
      two: false,
      three: false,
      four: true,
    })
  }, 

  openmsg:function(){
   this.setData({
    
   })

  }
})