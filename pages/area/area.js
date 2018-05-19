Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: [
      {
        id: 1,
        name: "北京",
        areas: [
          {
            id: 1,
            name: "延庆县"
          },
          {
            id: 1,
            name: "密云县"
          },
          {
            id: 1,
            name: "平谷县"
          },
          {
            id: 1,
            name: "怀柔县"
          },
          {
            id: 1,
            name: "大兴县"
          },
          {
            id: 1,
            name: "昌平县"
          },
          {
            id: 1,
            name: "顺义区"
          },
          {
            id: 1,
            name: "通州区"
          },
          {
            id: 1,
            name: "房山区"
          },
          {
            id: 1,
            name: "门头沟区"
          },
          {
            id: 1,
            name: "海淀区"
          },
          {
            id: 1,
            name: "石景山区"
          },
          {
            id: 1,
            name: "丰台区"
          },
          {
            id: 1,
            name: "朝阳区"
          },
          {
            id: 1,
            name: "宣武区"
          },
          {
            id: 1,
            name: "崇文区"
          },
          {
            id: 1,
            name: "西城区"
          },
          {
            id: 1,
            name: "东城区"
          }
        ]
      },
        {
            id: 1,
            name: "河北",
            areas: [
            ]
        },
        {
            id: 1,
            name: "山西",
            areas: [
            ]
        },
        {
            id: 1,
            name: "天津",
            areas: [
            ]
        },
        {
            id: 1,
            name: "辽宁",
            areas: [
            ]
        },
        {
            id: 1,
            name: "吉林",
            areas: [
            ]
        },
        {
            id: 1,
            name: "黑龙江",
            areas: [
            ]
        },
        {
            id: 1,
            name: "上海",
            areas: [
            ]
        },
        {
            id: 1,
            name: "江苏",
            areas: [
            ]
        },
        {
            id: 1,
            name: "浙江",
            areas: [
            ]
        },
        {
            id: 1,
            name: "安徽",
            areas: [
            ]
        },
        {
            id: 1,
            name: "福建",
            areas: [
            ]
        },
        {
            id: 1,
            name: "江西",
            areas: [
            ]
        },
        {
            id: 1,
            name: "山东",
            areas: [
            ]
        },
        {
            id: 1,
            name: "河南",
            areas: [
            ]
        },
        {
            id: 1,
            name: "湖北",
            areas: [
            ]
        },
        {
            id: 1,
            name: "湖南",
            areas: [
            ]
        },
        {
            id: 1,
            name: "广东",
            areas: [
            ]
        },
        {
            id: 1,
            name: "广西",
            areas: [
            ]
        },
        {
            id: 1,
            name: "海南",
            areas: [
            ]
        },
        {
            id: 1,
            name: "重庆",
            areas: [
            ]
        },
        {
            id: 1,
            name: "四川",
            areas: [
            ]
        },
        {
            id: 1,
            name: "贵州",
            areas: [
            ]
        },
        {
            id: 1,
            name: "云南",
            areas: [
            ]
        },
        {
            id: 1,
            name: "西藏",
            areas: [
            ]
        },
        {
            id: 1,
            name: "陕西",
            areas: [
            ]
        },
        {
            id: 1,
            name: "甘肃",
            areas: [
            ]
        },
        {
            id: 1,
            name: "青海",
            areas: [
            ]
        },
        {
            id: 1,
            name: "宁夏",
            areas: [
            ]
        },
        {
            id: 1,
            name: "新疆",
            areas: [
            ]
        },
        {
            id: 1,
            name: "台湾",
            areas: [
            ]
        },
        {
            id: 1,
            name: "香港",
            areas: [
            ]
        },
        {
            id: 1,
            name: "澳门",
            areas: [
            ]
        },
        {
            id: 1,
            name: "内蒙古",
            areas: [
            ]
        },
        {
            id: 1,
            name: "海外",
            areas: [
            ]
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
    
  },

  selectProvince: function(e) {
    const province = e.currentTarget.dataset.province;
    console.log(province);

    var provinces = this.data.provinces;
    var areas = [];
    const length = provinces.length;
    for(let i=0; i<length; i++){
      if(provinces[i].name === province) {
        areas = provinces[i].areas;
      }
    }
    console.log(areas);

    this.setData({
      province: province,
      areas: areas
    });

  },

  selectArea: function(e) {
    const area = e.currentTarget.dataset.area;
    console.log(area)

    const province = this.data.province;

    wx.navigateBack({
      url: '../start/start?province='+province+"&area="+area
    })
  }
})