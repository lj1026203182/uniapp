import config from '../config/index.js'

const Upload = (url, img, data) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: config.baseUrl + url,
			filePath: img,
			name: 'fostFile',
			sizeType: "compressed",
			formData: data,
			header: {
				'content-type': 'multipart/form-data',
				'UID': wx.getStorageSync('userData').UID
			},
			success: (res) => {
				try {
					res.data = JSON.parse(res.data)
					if (res.data.code === 0) {
						resolve(res.data)
					} else {
						reject(res.data);
						wx.showToast({
							title: '图片上传失败',
							icon: 'none'
						})
					}
				} catch (err) {
					reject(err);
					wx.showToast({
						title: '图片上传失败',
						icon: 'none'
					})
				}
			},
			fail: (err) => {
				reject(err);
				wx.showToast({
					title: '图片上传失败',
					icon: 'none'
				})
			}
		})
	})
}

export default Upload