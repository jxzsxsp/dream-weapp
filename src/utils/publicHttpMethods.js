import http from '@/utils/http'

/**
 * 经纬度转城市
 */
export function convertLocation(latitude, longitude) {
  return new Promise((resolve, reject) => {
    http.otherGet('https://api.map.baidu.com/geocoder/v2/?ak=GBFGB6jgPlXXP7eVpbglmyST2Qya0jXE&location=' + latitude + ',' + longitude + '&output=json&pois=1', '', true, '')
    .then((opts) => {
      if(opts.data.result.addressComponent.city==''){
        opts.data.result.addressComponent.city = '定位失败'
      }
      resolve({city: opts.data.result.addressComponent.city, latitude, longitude})
    }) 
  })
}

