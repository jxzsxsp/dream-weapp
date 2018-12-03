import { $Page, $wx } from '../../genji4mp/index'
import { http, urls, checkParam } from '../../net/index'

const props = {

}

const data = {
  itemId: 1,
  reportList: []
}

const lifecycle = {
  onLoad: function (query) {
    console.log(query);
    http.get(urls.viewReport, { mock: true, orderNo: query.orderNo }).then(res => {
      console.log(res);
      this.setData({
        reportList: res.list
      })
    })
  }
}

const viewAction = {
  onSwiperChange: function(d, v) {
    this.setData({
      itemId: v.currentItemId
    })
  },
  preview: function(d, v) {
    $wx.previewImage({
      urls: [d.url],
    })
  },
  left: function() {
    let itemId = this.data.itemId;
    if(itemId > 1) {
      itemId = itemId - 1;
      this.setData({ itemId: itemId });
    }
  },
  right: function () {
    let itemId = this.data.itemId;
    let length = this.data.reportList.length;
    if (itemId < length) {
      itemId = Number(itemId)  + 1;
      this.setData({ itemId: itemId });
    }
  },
}


$Page.register(props, data, lifecycle, null, viewAction)