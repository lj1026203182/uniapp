import Request from '../utils/request.js'
import config from '../config/index.js'
import store from '../store/index.js'

export const getOpenID = () => {
	return new Promise((resolve, reject) => {
		uni.login({
			success: res => {
				Request({
					url: `${config.baseUrl}Login/getWxInfoR`,
					data:{Code:res.code}
				}).then(data => {
					store.commit('setUserInfo', data.data)
					resolve(data.data)
				})
			}
		});
	})
}

export const Login = data => {
	return Request({
		url: 'user/login',
		data
	})
}
