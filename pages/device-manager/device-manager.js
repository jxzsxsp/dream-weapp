import {$wx, $Page} from '../../genji4mp/index'

const viewAction = {
  connectClicked () {
    $wx.navigateTo($wx.router.connectDevice)
  },
  disconnectClicked: function () {
    $wx.closeBluetoothAdapter()
      .then(() => {
        this.setData({
          deviceConnected: false
        })
        getApp().resetDevice()
      })
  }
}

const data = {
  deviceConnected: false,
  deviceName: ''
}

const privateMethod = {

}

const lifecycle = {
  onShow() {
    this.setData({
      deviceConnected: getApp().globalData.deviceInfo.connected,
      deviceName: getApp().globalData.deviceInfo.deviceName
    })
  }
}

$Page(null, data, lifecycle, privateMethod, viewAction)