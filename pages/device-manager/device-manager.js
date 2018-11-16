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
        let deviceInfo = getApp().globalData.deviceInfo
        deviceInfo.connected = false
        deviceInfo.heartTimer = null
        deviceInfo.deviceId = ''
      })
  }
}

const data = {
  deviceConnected: false,
  deviceId: ''
}

const privateMethod = {

}

const lifecycle = {
  onShow() {
    this.setData({
      deviceConnected: getApp().globalData.deviceInfo.connected,
      deviceId: getApp().globalData.deviceInfo.deviceId
    })
  }
}

$Page(null, data, lifecycle, privateMethod, viewAction)