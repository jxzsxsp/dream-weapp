import { $wx, $Page } from '../../genji4mp/index'
import { http, urls } from '../../net/index'

const props = {
}

const data = {
  showYangKa: true,
  showMiYang: false,
  list: [1, 1, 1]
}

const lifecycle = {
  onLoad: function (query) {
  },
}

const privateMethods = {

}

const viewAction = {
  showYangKa: function() {
    this.setData({
      showYangKa: true,
      showMiYang: false,
    })
  },
  showMiYang: function () {
    this.setData({
      showYangKa: false,
      showMiYang: true,
    })
  }
}

$Page.register(props, data, lifecycle, privateMethods, viewAction)