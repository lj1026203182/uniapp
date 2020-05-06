import config from '../config/index.js'

const requestList = {};

function addRequesKey(key) { //添加
	requestList[key] = true;
}

function removeRequestKey(key) { //删除
	delete requestList[key]
}

function hitRequestKey(key) { //查询
	return requestList[key]
}

const Request = ({ url, data, showLoading = true, method = "POST" }) => {
	showLoading && wx.showLoading({ title: '加载中...', mask: true })
	wx.showNavigationBarLoading()
	return new Promise((resolve, reject) => {
		if (hitRequestKey(url)) return;
		addRequesKey(url);

		uni.request({
			url: config.baseUrl + url,
			data: Object.assign({}, data),
			header: {
				UID: uni.getStorageSync('userInfo').UID
			},
			method: method,
			success: res => {
				if (res.data.code == 0) {
					resolve(res.data);
				} else {
					reject(res.data)
				}
			},
			fail: err => {
				console.log(err)
				wx.hideLoading()
				wx.showToast({
					title: err.msg || '请重试',
					icon: 'none'
				})
				reject()
			},
			complete: res => {
				removeRequestKey(url)
				wx.hideLoading()
				wx.hideNavigationBarLoading()
			}
		})
	})
}

export default Request
