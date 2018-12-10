import { $Page, $wx } from '../../genji4mp/index';
import { http, urls } from '../../net/index';

const props = {
}

const data = {
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query);
    http.get(urls.scanPay,
      {
        tradeId: query.tradeId,
        token: query.token,
      }).then(res => {
        console.log(res);
        if (res.qr) {
          let imgUrl = "data:image/png;base64," + res.qr.replace(/[\r\n]/g, "");
          console.log(imgUrl);
          this.setData({ ...query, imgUrl: imgUrl });
        }
      });
  },
}

const viewAction = {
  preview: function(d, v) {
    $wx.previewImage({
      urls: [this.data.imgUrl],
    })
  }
}

const privateMethod = {
}


$Page.register(props, data, lifecycle, privateMethod, viewAction)