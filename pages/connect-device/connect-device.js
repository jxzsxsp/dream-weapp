import {$wx, $Page} from '../../genji4mp/index'
import constant from '../../constant/index';

const props = {
}

const data = {
  bluetoothOpened: true,
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

const bluetoothMethod = {
  // 开启搜索蓝牙
  openBluetoothAdapter() {
    $wx.openBluetoothAdapter()
      .then(() => {
        this.startBluetoothDevicesDiscovery()
      }).catch(res => {
        if (res.errCode === 10001) {
          this.setData({
            bluetoothOpened: false
          })
          $wx.onBluetoothAdapterStateChange(function (res) {
            if (res.available) {
              this.setData({
                bluetoothOpened: true
              })
              this.startBluetoothDevicesDiscovery()
            }
          })
        }
      })
  },

  // 搜索蓝牙
  startBluetoothDevicesDiscovery() {
    $wx.startBluetoothDevicesDiscovery({
      services: [constant.ColorSenseService],
    }).then(res => {
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
      const deviceName = res.devices[0].name
      $wx.createBLEConnection({deviceId})
        .then(res => {
          console.log('连接成功')
          const name = deviceName.split('-')
          getApp().globalData.deviceInfo.connected = true
          getApp().globalData.deviceInfo.deviceId = deviceId
          getApp().globalData.deviceInfo.deviceName = name[1]
          this.stopBluetoothDevicesDiscovery()
          this.getBLEDeviceServices(deviceId) 
        })
    })
  },
  
  // closeBLEConnection() {
  //   wx.closeBLEConnection({
  //     deviceId: this.data.deviceId
  //   })
  //   this.setData({
  //     connected: false,
  //     chs: [],
  //     canWrite: false,
  //   })
  // },
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
    $wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
    }).then(() => {
      let buffer = new ArrayBuffer(1)
      let dataView = new DataView(buffer)
      dataView.setUint8(0, Math.random() * 255 | 0)
      wx.writeBLECharacteristicValue({
        deviceId: deviceId,
        serviceId: serviceId,
        characteristicId: constant.HeartUUID,
        value: buffer,
      })
      // 定时发送心跳
      getApp().globalData.deviceInfo.heartTimer = setInterval(() => {
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

      $wx.showToast({title: '连接成功'})
        .then(() => {
          setTimeout(() => {
            $wx.navigateBack()
          }, 2000)
        })
    }).catch(res => {
      console.error('getbledevicecharacteristics', res)
    })
  }
    // 操作之前先监听，保证第一时间获取数据 获取数据
    // $wx.onBLECharacteristicValueChange((characteristic) => {
    //   console.log(characteristic)
      // const idx = inArray(this.data.chs, 'uuid', characteristic.characteristicId)
      // const data = {}
      // if (idx === -1) {
      //   data[`chs[${this.data.chs.length}]`] = {
      //     uuid: characteristic.characteristicId,
      //     value: ab2hex(characteristic.value)
      //   }
      // } else {
      //   data[`chs[${idx}]`] = {
      //     uuid: characteristic.characteristicId,
      //     value: ab2hex(characteristic.value)
      //   }
      // }
      // data[`chs[${this.data.chs.length}]`] = {
      //   uuid: characteristic.characteristicId,
      //   value: ab2hex(characteristic.value)
      // }
      // this.setData(data)
  //   })
  // },
  // readBLECharacteristicValue() {
  //   $wx.readBLECharacteristicValue({
  //     deviceId: this.data.deviceId,
  //     serviceId: constant.ColorSenseService,
  //     characteristicId: constant.ColorUUID
  //   }).then(res => {
  //     console.log(res)
  //   })
  // },
}

const privateMethod = {
  ...bluetoothMethod
}

$Page(props, data, lifecycle, privateMethod, {})