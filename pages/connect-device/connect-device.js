import {$wx, $Page} from '../../genji4mp/index'

const data = {
  isAdjusting: false,
  currentStateText: '正在搜索设备',
  stepText: '请按下设备开关'
}

const lifecycle = {
  onLoad () {

  },

  onUnload () {

  }
}

const privateMethod = {
  // 搜索蓝牙
  openBluetoothAdapter() {
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('openBluetoothAdapter success', res)
        this.startBluetoothDevicesDiscovery()
      },
      fail: (res) => {
        if (res.errCode === 10001) {
          wx.onBluetoothAdapterStateChange(function (res) {
            console.log('onBluetoothAdapterStateChange', res)
            if (res.available) {
              this.startBluetoothDevicesDiscovery()
            }
          })
        }
      }
    })
  },

  cecece (obj) {
    console.log(obj)
  },

  // 搜索蓝牙
  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) {
      return
    }
    this._discoveryStarted = true
    wx.startBluetoothDevicesDiscovery({
      services: [ColorSenseService],
      success: (res) => {
        console.log('startBluetoothDevicesDiscovery success', res)
        this.onBluetoothDeviceFound()
      },
    })
  },
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery()
  },
  onBluetoothDeviceFound() {
    wx.onBluetoothDeviceFound((res) => {
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return
        }
        const foundDevices = this.data.devices
        const idx = inArray(foundDevices, 'deviceId', device.deviceId)
        const data = {}
        if (idx === -1) {
          this.data.devices[foundDevices.length] = device
        } else {
          this.data.devices[idx] = device
        }
        this.setData({devices: this.data.devices})
      })
    })
  },
  createBLEConnection(e) {
    const ds = e.currentTarget.dataset
    const deviceId = ds.deviceId
    const name = ds.name
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        this.setData({
          connected: true,
          name,
          deviceId,
        })
        this.getBLEDeviceServices(deviceId)
      }
    })
    this.stopBluetoothDevicesDiscovery()
  },
  closeBLEConnection() {
    wx.closeBLEConnection({
      deviceId: this.data.deviceId
    })
    this.setData({
      connected: false,
      chs: [],
      canWrite: false,
    })
  },
  // 获取设备的服务
  getBLEDeviceServices(deviceId) {
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].uuid === ColorSenseService) {
            this.getBLEDeviceCharacteristics(deviceId, ColorSenseService)
            return
          }
        }
      }
    })
  },
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)


        let buffer = new ArrayBuffer(1)
        let dataView = new DataView(buffer)
        dataView.setUint8(0, Math.random() * 255 | 0)
        wx.writeBLECharacteristicValue({
          deviceId: deviceId,
          serviceId: serviceId,
          characteristicId: '3A796671-B41B-4B54-A929-00F880C8833B',
          value: buffer,
        })

        setInterval(() => {
          let buffer = new ArrayBuffer(1)
          let dataView = new DataView(buffer)
          dataView.setUint8(0, Math.random() * 255 | 0)
          wx.writeBLECharacteristicValue({
            deviceId: deviceId,
            serviceId: serviceId,
            characteristicId: '3A796671-B41B-4B54-A929-00F880C8833B',
            value: buffer,
          })
        }, 30000
        )
      },
      fail(res) {
        console.error('getbledevicecharacteristics', res)
      }
    })
    // 操作之前先监听，保证第一时间获取数据 获取数据
    wx.onBLECharacteristicValueChange((characteristic) => {
      const idx = inArray(this.data.chs, 'uuid', characteristic.characteristicId)
      const data = {}
      if (idx === -1) {
        data[`chs[${this.data.chs.length}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      } else {
        data[`chs[${idx}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      }
      // data[`chs[${this.data.chs.length}]`] = {
      //   uuid: characteristic.characteristicId,
      //   value: ab2hex(characteristic.value)
      // }
      this.setData(data)
    })
  },
  readBLECharacteristicValue() {
    wx.readBLECharacteristicValue({
      deviceId: this.data.deviceId,
      serviceId: ColorSenseService,
      characteristicId: ColorUUID,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter()
    this._discoveryStarted = false
  },
}

$Page(null, data, lifecycle, null, {})