<template>
	<view class="tabBar safe-area-inset-bottom">
		<view class="border_box">
			<view class="tabBar_miden_border"></view>
		</view>
		<view class="tabBar_list">
			<view v-for="(item,index) in tab_nav_list" :key="index" :class="{'tabBar_item':index!=2,'tabBar_item2':index==2}"
			 @click="cut_index(item)">
				<image :src="currentIndex==index?item.selectedIconPath:item.iconPath"></image>
				<view :class="{'tabBar_name':true,'nav_active':currentIndex == index}">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			currentIndex: {
				type: String,
				default: '0'
			}
		},
		data() {
			return {
				tab_nav_list: [{
					name: '首页',
					url: '/pages/index/index',
					iconPath: '/static/tabBar/1.png',
					selectedIconPath: '/static/tabBar/11.png'
				}, {
					name: '分类',
					url: '/pages/index/index',
					iconPath: '/static/tabBar/2.png',
					selectedIconPath: '/static/tabBar/22.png'
				}, {
					name: '推荐',
					url: '/pages/index/index',
					iconPath: '/static/tabBar/3.png',
					selectedIconPath: '/static/tabBar/33.png'
				}, {
					name: '购物车',
					url: '/pages/index/index',
					iconPath: '/static/tabBar/4.png',
					selectedIconPath: '/static/tabBar/44.png'
				}, {
					name: '我的',
					url: '/pages/center/center',
					iconPath: '/static/tabBar/5.png',
					selectedIconPath: '/static/tabBar/55.png'
				}],
			};
		},
		methods: {
			cut_index(item) {
				wx.switchTab({
					url: item.url
				})
			}
		}
	}
</script>

<style lang="scss">
	.tabBar {
		width: 100%;
		height: calc(98upx + env(safe-area-inset-bottom) / 2);
		background: #fff;
		border-top: 1px solid #E5E5E5;
		position: fixed;
		bottom: 0px;
		left: 0px;
		right: 0px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: calc(env(safe-area-inset-bottom) / 2);

		.tabBar_list {
			width: 86%;
			display: flex;
			justify-content: space-between;

			image {
				width: 48upx;
				height: 48upx;
				margin-bottom: 2upx
			}

			.tabBar_item {
				width: 68upx;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20upx;
				color: #969BA3;
			}

			.tabBar_item2 {
				width: 68upx;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20upx;
				color: #969BA3;
				margin-top: -20upx;
				position: relative;
				z-index: 101;

				image {
					width: 68upx;
					height: 68upx;
				}
			}
		}
	}

	.border_box {
		width: 100%;
		height: 98upx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		left: 0px;
		bottom: calc(50upx + env(safe-area-inset-bottom) / 2);
		z-index: 100;
		pointer-events: none;

		.tabBar_miden_border {
			width: 100upx;
			height: 50upx;
			border-top: 2upx solid #E5E5E5;
			border-radius: 50upx 50upx 0 0;
			/* 左上、右上、右下、左下 */
			background: #fff;
		}
	}

	.nav_active {
		color: #007AFF;
	}
</style>
