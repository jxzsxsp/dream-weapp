var e = getApp();

Page({
    data: {
        UserCredentials: ["../../images/return-img_03.jpg", "../../images/return-img_03.jpg", "../../images/return-img_03.jpg"],
        UploadGredentials: [],
        FormId: "",
        ReturnMoney: 0,
        ImageIndex: 0,
        OneReundAmount: 0,
        joinName:"",
        joinConcat: "",
        joinPhone: null,
        joinGoods: "",
        joinBrand: "",
        joinUrl: "",
        focus: false
    },
    onLoad: function(t) {

    },
    GetCheckData: function(e) {
        var t = e.data;
        if ("NOUser" == t.Message) wx.navigateTo({
            url: "../login/login"
        });
        else if ("OK" == t.Status) {

        } else wx.showModal({
            title: "提示",
            content: t.Message,
            showCancel: !1,
            success: function(e) {
                e.confirm && wx.navigateBack({
                    delta: 1
                });
            }
        });
    },
    uploadImg: function(e) {
        var t = this,
            a = t.data.UserCredentials,
            n = e.currentTarget.dataset.index;
        wx.chooseImage({
            success: function(e) {
                a[n] = e.tempFilePaths[0];
                var o = parseInt(t.data.ImageIndex);
                o = o >= 2 ? 2 : o++, t.setData({
                    UserCredentials: a,
                    ImageIndex: o
                });
            }
        });
    },
    blurCheck: function(e) {
        var tm = this;
        if (e.detail.value != "") {
            var x = e.currentTarget.dataset.key 
            if(x == 'joinName') {
                tm.setData({
                    joinName: e.detail.value
                })
            } else if (x == 'joinConcat') {
                tm.setData({
                    joinConcat: e.detail.value
                })
            } else if (x == 'joinPhone') {
                if (!/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value)) {
                    wx.showModal({
                        title: '提示',
                        content: '你输入的电话不符，请重新检查填写',
                        showCancel: false
                    })
                    tm.setData({
                        focus: true
                    })
                } else {
                    tm.setData({
                        joinPhone: e.detail.value,
                        focus: false
                    })
                }
            } else if (x == 'joinGoods') {
                tm.setData({
                    joinGoods: e.detail.value
                })
            } else if (x == 'joinBrand') {
                tm.setData({
                    joinBrand: e.detail.value
                })
            } else if (x == 'joinUrl') {
                tm.setData({
                    joinUrl: e.detail.value
                })
            }
        }
    },
    formSubmit: function(e) {
        var tm = this;
        this.setData({
            formId: e.detail.formId,
            UploadGredentials: []
        });
        var p = [];
        tm.data.UserCredentials.find(function (e, tm) {
            "../../images/return-img_03.jpg" != e && p.push(e);
        }), tm.UploadBatchImages(tm, p);
        if (this.data.joinName == "") {
            wx.showModal({
                title: "提示",
                content: "请输入联系人",
                showCancel: false,
                confirmColor: "#db3c40"
            });
        } else if (this.data.joinConcat == "") {
            wx.showModal({
                title: "提示",
                content: "请输入联系人",
                showCancel: false,
                confirmColor: "#db3c40"
            });
        } else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.joinPhone))) {
            wx.showModal({
                title: "提示",
                content: "请输入正确的联系方式",
                showCancel: false,
                confirmColor: "#db3c40"
            });
        } else if (this.data.joinGoods == "") {
            wx.showModal({
                title: "提示",
                content: "请输入经营商品",
                showCancel: false,
                confirmColor: "#db3c40"
            });
        } else if (this.data.joinBrand == "") {
            wx.showModal({
                title: "提示",
                content: "请输入正确的退货数量",
                showCancel: false,
                confirmColor: "#db3c40"
            });
        } else if (this.data.joinUrl == "") {
            wx.showModal({
                title: "提示",
                content: "请输入正确的退货数量",
                showCancel: false,
                confirmColor: "#db3c40"
            });
        } else {
            this.setData({
                formId: e.detail.formId,
                UploadGredentials: []
            });
            var p = [];
            tm.data.UserCredentials.find(function (e, tm) {
                "../../images/return-img_03.jpg" != e && p.push(e);
            }), tm.UploadBatchImages(tm, p);
        }
    },
    UploadBatchImages: function(t, a) {
        var n = a.shift();
        void 0 != n ? e.getOpenId(function(o) {
            wx.uploadFile({
                url: e.getUrl("UploadAppletImage"),
                filePath: n,
                name: "file",
                formData: {
                    openId: o
                },
                success: function(e) {
                    var a = JSON.parse(e.data);
                    if ("OK" == a.Status) {
                        var n = t.data.UploadGredentials;
                        n.push(a.Data[0].ImageUrl), t.setData({
                            UploadGredentials: n
                        });
                    } else "NOUser" == a.Message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        content: a.ErrorResponse.ErrorMsg,
                        showCancel: !1,
                        confirmColor: "#db3c40",
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {
                    a.length > 0 ? t.UploadBatchImages(t, a) : t.AddReturnInfo();
                }
            });
        }) : t.AddReturnInfo();
    },
    AddReturnInfo: function() {
        var t = this;
        e.getOpenId(function(a) {
            wx.request({
                url: e.getUrl("YTALApplySupplier"),
                data: {
                    openid: a,
                    supplier: t.data.joinName,
                    brand: t.data.joinBrand,
                    contactname: t.data.joinConcat,
                    mobile: t.data.joinPhone,
                    goods: t.data.joinGoods,
                    shopurl: t.data.joinUrl,
                    remark: t.data.xxxxxxxxxxxxxxxxxx,
                    imgs: t.data.UploadGredentials.join(","),
                    // skuId: t.data.SkuId,
                    // orderId: t.data.OrderId,
                    // Quantity: t.data.ApplyReturnNum,
                    // RefundAmount: t.data.ReturnMoney,
                    // afterSaleType: t.data.AfterSaleTypeId,
                    // RefundType: t.data.RefundType,
                    // RefundReason: t.data.ShowReasonList[t.data.ShowReasonIndex],
                    // Remark: t.data.Remark,
                    // BankName: t.data.BankName,
                    // BankAccountName: t.data.BankAccountName,
                    // BankAccountNo: t.data.BankAccountNo,
                    // UserCredentials: t.data.UploadGredentials.join(","),
                    formId: t.data.formId
                },
                success: function(e) {
                    debugger
                    "OK" == e.data.Status ? wx.showModal({
                        title: "提示",
                        confirmColor: "#db3c40",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(res) {
                            if (res.confirm) {
                                wx.switchTab({
                                    url: "../usehome/usehome"
                                });
                            } else if (res.cancel) {
                                wx.switchTab({
                                    url: "../usehome/usehome"
                                });
                            }
                            // wx.switchTab({
                            //     url: "../usehome/usehome"
                            // });
                        }
                    }) : "NOUser" == e.data.message ? wx.navigateTo({
                        url: "../login/login"
                    }) : wx.showModal({
                        title: "提示",
                        confirmColor: "#db3c40",
                        content: e.data.message,
                        showCancel: !1,
                        success: function(e) {
                            e.confirm && wx.navigateBack({
                                delta: 1
                            });
                        }
                    });
                },
                complete: function() {}
            });
        });
    },
    ToTrim: function(e) {
        return e.replace(/(^\s*)|(\s*$)/g, "");
    }
});