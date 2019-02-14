var t = require("../../utils/config.js");
var app = getApp();
Page({
    data: {
        ExpressCompanyName: "",
        ShipOrderNumber: "",
        ShipTo: "",
        CellPhone: "",
        Address: "",
        LogisticsData: []
    },
    onLoad: function(a) {
        app.globalData.fundebug.notifyError(new Error("物流"), {
            name: "物流状态",
            metaData: a
        });
        var o = this, s = a.orderid;
        app.getOpenId(function(a) {
            wx.request({
                url: app.getUrl("GetLogistic"),
                data: {
                    openId: a,
                    orderId: s
                },
                success: function(e) {
                    if (console.log(JSON.stringify(e)), "OK" == e.data.Status) {
                        var a = e.data.Data, s = JSON.parse(a.LogisticsData);
                        o.setData({
                            ExpressCompanyName: a.ExpressCompanyName,
                            ShipOrderNumber: a.ShipOrderNumber,
                            ShipTo: a.ShipTo,
                            CellPhone: a.CellPhone,
                            Address: a.Address,
                            LogisticsData: s.data
                        });
                    } else "NOUser" == e.data.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },complete: function(e) {
                    app.globalData.fundebug.notifyError(new Error("物流"), {
                        name: "物流状态",
                        metaData: e
                    });
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});