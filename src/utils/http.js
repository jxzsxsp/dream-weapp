

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
		return this.request(url, data,'POST', isLoading);
	}
	// 其他域名get请求
	otherGet (url, data, isLoading, opts) {
		return this.request(url,data,'GET', isLoading);
	}
	// 其他域名post请求
	otherPost (url, data, isLoading, opts) {
		return this.request(url,data,'POST', isLoading);
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
					if(res.data.code == 200){
						resolve(res.data || {});
					}else if(res.data.code == -100){
						var pages = getCurrentPages()    //获取加载的页面
						var currentPage = pages[pages.length-1]    //获取当前页面的对象
						var url = currentPage.route
						wx.navigateTo({
							url: 'pages/mine/login/main?url=' + encodeURI(url)
						})
					}else{
						wx.toast({
							title:res.data.message,
							icon:'none',
							mask:true
						})
					}
				},
				fail (error){
					console.log('获取数据失败');
					reject(error || {});
				},
				complete () {
					if(isLoading){
						wx.hideLoading();
					}
				}
			})
		})
	}
	//  静默登录
	quietLogin (code) {
		var data = {
			code: code
		}
		var url = '/login'
		this.post(url,data,true).then(res => {
			wx.setStorageSync('token',res.data.token);			
		},res => {
			console.log(res);
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