import http from '@/utils/http'

class indexFuc {
    isGetOrderNum (token, lsUserInfo, statusCount){
        console.log('999999999999');
        token = wx.getStorageSync('token')
        lsUserInfo = wx.getStorageSync('lsUserInfo');
        var that = this;
        if(token){
        http.post('/buyer/trade/status/count/v1', {}, true, '')
        .then(
            function(resp){
                console.log(resp.data.statusCount);
                statusCount = resp.data.statusCount
                // wx.getStorageSync('statusCount',resp.data.statusCount);
            },
            function(resp){
                console.log(resp)
            }
        )}
    }
    lsLogout (){
        http.post('/buyer/user/mini-app/logout/v1', {}, true, '')
            .then(
            function(resp){
                wx.clearStorageSync("token")
                wx.clearStorageSync("lsUserInfo")
            },
            function(resp){
                console.log(resp)
            }
        )
    }
}  
export default indexFuc