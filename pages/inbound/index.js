// pages/inbound/index.js
import { urls } from '../../constants/urls.js'
import { constants } from '../../constants/constants.js'
import { _get, _post } from '../../utils/request.js'
import { config } from '../../config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: constants.EMPTY_STRING,
    status: constants.ORDER_STATUS.WAIT_INBOUND,
    pageId: constants.DEFAULT_PAGE_ID,
    pageSize: constants.DEFAULT_PAGE_SIZE,
    orderList: [],
    mock: [
      {
        "orderNo": "127386124519402", //验布单号
        "customerName": "泰森布业", //客户
        "customerMobile": "13838987766", //客户联系方式
        "status": 10, //状态
        "statusName": "待入库", //状态 
        "createTime": "2018-10-10",  //下单时间
        "customerFabricVolumes": 1111, //总卷数
        "bossFabricVolumes": 12, //实际总卷数
        "bossFabricVolumesReadyComplete": 12, //已验布卷数
        "payStatus": 1, //支付状态
        "payStatusName": "待支付" //支付状态名称
      },
      {
        "orderNo": "127386124519402", //验布单号
        "customerName": "泰森布业", //客户
        "customerMobile": "13838987766", //客户联系方式
        "status": 10, //状态
        "statusName": "待入库", //状态 
        "createTime": "2018-10-10",  //下单时间
        "customerFabricVolumes": 1111, //总卷数
        "bossFabricVolumes": 12, //实际总卷数
        "bossFabricVolumesReadyComplete": 12, //已验布卷数
        "payStatus": 1, //支付状态
        "payStatusName": "待支付" //支付状态名称
      },
      {
        "orderNo": "127386124519402", //验布单号
        "customerName": "泰森布业", //客户
        "customerMobile": "13838987766", //客户联系方式
        "status": 10, //状态
        "statusName": "待入库", //状态 
        "createTime": "2018-10-10",  //下单时间
        "customerFabricVolumes": 1111, //总卷数
        "bossFabricVolumes": 12, //实际总卷数
        "bossFabricVolumesReadyComplete": 12, //已验布卷数
        "payStatus": 1, //支付状态
        "payStatusName": "待支付" //支付状态名称
      },
      {
        "orderNo": "127386124519402", //验布单号
        "customerName": "泰森布业", //客户
        "customerMobile": "13838987766", //客户联系方式
        "status": 10, //状态
        "statusName": "待入库", //状态 
        "createTime": "2018-10-10",  //下单时间
        "customerFabricVolumes": 1111, //总卷数
        "bossFabricVolumes": 12, //实际总卷数
        "bossFabricVolumesReadyComplete": 12, //已验布卷数
        "payStatus": 1, //支付状态
        "payStatusName": "待支付" //支付状态名称
      },
      {
        "orderNo": "127386124519402", //验布单号
        "customerName": "泰森布业", //客户
        "customerMobile": "13838987766", //客户联系方式
        "status": 10, //状态
        "statusName": "待入库", //状态 
        "createTime": "2018-10-10",  //下单时间
        "customerFabricVolumes": 1111, //总卷数
        "bossFabricVolumes": 12, //实际总卷数
        "bossFabricVolumesReadyComplete": 12, //已验布卷数
        "payStatus": 1, //支付状态
        "payStatusName": "待支付" //支付状态名称
      }
    ]
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
    this.setData({ orderList: [] });
    this.getDataList();
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
    this.setData({
      pageId: constants.DEFAULT_PAGE_ID, 
      orderList: [] 
    });
    this.getDataList(function () {
      wx.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.data.hasMore) {
      let pageId = this.data.pageId + 1;
      this.setData({ pageId: pageId });
      this.getDataList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onSearchChange(e) {
    this.setData({
      keyword: e.detail
    });
  },

  onSearch(e) {
    this.setData({ orderList: [] });
    this.getDataList();
  },

  /**
   * 点击切换Tab事件
   */
  onTabChange(e) {
    let _this = this;
    let status = constants.ORDER_STATUS.WAIT_INBOUND;
    let index = e.detail.index;

    if(index === 0) {
      status = constants.ORDER_STATUS.WAIT_INBOUND;
    } else if(index === 1) {
      status = constants.ORDER_STATUS.ALL_INBOUND;
    }
    
    _this.setData({ 
      pageId: constants.DEFAULT_PAGE_ID, 
      status: status, 
      orderList: [] 
      });

    _this.getDataList();
  },

  getDataList: function (callback) {
    let _this = this;

    _post(urls.listbyinputstatus_url, 
    {
      keyword: _this.data.keyword,
      pageId: _this.data.pageId,
      pageSize: _this.data.pageSize,
      status: _this.data.status
    }, 
      function (result) {
        console.log(result);
        if (result.data) {
          _this.setData(result.data)
          let orderList = _this.data.orderList;
          orderList = orderList.concat(result.data.dataList);
          _this.setData({ orderList: orderList });
        }
    }, 
    false, 
    function () {
      typeof callback === 'function' && callback();
    });
  }
})