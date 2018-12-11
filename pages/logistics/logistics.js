var e = getApp();

Page({
    data: {
        ExpressCompanyName: "",
        ShipOrderNumber: "",
        ShipTo: "",
        CellPhone: "",
        Address: "",
        LogisticsData: null
    },
    onLoad: function(a) {
        var o = this, s = a.orderid;
        e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl("GetLogistic"),
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
                            LogisticsData: s.traces
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
                }
            });
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {}
});