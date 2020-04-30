import config from '../config/index.js'

const Request = ({ url, data, showLoading = true, method = "POST" }) => {
	showLoading && uni.showLoading({ title: '加载中...', mask: true })
	uni.showNavigationBarLoading()
	return new Promise((resolve, reject) => {
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
				uni.hideLoading()
				uni.showToast({
					title: err.msg || '请重试',
					icon: 'none'
				})
				reject()
			},
			complete: res => {
				uni.hideLoading()
				uni.hideNavigationBarLoading()
			}
		})
	})
}

export default Request
