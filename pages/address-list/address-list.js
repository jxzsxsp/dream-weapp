import { $Page, $wx } from '../../genji4mp/index'
import { http, urls } from '../../net/index';

const CHECKADDRESS = 1

const props = {
  loadStatus: http.defaultLoadingState(100),
  comeFrom: 0
}

const data = {
  addressList: []
}

const lifecycle = {
  onLoad: function (query) {
    this.props.comeFrom = query.comeFrom
    http.getList(urls.addressList, this.props.loadStatus, {mock: true}).then(res => {
      console.log(res)
      this.setData({
        addressList: res
      })
    })
  }
}

const viewAction = {
  // 选中地址
  onSelectAddress: function (d) {
    // 查看地址不做响应
    if (this.props.comeFrom === CHECKADDRESS) {
      return
    }
    $wx.navigateBack(1, {customerDetail: this.data.addressList[d.index]})
  },
  // 编辑地址
  editAddress: function (d) {
    $wx.navigateTo($wx.router.addressAdd, this.data.addressList[d.index])
    // $wx.navigateTo($wx.router.addressAdd)
  },
  // 设置默认地址
  setDefaultAddress: function (d) {
    http.post(urls.addressDefault, {id: this.data.addressList[d.index].id, mock: true})
      .then(() => {
        const addressList = this.data.addressList.map((item, index) => {
          if (index === d.index) {
            item.default = true
          } else {
            item.default = false
          }
          return item
        })
        this.setData({addressList})
      })
  },
  // 删除地址
  deleteAddress: function (d) {
    http.post(urls.deleteAddress, {id: this.data.addressList[d.index].id, mock: true})
      .then(() => {
        this.data.addressList.splice(d.index, 1)
        this.setData({addressList: this.data.addressList})
      })
  }
  
}


$Page.register(props, data, lifecycle, null, viewAction)