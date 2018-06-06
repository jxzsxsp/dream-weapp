import http from '@/utils/http'

/**
 * 经纬度转城市
 */
export function convertLocation(latitude, longitude) {
  return new Promise((resolve, reject) => {
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

