import { $Page, $wx } from '../../genji4mp/index';

const props = {
}

const data = {
  weixin: true,
  daifu: false,
  fee: "99.00"
}

const lifecycle = {
  onLoad: function (query) {
    let fee = query.fee;
    if (fee) {
      this.setData({ fee: fee });
    }
  },
}

const viewAction = {
  pay: function () {
    $wx.navigateTo($wx.router.paySuccess, { fee: this.data.fee })
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