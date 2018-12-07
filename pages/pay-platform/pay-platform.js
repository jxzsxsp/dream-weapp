import { $Page, $wx } from '../../genji4mp/index';
import { http, urls } from '../../net/index';
import env from '../../net/env';
import constants from '../../constants/index';

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
    if (this.data.weixin) {
      console.log('weixin');
      wx.login({
        success(res) {
          console.log(res);
          if (res.code) {
            _this.payByCode(res.code);
          }
        }
      })
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
  payByCode: function (jscode) {
    http.get(urls.signPay,
      {
        tradeId: this.data.orderNo,
        token: this.data.token,
        appId: constants.APP_GLOBAL.appId,
        domainName: constants.APP_GLOBAL.domainName,
        jscode: jscode,
      }).then(res => {
        console.log(res);
        this.requestPayment(res);
      });
  },
  requestPayment: function (res) {
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
  }
}


$Page.register(props, data, lifecycle, privateMethod, viewAction)