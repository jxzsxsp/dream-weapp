<template>
    <div class="container">
        <div class="location-top flex-style">
            <div class="flex"><i class="iconfont icon-zuobiao1 icon-margin"></i><span>{{cityName}}</span></div>
            <div class="flex col-red"><i class="iconfont icon-dingwei icon-margin"></i><span>定位城市</span></div>
        </div>
        <div class="location-middle">
            <div class="flex"><i class="label"></i>您所在的城市</div>
            <ul class="city-box">
              <li v-for="(order, index) in cityData" :key="index"  :class="cityData[index] == cityName? 'current':''">{{cityData[index]}}</li>
            </ul>
        </div>
        <div class="location-bottom">
          <button class="btn btn-danger btn-submit">确认</button>
          <div class="font-small-detail col-gray">客服电话：400-821-7111 (服务时间: 工作日9:00-18:00)</div>
        </div>
    </div>
  </template>
  
  <script>
  import form from '../../utils/getPermission'
  var getPermission = new form();  
  
  export default {
    data() {
      return ({
       latitude:'',
       longitude:'',
       cityName:'其他',
       cityData:['湖州','佛山','苏州','东莞','杭州','上海','深圳','其他']
      })
    },
    methods: {
  
    },
    onLoad () {
      getPermission.getLocation()
      .then((data)=>{
        console.log(data);
      })
    }
  }
  </script>
  <style>
   @import "../../css/common.css";

  .container{
    background:#fff;
    font-size:30rpx;
  }
  .location-top{
    height:98rpx;
    padding:0 20rpx;
    border-top:1rpx solid #eee;
    border-bottom:20rpx solid #eee;
  }
  .icon-margin{
    margin-right:10rpx;
  }
  .label{
    width:6rpx;
    height:29rpx;
    background:#EEB650;
    margin-right:14rpx;
  }
  .location-middle{
    padding:35rpx 0;
  }
  .city-box{
    display:flex;
    padding:20rpx 0;
    flex-wrap: wrap; 
  }
  .city-box li{
    width:29%;
    border:1rpx solid #999;
    border-radius:4rpx;
    margin-left:20rpx;
    text-align:center;
    margin-bottom:20rpx;
    line-height:70rpx;
  }
  .location-bottom{
    padding:0 20rpx;
    position:fixed;
    bottom:150rpx;
    width:94%;
  }
  .btn-submit{
    margin-bottom:50rpx;
  }
  .font-small-detail{
    text-align:center;
    font-size:25rpx;
  }
  .city-box .current{
    color:#CB3F3F;
    background: rgba(203,63,63,0.12);
    border: 1rpx solid #CB3F3F;

  }
  </style>
  