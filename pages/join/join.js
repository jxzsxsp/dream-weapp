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

        // if (e.currentTarget.dataset.key == 'joinPhone') {
        //     if (!/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value)) {
        //         wx.showModal({
        //             title: '提示',
        //             content: '你输入的电话不符，请重新检查填写',
        //             showCancel: false
        //         })
        //     }
        // }
    },
    formSubmit: function(e) {
        // function checkPhone() {
        //     var phone = document.getElementById('phone').value;
        //     if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
        //         alert("手机号码有误，请重填");
        //         return false;
        //     }
        // }
        var tm = this;
        this.setData({
            formId: e.detail.formId,
            UploadGredentials: []
        });
        var p = [];
        tm.data.UserCredentials.find(function (e, tm) {
            "../../images/return-img_03.jpg" != e && p.push(e);
        }), tm.UploadBatchImages(tm, p);
        // if (this.data.joinName == "") {
        //     wx.showModal({
        //         title: "提示",
        //         content: "请输入联系人",
        //         showCancel: false,
        //         confirmColor: "#db3c40"
        //     });
        // } else if (this.data.joinConcat == "") {
        //     wx.showModal({
        //         title: "提示",
        //         content: "请输入联系人",
        //         showCancel: false,
        //         confirmColor: "#db3c40"
        //     });
        // } else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.data.joinPhone))) {
        //     wx.showModal({
        //         title: "提示",
        //         content: "请输入正确的联系方式",
        //         showCancel: false,
        //         confirmColor: "#db3c40"
        //     });
        // } else if (this.data.joinGoods == "") {
        //     wx.showModal({
        //         title: "提示",
        //         content: "请输入经营商品",
        //         showCancel: false,
        //         confirmColor: "#db3c40"
        //     });
        // } else if (this.data.joinBrand == "") {
        //     wx.showModal({
        //         title: "提示",
        //         content: "请输入正确的退货数量",
        //         showCancel: false,
        //         confirmColor: "#db3c40"
        //     });
        // } else if (this.data.joinUrl == "") {
        //     wx.showModal({
        //         title: "提示",
        //         content: "请输入正确的退货数量",
        //         showCancel: false,
        //         confirmColor: "#db3c40"
        //     });
        // } else {
        //     this.setData({
        //         formId: e.detail.formId,
        //         UploadGredentials: []
        //     });
        //     var p = [];
        //     tm.data.UserCredentials.find(function (e, tm) {
        //         "../../images/return-img_03.jpg" != e && p.push(e);
        //     }), tm.UploadBatchImages(tm, p);
        // }


        // var t = this,
        //     a = parseInt(t.data.ShowReasonIndex),
        //     n = t.data.AfterSaleTypeList[t.data.AfterSaleTypeId],
        //     o = t.GetAfterSaleTypeId(n),
        //     s = e.detail.formId,
        //     r = t.ToTrim(e.detail.value.txtBankName),
        //     u = t.ToTrim(e.detail.value.txtBankAccountName),
        //     d = t.ToTrim(e.detail.value.txtBankAccountNo),
        //     l = parseFloat(e.detail.value.txtmoney.replace("￥", "")),
        //     i = parseInt(t.data.ApplyReturnNum);
        // if (i <= 0 || i > t.data.ReturnNum) wx.showModal({
        //     title: "提示",
        //     content: "请输入正确的退货数量",
        //     showCancel: !1,
        //     confirmColor: "#db3c40"
        // });
        // else if (l > t.data.OneReundAmount * i) wx.showModal({
        //     title: "提示",
        //     content: "请输入正确的退款金额,金额必须小于等于" + t.data.OneReundAmount * i + "元",
        //     showCancel: !1,
        //     confirmColor: "#db3c40"
        // });
        // else {
        //     var f = e.detail.value.txtarea,
        //         c = t.data.RefundType;
        //     if (2 == c && (r.length <= 0 || u.length <= 0 || d.length <= 0)) wx.showModal({
        //         title: "提示",
        //         content: "银行卡信息不允许为空！",
        //         showCancel: !1,
        //         confirmColor: "#db3c40"
        //     });
        //     else if (c <= 0) wx.showModal({
        //         title: "提示",
        //         content: "请选择要退款的方式",
        //         showCancel: !1,
        //         confirmColor: "#db3c40"
        //     });
        //     else if (a < 0) wx.showModal({
        //         title: "提示",
        //         content: "请选择要退款的原因",
        //         showCancel: !1,
        //         confirmColor: "#db3c40"
        //     });
        //     else if (o < 0) wx.showModal({
        //         title: "提示",
        //         content: "请选择售后类型",
        //         showCancel: !1,
        //         confirmColor: "#db3c40"
        //     });
        //     else if (t.data.OrderId.length <= 0) wx.showModal({
        //         title: "提示",
        //         content: "请选择要退款的订单",
        //         showCancel: !1,
        //         confirmColor: "#db3c40"
        //     });
        //     else {
        //         t.setData({
        //             formId: s,
        //             AfterSaleTypeId: o,
        //             Remark: f,
        //             BankName: r,
        //             BankAccountName: u,
        //             BankAccountNo: d,
        //             ApplyReturnNum: i,
        //             ReturnMoney: l,
        //             UploadGredentials: []
        //         });
        //         var p = [];
        //         t.data.UserCredentials.find(function(e, t) {
        //             "../../images/return-img_03.jpg" != e && p.push(e);
        //         }), t.UploadBatchImages(t, p);
        //     }
        // }
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
                    "OK" == e.data.Status ? wx.showModal({
                        title: "提示",
                        confirmColor: "#db3c40",
                        content: e.data.Message,
                        showCancel: !1,
                        success: function(res) {
                            if (res.confirm) {
                                wx.redirectTo({
                                    url: "../usehome/usehome"
                                });
                            } else if (res.cancel) {
                                wx.redirectTo({
                                    url: "../usehome/usehome"
                                });
                            }
                            // wx.redirectTo({
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