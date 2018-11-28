// pages/inbound/detail.js
import { urls } from '../../constants/urls.js'
import { _post } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mock: {
      "orderDetail": {
        "orderNo": "1446656138002648", //验布单号
        "customerName": "湖州开顺布业", //客户名称
        "customerMobile": "18260348234", //联系方式
        "customerMessage": "打卷不要带链尚LOGO", //客户留言

        "customerFabricType": 10,   //'面料类型 10 针织 20 梭织'
        "customerFabricTypeName": "针织",   //'面料类型 10 针织 20 梭织'
        "customerClothType": 10,  //验布方式 10-打卷称重 20-快速验布，30-中端验布，40-高端验布
        "customerClothTypeName": "打卷称重",  //验布方式 10-打卷称重 20-快速验布，30-中端验布，40-高端验布
        "customerClothTypeNameItem": "手写报告,克重,门幅", //检测项目
        "bossFabricMeters": 130, //验布米数
        "customerFabricVolumes": 12, //卷数
        "customerLogisticsType": 10, //物流类型 (10.自提 20.代发货至物流送货点 30.代发货至)
        "customerLogisticsTypeName": "自提", //物流类型 (10.自提 20.代发货至物流送货点 30.代发货至)

        "bossFabricType": 10, //'面料类型 10 针织 20 梭织'
        "bossFabricTypeName": "针织", //'面料类型 10 针织 20 梭织'
        "bossClothType": 10,  //验布方式 10-打卷称重 20-快速验布，30-中端验布，40-高端验布
        "bossClothTypeName": "打卷称重",  //验布方式 10-打卷称重 20-快速验布，30-中端验布，40-高端验布
        "bossClothTypeNameItem": "手写报告,克重,门幅", //检测项目
        "bossFabricVolumes": 12, //实际总卷数
        "bossLogisticsType": 10, //物流类型 (10.自提 20.代发货至物流送货点 30.代发货至)
        "bossLogisticsTypeName": "自提", //物流类型 (10.自提 20.代发货至物流送货点 30.代发货至)
        "bossFabricVolumesReadyIn": 12, //已入库卷数
        "orderRoll": [
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" },
          { "rollCode": "618103010110000001" }
        ]
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({orderNo: options.orderNo});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDetailData();
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

  getDetailData: function (callback) {
    let _this = this;

    _post(urls.detail_url,
      {
        orderNo: _this.data.orderNo
      },
      function (result) {
        console.log(result);
        let data = result.data;
        _this.setData(data);
        _this.setData(data.orderDetail);
      },
      false,
      function () {
        typeof callback === 'function' && callback();
      });
  },

  checkRollLog: function (e) {
    const roll = e.currentTarget.dataset.roll;

    wx.navigateTo({
      url: 'roll-log?rollCode=' + roll,
    })
  }
})