// pages/inbound/roll-log.js
import { urls } from '../../constants/urls.js'
import { _post } from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mock: {
      "logList": {
        "list": [
          {
            "status": "10",   //状态
            "statusName": "入库",  //状态说明
            "reportImgUrl": [],  //验布报告
            "description": "页面显示说明",  //页面显示说明
            "operator": "张许昌", //操作人
            "createDate": "12月31日", //操作日期
            "createTime": "22:30:40" //操作时间
          },
          {
            "status": "10",   //状态
            "statusName": "上机",  //状态说明
            "reportImgUrl": "",  //验布报告
            "description": "页面显示说明",  //页面显示说明
            "operator": "张许昌", //操作人
            "createDate": "12月31日", //操作日期
            "createTime": "22:30:40" //操作时间
          },
          {
            "status": "10",   //状态
            "statusName": "开始验布",  //状态说明
            "reportImgUrl": "",  //验布报告
            "description": "页面显示说明",  //页面显示说明
            "operator": "张许昌", //操作人
            "createDate": "12月31日", //操作日期
            "createTime": "22:30:40" //操作时间
          },
          {
            "status": "10",   //状态
            "statusName": "验布完成",  //状态说明
            "reportImgUrl": ["https://zsyougou.uubi.cn/assets/store/img/login_bg.jpg", "https://zsyougou.uubi.cn/assets/store/img/login_bg.jpg"],  //验布报告
            "description": "页面显示说明",  //页面显示说明
            "operator": "张许昌", //操作人
            "createDate": "12月31日", //操作日期
            "createTime": "22:30:40" //操作时间
          },
          {
            "status": "10",   //状态
            "statusName": "已下机",  //状态说明
            "reportImgUrl": "",  //验布报告
            "description": "页面显示说明",  //页面显示说明
            "operator": "张许昌", //操作人
            "createDate": "12月31日", //操作日期
            "createTime": "22:30:40" //操作时间
          },
          {
            "status": "10",   //状态
            "statusName": "出库",  //状态说明
            "reportImgUrl": "",  //验布报告
            "description": "页面显示说明",  //页面显示说明
            "operator": "张许昌", //操作人
            "createDate": "12月31日", //操作日期
            "createTime": "22:30:40" //操作时间
          }
        ],
        "hasMore": false,
        "total": 190
      },
      "orderDetail": {
        "orderNo": "1446656138002648",   //订单号
        "customerMobile": "18260348234",  //客户手机
        "customerName": "湖州开顺布业" //送检方客户名称
      }
    },
    steps: [],
    pageId: 1,
    pageSize: 20
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ rollCode: options.rollCode });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getLogList();
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
    this.getLogList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getLogList: function (callback) {
    let _this = this;

    _post(urls.roll_log_list_url,
      {
        rollCode: _this.data.rollCode,
        pageId: _this.data.pageId,
        pageSize: _this.data.pageSize
      },
      function (result) {
        console.log(result);
      },
      false,
      function () {
        let steps = _this.data.steps;
        let mock = _this.data.mock;
        _this.setData(mock);
        steps = steps.concat(mock.logList.list);
        _this.setData({ steps: steps});
        typeof callback === 'function' && callback();
      });
  }

})