// pages/inbound/inbound.js
import { urls } from '../../constants/urls.js'
import { _post } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showFabricType: false,
    showClothType: false,
    showLogisticsType: false,
    mock: {
      "showBtn": {
        "reject": true,  //是否可以驳回
        "inputAndPrint": true  //是否可以入库并打印
      },
      "orderDetail": {
        "customerFabricType": 10,   //'面料类型 10 针织 20 梭织'
        "customerFabricTypeName": "梭织",   //'面料类型 10 针织 20 梭织'
        "customerClothType": 10,  //10-打卷称重 20-快速验布，30-中端验布，40-高端验布
        "customerClothTypeName": "打卷称重",  //10-打卷称重 20-快速验布，30-中端验布，40-高端验布
        "customerFabricVolumes": "32", //卷数
        "logisticsTypeId": 10, //物流类型 (10.自提 20.代发货至物流送货点 30.代发货至)
        "logisticsTypeName": "自提", //物流类型 (10.自提 20.代发货至物流送货点 30.代发货至)
        "customerName": "湖州开顺布业", //送检方客户名称
        "customerMobile": "18260348234", //送检方手机
        "checkItems": ["手写报告", "克重", "门幅", "米数/米差", "侧边贴", "换纸管", "换包装"],
        "bossClothType": 20,  //验布方式
        "bossClothTypeName": "快速验布",  //验布方式
        "bossFabricVolumes": 12, //实际总卷数
        "bossFabricVolumesReadyIn": 12 //已入库卷数
      },
      "fabricTypeList": [
        {
          "id": 10,
          "name": "针织"
        },
        {
          "id": 20,
          "name": "梭织"
        }
      ], //面料类型 10 针织 20 梭织
      "clothTypeList": [
        {
          "id": 10,
          "name": "打卷称重"
        },
        {
          "id": 20,
          "name": "快速验布"
        },
        {
          "id": 30,
          "name": "中端验布"
        },
        {
          "id": 40,
          "name": "高端验布"
        }
      ], //10-打卷称重 20-快速验布，30-中端验布，40-高端验布
      "logisticsTypeList": [
        {
          "id": 10,
          "name": "自提"
        },
        {
          "id": 20,
          "name": "代发货至物流送货点"
        },
        {
          "id": 30,
          "name": "代发货至"
        }
      ] //取货方式10.自提 20.代发货至物流送货点 30.代发货至
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

  /**
   * 入库并打印
   */
  inbound: function (callback) {
    let _this = this;

    _post(urls.input_url,
      {
        orderNo: _this.data.orderNo,
        logisticsTypeId: _this.data.logisticsTypeId,
        bossClothType: _this.data.bossClothType,
        bossFabricVolumes: _this.data.bossFabricVolumes,
        bossFabricVolumesIn: _this.data.bossFabricVolumesIn
      },
      function (result) {
        console.log(result);
      },
      false,
      function () {
        wx.showToast({
          title: '入库成功',
          icon: 'none'
        });

        wx.navigateTo({
          url: '/pages/codeprint/index',
        })

        typeof callback === 'function' && callback();
      });
  },

  reject: function (e) {
    let _this = this;

    wx.navigateTo({
      url: '/pages/inbound/reject?orderNo=' + _this.data.orderNo,
    })
  },

  getInitData: function (callback) {
    let _this = this;

    _post(urls.input_init_url,
      {
        orderNo: _this.data.orderNo
      },
      function (result) {
        console.log(result);
      },
      false,
      function () {
        let mock = _this.data.mock;
        _this.setData(mock);
        _this.setData(mock.orderDetail);
        typeof callback === 'function' && callback();
      });
  },

  toggle(type) {
    this.setData({
      [type]: !this.data[type]
    });
  },

  toggleFabricType() {
    this.toggle('showFabricType');
  },

  toggleClothType() {
    this.toggle('showClothType');
  },

  toggleLogisticsType() {
    this.toggle('showLogisticsType');
  },

  selectFabricType(e) {
    console.log(e);
    this.setData({
        customerFabricType: e.detail.id,
        customerFabricTypeName: e.detail.name
    })
    this.toggleFabricType();
  },

  selectClothType(e) {
    console.log(e);
    this.setData({
        bossClothType: e.detail.id,
        bossClothTypeName: e.detail.name
    })
    this.toggleClothType();
  },

  selectLogisticsType(e) {
    console.log(e);
    this.setData({
        logisticsTypeId: e.detail.id,
        logisticsTypeName: e.detail.name
    })
    this.toggleLogisticsType();
  }

})