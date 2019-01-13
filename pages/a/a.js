var QRCodeJS = require("../../utils/1.js");

Page({


  /**
   * 页面的初始数据
   */
  data: {
    canvasUrl: "",
    // postUrl: [
    //   { url: "http://cos.qkmai.com/qkmbb/ytal/haibao1.jpg", postId: 0 },
    //   { url: "http://cos.qkmai.com/qkmbb/ytal/haibao2.jpg", postId: 1 },
    //   { url: "http://cos.qkmai.com/qkmbb/ytal/haibao3.jpg", postId: 2 },
    //   { url: "http://cos.qkmai.com/qkmbb/ytal/haibao4.jpg", postId: 3 },
    //   { url: "http://cos.qkmai.com/qkmbb/ytal/haibao5.jpg", postId: 4 }],
      postUrl: [
          { url: "http://cos.qkmai.com/qkmbb/ytal/haibao1.jpg", postId: 0 },
          { url: "http://cos.qkmai.com/qkmbb/ytal/haibao2.jpg", postId: 1 },
          { url: "http://cos.qkmai.com/qkmbb/ytal/haibao3.jpg", postId: 2 },
          { url: "http://cos.qkmai.com/qkmbb/ytal/haibao4.jpg", postId: 3 }],
    isShow: false,
    isHidden: true,
    showUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tm = this;
    var str = "http://ytal.qkmai.com/wxsp?ReferralUserId=" + options.id
    var src = options.src
    var bg = ''

    // QRCodeJS.qrApi.draw('https://m.360buyimg.com/babel/jfs/t1/26738/28/2202/95400/5c1a164fEeab2bf20/763811495f123f69.jpg', "logoQRCode", 375, 375);


    // QRCodeJS.qrApi.draw(str, "logoQRCode", 275, 275, null, src, bg);

    QRCodeJS.qrApi.draw(str, "logoQRCode", 275, 275, null, src);

    // setTimeout(function () {
    //   tm.saveCode()
    // }, 3000)
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

  },
  onShowPost: function (e) {
    var that = this;
    this.setData({
      isShow: true,
      isHidden:false,
      showUrl: e.currentTarget.dataset.url
    })
    var url = this.data.showUrl;
    //console.log(url)
    // wx.previewImage({
    //   current: url,
    //   urls: [url]
    // })
    
  },
  saveCode: function () {
    // wx.canvasToTempFilePath({
    //     x: 100,
    //     y: 200,
    //     width: 50,
    //     height: 50,
    //     destWidth: 100,
    //     destHeight: 100,
    //     canvasId: 'logoQRCode',
    //     success(res) {
    //         console.log(res.tempFilePath)

    //     }
    // })
    var tm = this;
    wx.canvasToTempFilePath({
      x: -22,
      y: -22,
      width: 277,
      height: 277,
      destWidth: 700,
      destHeight: 700,
      fileType: 'jpg',
      quality: 1,
      canvasId: 'logoQRCode',
      success(res) {
        console.log(res.tempFilePath)
        tm.setData({
          canvasUrl: res.tempFilePath

        })
      },
      complete(res) {
        // console.log(res)
      }
    })
  },
  saveImage: function (e) {
    console.log(e.currentTarget.dataset.src)
    var src = e.currentTarget.dataset.src

    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src, 'https://m.360buyimg.com/mobilecms/s750x366_jfs/t1/21392/22/2256/160847/5c1b0978Ef1147970/5ced72341c7c05c9.jpg!cr_1125x549_0_72!q70.jpg.dpg'] // 需要预览的图片http链接列表
    })


    // wx.downloadFile({
    //     url: src,     //仅为示例，并非真实的资源
    //     success: function (res) {
    //         // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
    //         if (res.statusCode === 200) {
    //             wx.saveImageToPhotosAlbum({
    //                 filePath: res.tempFilePath,
    //                 success(res) {
    //                     wx.showToast({
    //                         title: '保存图片成功！',
    //                     })
    //                 },
    //                 fail(res) {
    //                     wx.showToast({
    //                         title: '保存图片失败！',
    //                     })
    //                 }
    //             })
    //         }
    //     }
    // })
  }
})