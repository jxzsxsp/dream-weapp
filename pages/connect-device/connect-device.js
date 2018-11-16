import {$wx, $Page} from '../../genji4mp/index'
import constant from '../../constant/index';

const props = {
  _discoveryStarted: false
}

const data = {
  isAdjusting: false,
  currentStateText: '正在搜索设备',
  stepText: '请按下设备开关'
}

const lifecycle = {
  onLoad () {
    this.openBluetoothAdapter()
  },

  onUnload () {

  }
}

const privateMethod = {
  // 开启搜索蓝牙
  openBluetoothAdapter() {
    $wx.openBluetoothAdapter()
      .then(res => {
        console.log('openBluetoothAdapter success', res) 
        this.startBluetoothDevicesDiscovery()
      }).catch(res => {
        if (res.errCode === 10001) {
          //TODO: 显示要打开蓝牙
          $wx.onBluetoothAdapterStateChange(function (res) {
            console.log('onBluetoothAdapterStateChange', res)
            if (res.available) {
              this.startBluetoothDevicesDiscovery()
            }
          })
        }
      })
  },


  // 搜索蓝牙
  startBluetoothDevicesDiscovery() {
    if (this.props._discoveryStarted) {
      return
    }
    this.props._discoveryStarted = true
    $wx.startBluetoothDevicesDiscovery({
      services: [constant.ColorSenseService],
    }).then(res => {
      console.log('startBluetoothDevicesDiscovery success', res)
      this.onBluetoothDeviceFound()
    })
  },

  // 停止搜索蓝牙
  stopBluetoothDevicesDiscovery() {
    $wx.stopBluetoothDevicesDiscovery()
  },

  // 找到蓝牙
  onBluetoothDeviceFound() {
    $wx.onBluetoothDeviceFound((res) => {
      console.log('找到蓝牙设备',res)
      const deviceId = res.devices[0].deviceId
      $wx.createBLEConnection({deviceId})
        .then(res => {
          console.log('连接成功')
          this.getBLEDeviceServices(deviceId) 
        })
      // res.devices[0]
      // res.devices.forEach(device => {
      //   if (!device.name && !device.localName) {
      //     return
      //   }
      //   const foundDevices = this.data.devices
      //   const idx = inArray(foundDevices, 'deviceId', device.deviceId)
      //   const data = {}
      //   if (idx === -1) {
      //     this.data.devices[foundDevices.length] = device
      //   } else {
      //     this.data.devices[idx] = device
      //   }
      //   this.setData({devices: this.data.devices})
      // })
    })
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
    $wx.getBLEDeviceServices({
      deviceId,
    }).then(res => {
      for (let i = 0; i < res.services.length; i++) {
        if (res.services[i].uuid === constant.ColorSenseService) {
          this.getBLEDeviceCharacteristics(deviceId, constant.ColorSenseService)
          return
        }
      }
    })
  },

  // 获取特征值
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
    }).then(res => {
      console.log('getBLEDeviceCharacteristics success', res.characteristics)
      let buffer = new ArrayBuffer(1)
      let dataView = new DataView(buffer)
      dataView.setUint8(0, Math.random() * 255 | 0)
      wx.writeBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: constant.HeartUUID,
        value: buffer,
      })
      setInterval(() => {
        let buffer = new ArrayBuffer(1)
        let dataView = new DataView(buffer)
        dataView.setUint8(0, Math.random() * 255 | 0)
        wx.writeBLECharacteristicValue({
          deviceId: deviceId,
          serviceId: serviceId,
          characteristicId: constant.HeartUUID,
          value: buffer,
        })
      }, 30000)
    }).catch(res => {
      console.error('getbledevicecharacteristics', res)
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

$Page(props, data, lifecycle, privateMethod, {})