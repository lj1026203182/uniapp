<template>
	<view class="user-info-container">
		<image class="user-info-img" :src="userInfo.Avatar||'../../static/logo.png'" mode="aspectFit"></image>
		<view class="user-info-wrapper">
			<button class="user-info-btn" v-if="!userInfo.Avatar" open-type="getUserInfo" @getuserinfo="mpGetUserInfo">
				点击授权信息
			</button>
			<view class="user-info-text" v-else>
				{{userInfo.NickName}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'userInfoBtn',
		data() {
			return {}
		},
		computed: {
			userInfo() {
				return this.$store.state.user.userInfo
			}
		},
		methods: {
			mpGetUserInfo(e) {
				if (e.detail.errMsg !== 'getUserInfo:ok') {
					wx.showToast({
						title: '取消授权',
						icon: 'none',
					})
					return;
				}
				const { nickName: NickName, avatarUrl: Avatar } = e.detail.userInfo
				this.$store.commit('setUserInfo', { NickName, Avatar })
			},
		}
	}
</script>

// 样式重置，这里的样式坑是必踩的
<style lang="scss" scoped>
	.user-info-container {
		width: calc(100% - 40upx);
		height: 200upx;
		display: flex;
		align-items: center;
		background-color: #fff;
		margin: 20upx auto;
		border-radius: 10upx;
		padding: 0 30upx;
	}

	.user-info-img {
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
		margin-right: 30upx;
	}
	
	.user-info-wrapper{
		flex: auto;
		font-size: 28upx;
		color: #333333;
		font-weight: bold;
	}

	.user-info-btn {
		width: 100%;
		justify-content: flex-start;
	}
</style>
