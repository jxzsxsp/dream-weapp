var app = getApp();
Page({
    bindGetUserInfo: function(e) {
        var that = this;
        //此处授权得到userInfo
        //接下来写业务代码
        //最后，记得返回刚才的页面
        app.getWxUserInfo(function(a) {
            var s = app.getRefferUserId();
            wx.request({
                url: app.getUrl("QuickLogin"),
                data: {
                    openId: a.openId,
                    nickName: a.nikeName,
                    unionId: a.unionId,
                    headImage: a.headImage,
                    encryptedData: a.encryptedData,
                    session_key: a.session_key,
                    iv: a.iv,
                    ReferralUserId: s
                },
                success: function(a) {
                    void 0 == a.data.error_response ? a.data.Data.IsBindUser ? (app.setUserInfo(a.data.Data),
                        wx.switchTab({
                            url: "../home/home"
                        })) : wx.redirectTo({
                        url: "../relationlogin/relationlogin"
                    }) : hishop.showTip(a.data.error_response.sub_msg);
                }
            });
        });
        wx.navigateBack({
            delta: 12
        })
    }
})