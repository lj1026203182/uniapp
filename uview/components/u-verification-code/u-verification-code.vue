<template>
	<view class="u-code-wrap">

	</view>
</template>

<script>
	/**
	 * verificationCode 验证码输入框
	 * @description 考虑到用户实际发送验证码的场景，可能是一个按钮，也可能是一段文字，提示语各有不同，所以本组件 不提供界面显示，只提供提示语，由用户将提示语嵌入到具体的场景
	 * @tutorial https://www.uviewui.com/components/verificationCode.html
	 * @property {Number String} seconds 倒计时所需的秒数（默认60）
	 * @property {String} start-text 开始前的提示语，见官网说明（默认获取验证码）
	 * @property {String} change-text 倒计时期间的提示语，必须带有字母"x"，见官网说明（默认X秒重新获取）
	 * @property {String} end-text 倒计结束的提示语，见官网说明（默认重新获取）
	 * @event {Function} change 倒计时期间，每秒触发一次
	 * @event {Function} start 开始倒计时触发
	 * @event {Function} end 结束倒计时触发
	 * @example <u-verification-code :seconds="seconds" @end="end" @start="start" ref="uCode" 
	 */
	export default {
		name: "u-verification-code",
		props: {
			// 倒计时总秒数
			seconds: {
				type: [String, Number],
				default: 60
			},
			// 尚未开始时提示
			startText: {
				type: String,
				default: '获取验证码'
			},
			// 正在倒计时中的提示
			changeText: {
				type: String,
				default: 'X秒重新获取'
			},
			// 倒计时结束时的提示
			endText: {
				type: String,
				default: '重新获取'
			},
			// 是否在H5中，即使刷新也保存当前的倒计时
			// 暂不处理，看需求而定
		},
		data() {
			return {
				secNum: this.seconds,
				timer: null,
				canGetCode: true, // 是否可以执行验证码操作
			}
		},
		mounted() {
			this.changeEvent(this.startText);
		},
		methods: {
			// 开始倒计时
			start() {
				this.secNum = this.seconds;
				this.$emit('start');
				this.canGetCode = false;
				// 这里放这句，是为了一开始时就提示，否则要等setInterval的1秒后才会有提示
				this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
				this.timer = setInterval(() => {
					if (--this.secNum) {
						// 用当前倒计时的秒数替换提示字符串中的"x"字母
						this.changeEvent(this.changeText.replace(/x|X/, this.secNum));
					} else {
						clearInterval(this.timer);
						this.changeEvent(this.endText);
						this.secNum = this.seconds;
						this.$emit('end');
						this.canGetCode = true;
					}
				}, 1000);
			},
			// 重置，可以让用户再次获取验证码
			reset() {
				this.canGetCode = true;
				clearInterval(this.timer);
				this.secNum = this.seconds;
				this.changeEvent(this.endText);
			},
			changeEvent(text) {
				this.$emit('change', text);
			}
		},
		beforeDestroy() {
			clearTimeout(this.timer)
		},
	}
</script>

<style lang="scss" scoped>
	.u-code-wrap {
		width: 0;
		height: 0;
		position: fixed;
		z-index: -1;
	}
</style>
