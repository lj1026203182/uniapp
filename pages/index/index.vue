<template>
	<view>
		<UserInfoBtn></UserInfoBtn>
		<u-button type="primary" size="medium" @click="showModal">{{2312.3213213|toFixed()}}</u-button>
		<u-modal v-model="show" title="gun" show-cancel-button ref="modal"></u-modal>
		<iTabBar currentIndex="0"></iTabBar>
		<!-- <u-skeleton :loading="loading" animation bgColor="#FFF"></u-skeleton> -->
	</view>
</template>

<script>
	import { getOpenID } from '@/api/user.js'
	import UserInfoBtn from '@/components/userInfoBtn/userInfoBtn.vue'
	export default {
		data() {
			return {
				show: false,
				loading: true
			}
		},
		components: {
			UserInfoBtn

		},
		onLoad() {
			getOpenID().then(res => {
				console.log(this.$store.state.user.userInfo)
				// this.loading = false;
			})
		},
		methods: {
			showModal() {
				this.show = true
				this.$refs.modal.modalAction({
					confirm: () => {
						console.log(213)
					}
				})
			},
			nav(id){
				uni.navigateTo({
					url:`/subpages/page${id}/page${id}/page${id}`
				})
			}
		}
	}
</script>

<style>
	Page {
		background-color: #f7f7f7;
		padding-bottom: 200rpx;
	}
</style>
