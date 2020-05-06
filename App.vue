<script>
	import { ToastThenLoading } from 'utils/utils.js'

	export default {
		onLaunch: function() {
			console.log('App Launch')
			ToastThenLoading()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {}
	}
</script>

<style lang="scss">
	@import "@/uview-ui/index.scss";
	@import "@/common/css/common.wxss";
</style>
