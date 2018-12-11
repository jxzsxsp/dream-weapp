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
    this.setData({ ...query });
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
      $wx.redirectTo($wx.router.payDaifu, {
        tradeId: this.data.tradeId,
        token: this.data.token,
      });
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
        tradeId: this.data.tradeId,
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
    console.log(res);
    let _this = this;
    wx.requestPayment({
      timeStamp: res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.packageValue,
      signType: res.signType,
      paySign: res.paySign,
      success: function (result) {
        console.log("pay successed ", result);
        $wx.redirectTo($wx.router.paySuccess, { 
          fee: _this.data.fee, 
          orderNo: _this.data.orderNo 
        });
        // http.getPay(urls.returnPay, {
        //   paymentId: paymentId, 
        //   token: _this.data.token }).then(res => {
        //   console.log(res);
        // });
      },
      fail: function (result) {
        console.log("pay failed ", result);
      },
      complete: function (result) {
        console.log("pay completed ", result);
      },
    })
  }
}


$Page.register(props, data, lifecycle, privateMethod, viewAction)