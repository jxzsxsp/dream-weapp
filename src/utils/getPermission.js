import http from '@/utils/http'
// 获取各种权限
class GetPermission {
/**
 * 获取位置
 */
  getLocation() {
     return new Promise ((resolve, reject)=>{
        wx.getLocation({
            type: 'wgs84',
            success: (res)=> {
              let latitude = res.latitude
              let longitude = res.longitude
              resolve('1111')
              // var speed = res.speed
              // var accuracy = res.accuracy
              return new Promise ((resolve, reject)=>{
                http.otherGet('http://api.map.baidu.com/geocoder/v2/?ak=pUOppTMIdy47mW3SxxxqK1w6XdDnU4bw&location=' + latitude + ',' + longitude + '&output=json&pois=1')
                .then((opts) => {

                    resolve(opts.data.result.addressComponent.city)
                //   console.log(opts.data.result.addressComponent.city)
                //   cityName = opts.data.result.addressComponent.city
                //   wx.setStorageSync("cityName", opts.data.result.addressComponent.city)
                //   return {latitude:latitude, longitude:longitude, cityName:cityName}
                })
              })
            }
        }) 
    }) 
  }
}

export default GetPermission
