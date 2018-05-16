

class Http {
	constructor(opts) {
		this.root = process.env.API_HOST	
	}
	//  静默登录
	quietLogin (code) {
		var param = wx.getStorageSync('systemInfo');
		param.data = {
			code: code
		}
		var url = this.root + '/login'
		wx.request({
			url: url,
			data: param,
			success (res){
				if(res.code == 200){
					wx.setStorageSync('token',res.data.token);
				}else if(res.code == -100){
					var pages = getCurrentPages()    //获取加载的页面
					var currentPage = pages[pages.length-1]    //获取当前页面的对象
					var url = currentPage.route
					wx.navigateTo({
						url: 'pages/mine/login?url=' + encodeURI(url)
					})
				}
			},
			fail (error){
				console.log('登录失败');
			}
		})
	}
	// 封装和后端数据格式
	getQuestData (data) {
		var param = wx.getStorageSync('systemInfo');
		param.data = data;
		return param;
	}
	// 保存设备信息，为后端交互提供基础信息
	saveSystemInfo (userInfo) {
		var systemInfo = wx.getSystemInfoSync();
		var param = {
			"platform": systemInfo.platform,
			"platformVersion": systemInfo.system,
			"deviceModel": systemInfo.model,
			"appType": 2,
			"appVersion": systemInfo.SDKVersion,
			"deviceId": systemInfo.brand + '-' + systemInfo.model + '-' + systemInfo.SDKVersion,
		}
		wx.setStorageSync('systemInfo', param);
	}
	// get请求
	get (url, data, isLoading, opts) {
		url = this.root + url
		data = this.getQuestData(data);
		return new Promise((resolve, reject) => {
			wx.request({
				url,
				data,
				// header,
				// method,
				success(res) {
					console.log('success')
					resolve(res)
				},
				fail(err) {
					reject(err)
				},
				complete(res) {

				}
			})
		})
	}
	post (url, data, isLoading, opts) {
		console.log(2);
	}
	otherGet (url, data, isLoading, opts) {
		console.log(3);
	}
	otherPost (url, data, isLoading, opts) {
		console.log(4);
	}
}

export default Http