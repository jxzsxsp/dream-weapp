var e = getApp();

Page({
    data: {
        disabled: !0,
        userName: "",
        password: "",
        ReferralUserId: ""
    },
    onLoad: function(e) {

        // this.quickLogin()
    },
    onShow: function() {
        // this.quickLogin()
    },
    bindUserNameInput: function(e) {
        this.setData({
            userName: e.detail.value
        });
    },
    bindPwdInput: function(e) {
        this.setData({
            password: e.detail.value
        }), this.data.userName.length > 0 && this.data.password.length > 0 ? this.setData({
            disabled: !1
        }) : this.setData({
            disabled: !0
        });
    },
    loginbyUser: function(a) {
        var s = this.data.userName,
            t = this.data.password;
        t.length < 6 ? wx.showModal({
            title: "提示",
            content: "密码长度不能少于6位",
            showCancel: !1
        }) : (wx.showLoading({
            title: "正在登录"
        }), e.getWxUserInfo(function(a) {
            var n = e.getRefferUserId();
            wx.request({
                url: e.getUrl("LoginByUserName"),
                data: {
                    openId: a.openId,
                    userName: s,
                    password: t,
                    nickName: a.nikeName,
                    unionId: a.unionId,
                    encryptedData: a.encryptedData,
                    session_key: a.session_key,
                    iv: a.iv,
                    ReferralUserId: n
                },
                success: function(a) {
                    "OK" == a.data.Status ? (wx.hideLoading(), e.setUserInfo(a.data.Data), wx.switchTab({
                        url: "../usehome/usehome"
                    })) : (wx.hideLoading(), wx.showModal({
                        title: "提示",
                        content: a.data.Message,
                        showCancel: !1,
                        confirmColor: "#db3c40",
                        success: function(e) {}
                    }));
                }
            });
        }));
    },
    quickLogin: function(a) {
        e.getWxUserInfo(function(a) {
            var s = e.getRefferUserId();
            wx.request({
                url: e.getUrl("QuickLogin"),
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
                    void 0 == a.data.error_response ? a.data.Data.IsBindUser ? (e.setUserInfo(a.data.Data),
                        wx.switchTab({
                            url: "../usehome/usehome"
                        })) : wx.redirectTo({
                        url: "../relationlogin/relationlogin"
                    }) : hishop.showTip(a.data.error_response.sub_msg);
                }
            });
        });
    }
});