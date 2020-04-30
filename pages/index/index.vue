<template>
	<view>
		<UserInfoBtn></UserInfoBtn>
		<u-button type="primary" size="medium" @click="showModal">{{2312.3213213|toFixed()}}</u-button>
		<u-modal v-model="show" title="gun" show-cancel-button ref="modal"></u-modal>
	</view>
</template>

<script>
	import { getOpenID } from '../../api/user.js'
	import UserInfoBtn from '../../components/userInfoBtn/userInfoBtn.vue'
	export default {
		data() {
			return {
				show: false
			}
		},
		components: {
			UserInfoBtn

		},
		onLoad() {
			getOpenID().then(res => {
				console.log(this.$store.state.user.userInfo)
			})
		},
		methods: {
			showModal() {
				this.show = true
				this.$refs.modal.modalAction({
					confirm:()=>{
						console.log(213)
					}
				})
			},
		}
	}
</script>

<style>
	Page {
		background-color: #f7f7f7;
	}
</style>
