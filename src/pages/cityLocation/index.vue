<template>
  <div class="container">
    <div class="location-top flex-style">
      <div class="flex">
        <i class="iconfont icon-zuobiao1 icon-margin"></i>
        <span>{{cityName}}</span>
      </div>
      <div class="flex col-red">
        <i class="iconfont icon-dingwei icon-margin"></i>
        <span @click="getLocationSetting()">定位城市</span>
      </div>
    </div>
    <div class="location-middle">
      <div class="flex">
        <i class="label"></i>您所在的城市</div>
      <ul class="city-box">
        <li v-for="(order, index) in cityData" :key="index" :class="cityData[index].cityName == cityName? 'current':''" @click="changeCity(cityData[index].cityName, cityData[index].cityId)">
          {{ cityData[index].cityName }}
        </li>
        <li :class="cityId==1? 'current':'' " @click="changeCity('其他', 1)">其他</li>
      </ul>
    </div>
    <div class="location-bottom">
      <button open-type="getUserInfo" @click="goToRegister()" class="btn btn-danger btn-submit">确认</button>
      <div class="font-small-detail col-gray">客服电话：400-821-7111 (服务时间: 工作日9:00-18:00)</div>
    </div>
  </div>
</template>

<script>
  import {
    convertLocation
  } from '../../utils/publicHttpMethods'
  import authorize from '../../utils/authorize'

  export default {
    data() {
      return ({
        latitude: '',
        longitude: '',
        cityName: '其他',
        cityId: '1',
        //  330500,440600,320500,441900,330100,310100,440300,1
        cityData: [{
          cityName: '湖州',
          cityId: '330500'
        }, {
          cityName: '佛山',
          cityId: '440600'
        }, {
          cityName: '苏州',
          cityId: '320500'
        }, {
          cityName: '东莞',
          cityId: '441900'
        }, {
          cityName: '杭州',
          cityId: '330100'
        }, {
          cityName: '上海',
          cityId: '310100'
        }, {
          cityName: '深圳',
          cityId: '440300'
        }]
      })
    },
    methods: {
      getLocationSetting() {
        this.authorize(1)
      },
      changeCity(chooseCityName, chooseCityId) {
        this.cityName = chooseCityName
        this.cityId = chooseCityId
      },
      authorize(level) {
        authorize('getLocation', '链尚需要获取您的定位权限', level, 'userLocation')
          .then(data => {
            return convertLocation(data.latitude, data.longitude)
          }).then(data => {
            this.cityName = data.city.replace("市", "");
            this.latitude = data.latitude
            this.longitude = data.longitude
            for (var i = 0; i < this.cityData.length; i++) {
              if (this.cityData[i].cityName == this.cityName) {
                this.cityId = this.cityData[i].cityId
              }
            }
            console.log(this.cityId)
          })
      },
      goToRegister() {
        wx.getSetting({
          success: res => {
            if (res.authSetting["scope.userInfo"]) {
              wx.navigateTo({
                url: '/pages/mine/register/main?latitude='+this.latitude+'&longitude='+this.longitude+'&cityId='+this.cityId+''
              });
            }
          },
          fail: res => {
            
          }
        });

      }
    },
    onLoad() {
      this.authorize(0)
    }
  }

</script>
<style>
  @import "../../css/common.css";
  .container {
    background: #fff;
    font-size: 30rpx;
  }
  .location-top {
    height: 98rpx;
    padding: 0 20rpx;
    border-top: 1rpx solid #eee;
    border-bottom: 20rpx solid #eee;
  }
  .icon-margin {
    margin-right: 10rpx;
  }
  .label {
    width: 6rpx;
    height: 29rpx;
    background: #EEB650;
    margin-right: 14rpx;
  }
  .location-middle {
    padding: 35rpx 0;
  }
  .city-box {
    display: flex;
    padding: 20rpx 0;
    flex-wrap: wrap;
  }
  .city-box li {
    width: 29%;
    border: 1rpx solid #999;
    border-radius: 4rpx;
    margin-left: 20rpx;
    text-align: center;
    margin-bottom: 20rpx;
    line-height: 70rpx;
  }
  .location-bottom {
    padding: 0 20rpx;
    position: fixed;
    bottom: 150rpx;
    width: 94%;
  }
  .btn-submit {
    margin-bottom: 50rpx;
  }
  .font-small-detail {
    text-align: center;
    font-size: 25rpx;
  }
  .city-box .current {
    color: #CB3F3F;
    background: rgba(203, 63, 63, 0.12);
    border: 1rpx solid #CB3F3F;
  }
</style>
