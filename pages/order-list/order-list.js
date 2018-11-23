// pages/order-list/order-list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      {
        title: "梭织面料打卷/自检",
        statusName: "待入库",
        rollSteps: [
          {
            title: "共6卷"
          }
        ],
        checkHouse: "绍兴交易园店",
        logisticsTypeName: "代发货至收货地址",
        steps: {
          active: 1,
          list: [
            {
              title: "下单成功"
            },
            {
              title: "等待收货"
            }
          ]
        },
        showCancelBtn: true,
        showCheckBtn: false,
        showPayBtn: false
      },
      {
        title: "梭织面料打卷/自检",
        statusName: "已入库",
        rollSteps: [
          {
            title: "共6卷"
          },
          {
            title: "入库2卷"
          }
        ],
        checkHouse: "绍兴交易园店",
        logisticsTypeName: "代发货至收货地址",
        steps: {
          active: 2,
          list: [
            {
              title: "下单成功"
            },
            {
              title: "已收货"
            },
            {
              title: "等待验布"
            }
          ]
        },
        showCancelBtn: false,
        showCheckBtn: false,
        showPayBtn: false
      },
      {
        title: "梭织面料打卷/自检",
        statusName: "验布中",
        rollSteps: [
          {
            title: "共6卷"
          },
          {
            title: "入库2卷"
          },
          {
            title: "验布2卷"
          }
        ],
        checkHouse: "绍兴交易园店",
        logisticsTypeName: "代发货至收货地址",
        steps: {
          active: 2,
          list: [
            {
              title: "已收货"
            },
            {
              title: "验布中"
            },
            {
              title: "待付款"
            }
          ]
        },
        showCancelBtn: false,
        showCheckBtn: true,
        showPayBtn: false
      },
      {
        title: "梭织面料打卷/自检",
        statusName: "验布完成",
        rollSteps: [
          {
            title: "共6卷"
          },
          {
            title: "入库6卷"
          },
          {
            title: "验布6卷"
          }
        ],
        checkHouse: "绍兴交易园店",
        logisticsTypeName: "代发货至收货地址",
        steps: {
          active: 2,
          list: [
            {
              title: "已收货"
            },
            {
              title: "验布完成"
            },
            {
              title: "待付款"
            }
          ]
        },
        showCancelBtn: false,
        showCheckBtn: true,
        showPayBtn: false
      },
      {
        title: "梭织面料打卷/自检",
        statusName: "待付款",
        rollSteps: [
          {
            title: "共6卷"
          },
          {
            title: "入库6卷"
          },
          {
            title: "验布6卷"
          }
        ],
        checkHouse: "绍兴交易园店",
        logisticsTypeName: "代发货至收货地址",
        steps: {
          active: 2,
          list: [
            {
              title: "验布完成"
            },
            {
              title: "待付款"
            },
            {
              title: "待出库"
            }
          ]
        },
        showCancelBtn: false,
        showCheckBtn: true,
        showPayBtn: true
      },
      {
        title: "梭织面料打卷/自检",
        statusName: "待出库",
        rollSteps: [
          {
            title: "共6卷"
          },
          {
            title: "入库6卷"
          },
          {
            title: "验布6卷"
          }
        ],
        checkHouse: "绍兴交易园店",
        logisticsTypeName: "代发货至收货地址",
        steps: {
          active: 2,
          list: [
            {
              title: "待付款"
            },
            {
              title: "待出库"
            },
            {
              title: "已完成"
            }
          ]
        },
        showCancelBtn: false,
        showCheckBtn: true,
        showPayBtn: false
      },
      {
        title: "梭织面料打卷/自检",
        statusName: "已出库",
        rollSteps: [
          {
            title: "共6卷"
          },
          {
            title: "入库6卷"
          },
          {
            title: "验布6卷"
          }
        ],
        checkHouse: "绍兴交易园店",
        logisticsTypeName: "代发货至收货地址",
        steps: {
          active: 2,
          list: [
            {
              title: "待出库"
            },
            {
              title: "已完成"
            }
          ]
        },
        showCancelBtn: false,
        showCheckBtn: true,
        showPayBtn: false
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

  }
})