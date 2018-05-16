

class Http {
	constructor(opts) {
		this.root = process.env.API_HOST,
		this.isLoadingText = '数据加载中...请稍后！'
	}
	// get请求
	get (url, data, isLoading, opts) {
		url = this.root + url
		data = this.getQuestData(data);
		return this.request(url,data,'GET', isLoading);
	}
	// post请求
	post (url, data, isLoading, opts) {
		url = this.root + url
		data = this.getQuestData(data);
		return this.request(url,data,'POST', isLoading);
	}
	// 其他域名get请求
	otherGet (url, data, isLoading, opts) {
		return this.request(url,data,'GET', isLoading);
	}
	// 其他域名post请求
	otherPost (url, data, isLoading, opts) {
		return this.request(url,data,'POST', isLoading);
	}
	//  静默登录
	quietLogin (code) {
		var param = wx.getStorageSync('systemInfo');
		if(!param){
			this.saveSystemInfo();
			param = wx.getStorageSync('systemInfo');
		}
		param.data = {
			code: code
		}
		var url = '/login'
		console.log(this.post);
		this.post(url,param,true).then(res => {
			if(res.code == 200){
				wx.setStorageSync('token',res.data.token);
			}else if(res.code == -100){
				var pages = getCurrentPages()    //获取加载的页面
				var currentPage = pages[pages.length-1]    //获取当前页面的对象
				var url = currentPage.route
				wx.navigateTo({
					url: 'pages/mine/login/main?url=' + encodeURI(url)
				})
			}
		},res => {
			console.log(res);
		})
	}
	// request
	request (url, data, method, isLoading) {
		if(isLoading){
			wx.showLoading({
				title: (typeof isLoading == 'string')?isLoading:this.isLoadingText,
				mask: true
			})
		}
		return new Promise((resolve, reject) => {
			wx.request({
				url: url,
				method: "POST",
				data: data,
				success (res){
					reject(res || {});
				},
				fail (error){
					console.log('获取数据失败');
					resolve(error || {});
				},
				complete () {
					if(isLoading){
						wx.hideLoading();
					}
				}
			})
		})
	}
	// 封装和后端数据格式
	getQuestData (data) {
		var param = wx.getStorageSync('systemInfo') || {};
		param.data = data;
		return param;
	}
	// 获取时间戳＋6位随机数
	randomNub () {
		var getTime = new Date().getTime();
		var random = Math.floor(Math.random()*1000000);
		return getTime + '-' + random;
	}
	// 保存设备信息，为后端交互提供基础信息
	saveSystemInfo () {
		if(!wx.getStorageSync('systemInfo')){
			var systemInfo = wx.getSystemInfoSync();
			var param = {
				"platform": systemInfo.platform,
				"platformVersion": systemInfo.system,
				"deviceModel": systemInfo.model,
				"appType": 2,
				"appVersion": systemInfo.SDKVersion,
				"deviceId": systemInfo.brand + '-' + systemInfo.model + '-' + this.randomNub(),
			}
			wx.setStorageSync('systemInfo', param);
		}
	}
}

export default Http