// pages/outbound/outbound.js
import { urls } from '../../constants/urls.js'
import { _post } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mock: {
      "orderDetail": {
        "orderNo": "1446656138002648",
        "customerName": "湖州开顺布业", //送检方客户名称
        "customerMobile": "18260348234", //送检方手机

        "customerFabricType": 10,   //'面料类型 10 针织 20 梭织'
        "customerFabricTypeName": "针织",   //'面料类型 10 针织 20 梭织'
        "bossClothType": 10,  //10-打卷称重 20-快速验布，30-中端验布，40-高端验布
        "bossClothTypeName": "打卷称重",  //10-打卷称重 20-快速验布，30-中端验布，40-高端验布
        "bossClothTypeNameItem": "手写报告,克重,门幅", //检测项目
        "bossLogisticsTypeId": 10, //物流类型 (10.自提 20.代发货至物流送货点 30.代发货至)
        "bossLogisticsTypeName": "代发货至物流送货点", //物流类型 (10.自提 20.代发货至物流送货点 30.代发货至)
        "bossFabricVolumes": "32", //卷数
        "bossFabricVolumesReadyIn": 12, //实际入库卷数
        "bossFabricVolumesReadyComplete": 12, //已验布卷数

        "price": "12.12", //支付金额
        "payStatus": 10,   //支付状态 10-未支付  20-已支付
        "payName": "未支付"
      },
      "orderRoll": [
        {
          "rollCode": "618103010110000001",
          "fabricMix": "32米" //米数/公斤数
        },
        {
          "rollCode": "618103010110000001",
          "fabricMix": "32米" //米数/公斤数
        },
        {
          "rollCode": "618103010110000001",
          "fabricMix": "32米" //米数/公斤数
        },
        {
          "rollCode": "618103010110000001",
          "fabricMix": "32米" //米数/公斤数
        },
        {
          "rollCode": "618103010110000001",
          "fabricMix": "32米" //米数/公斤数
        },
        {
          "rollCode": "618103010110000001",
          "fabricMix": "32米" //米数/公斤数
        },
        {
          "rollCode": "618103010110000001",
          "fabricMix": "32米" //米数/公斤数
        }
      ]
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
    this.getInitData();
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

  getInitData: function (callback) {
    let _this = this;

    _post(urls.output_init_url,
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

  next() {
    let _this = this;

    wx.navigateTo({
      url: '/pages/outbound/logistics?orderNo=' + _this.data.orderNo
        + '&customerName=' + _this.data.customerName
        + '&customerMobile=' + _this.data.customerMobile,
    })
  },

  outBound() {
    let _this = this;

    _post(urls.output_url,
      {
        orderNo: _this.data.orderNo,
      },
      function (result) {
        console.log(result);
        wx.showToast({
          title: '出库成功',
        });
        wx.navigateBack();
      },
      false,
      function () {
        typeof callback === 'function' && callback();
      });
  }

})