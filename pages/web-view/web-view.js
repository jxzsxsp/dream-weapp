import { $Page, $wx } from '../../genji4mp/index';

const props = {
}

const data = {
  url: null
}

const lifecycle = {
  onLoad: function (query) {
    let url = decodeURIComponent(query.url)
    this.setData({
      url
    })
  },
}

const viewAction = {
}

const privateMethod = {
}


$Page.register(props, data, lifecycle, privateMethod, viewAction)