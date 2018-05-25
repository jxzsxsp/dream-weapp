App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    var info = wx.getStorageSync('info') || this.globalData.info;
    this.globalData.info = info
    wx.setStorageSync('info', info)
    this.getProfile();
    this.getProvince();
    this.getUniversity(info.province.code)
    this.getCollege(info.university.code)
    this.getSpeciality(info.college.code)
  },

  updateInfo: function(info) {
    this.globalData.info = info;
    wx.setStorageSync('info', info)
  },
  
  getProfile: function() {
    var that = this;

    wx.getUserInfo({
      withCredentials: true,
      lang: '',
      success: function(res) {
        console.log(res);
        that.globalData.userInfo = res.userInfo
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  getProvince: function(parent) {
    let that = this;
    let baseUrl = that.globalData.baseUrl;

    wx.request({
      url: baseUrl + '/api/province?parent=' + parent,
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res.data);
        that.globalData.provinceList = res.data;
      }
    })
  },

  getUniversity: function (parent) {
    let that = this;
    let baseUrl = that.globalData.baseUrl;

    wx.request({
      url: baseUrl + '/api/university?parent=' + parent,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.globalData.universityList = res.data;
      }
    })
  },

  getCollege: function (parent) {
    let that = this;
    let baseUrl = that.globalData.baseUrl;

    wx.request({
      url: baseUrl + '/api/college?parent=' + parent,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.globalData.collegeList = res.data;
      }
    })
  },

  getSpeciality: function (parent) {
    let that = this;
    let baseUrl = that.globalData.baseUrl;

    wx.request({
      url: baseUrl + '/api/speciality?parent=' + parent,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        that.globalData.specialityList = res.data;
      }
    })
  },
  
  globalData: {
    baseUrl: "http://localhost:8000",
    userInfo: {},
    info: {
      province: "",
      university: "",
      college: "",
      speciality: "",
      start: false
    }
  }
})
