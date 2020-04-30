const user = {
	state: {
		userInfo: {}
	},
	mutations: {
		setUserInfo(state, data) {
			let userInfo = uni.getStorageSync('userInfo')
			userInfo = { ...userInfo, ...data }
			uni.setStorageSync('userInfo', userInfo)
			state.userInfo = userInfo
		}
	},
	actions: {},
}

export default user
