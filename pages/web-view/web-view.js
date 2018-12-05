import { $Page, $wx } from '../../genji4mp/index';

const props = {
}

const data = {
  url: "https://m.lian-shang.cn"
}

const lifecycle = {
  onLoad: function (query) {
    let url = wx.getStorageSync("url");
    console.log(url);
    if (url) {
      wx.removeStorageSync("url");
      this.setData({ url: url });
    }
    console.log(this.data.url);
  },
}

const viewAction = {
}

const privateMethod = {
}


$Page.register(props, data, lifecycle, privateMethod, viewAction)