import http from '@/utils/http'

/**
 * 经纬度转城市
 */
export function convertLocation(latitude, longitude) {
  return new Promise((resolve, reject) => {
    http.otherGet('https://api.map.baidu.com/geocoder/v2/?ak=pUOppTMIdy47mW3SxxxqK1w6XdDnU4bw&location=' + latitude + ',' + longitude + '&output=json&pois=1', '', true, '')
    .then((opts) => {
      resolve({city: opts.data.result.addressComponent.city, latitude, longitude})
    }) 
  })
}

