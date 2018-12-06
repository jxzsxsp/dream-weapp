import { $Page, $wx } from '../../genji4mp/index';
import { http, urls } from '../../net/index';
import env from '../../net/env';

const props = {
}

const data = {
  weixin: true,
  daifu: false,
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query);
    http.get(urls.createPayment, { orderNo: query.orderNo }).then(res => {
      console.log(res);
      let daifuUrl = env.Pay+urls.scanPay+"?token=" + res.token+"&tradeId="+res.orderNo;
      console.log(daifuUrl);
      this.setData({ ...res, fee: query.fee, daifuUrl: daifuUrl });
    });
  },
}

const viewAction = {
  pay: function () {
    let _this = this;
    //$wx.navigateTo($wx.router.paySuccess, { fee: this.data.fee })
    if (_this.data.weixin) {
      console.log('weixin');
      http.getPay(urls.signPay,
        {
          tradeId: _this.data.orderNo,
          token: _this.data.token
        }).then(res => {
          console.log(res);
          $wx.requestPayment({
            timeStamp: res.timeStamp,
            nonceStr: res.nonceStr,
            package: res.packageValue,
            signType: res.signType,
            paySign: res.paySign,
            success: function (result) {
              console.log("pay successed ", result);
              $wx.navigateTo($wx.router.paySuccess, { fee: _this.data.fee });
              // http.getPay(urls.returnPay, {
              //   paymentId: paymentId, 
              //   token: _this.data.token }).then(res => {
              //   console.log(res);
              // });
            },
            fail: function (result) {
              console.log("pay failed ", result);
            },
          })
        });
    } else if(this.data.daifu) {
      console.log('daifu');
      wx.setStorageSync("url", this.data.daifuUrl);
      $wx.navigateTo($wx.router.webView, {});
    }
  },

  onSelectPay: function (d) {

    this.setData({
      weixin: false,
      daifu: false,
      [d.type]: true,
    });

  },

}

const privateMethod = {
}


$Page.register(props, data, lifecycle, privateMethod, viewAction)