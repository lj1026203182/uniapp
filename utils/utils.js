//  优化微信toast以及loading
export const ToastThenLoading = () => {
	let isShowLoading = false;
	let isShowToast = false;
	const { showLoading, hideLoading, showToast, hideToast } = wx;
	Object.defineProperty(wx, 'showLoading', {
		configurable: true, // 是否可以配置
		enumerable: true, // 是否可迭代
		writable: true, // 是否可重写
		value(...param) {
			if (isShowToast) { // Toast优先级更高
				return;
			}
			isShowLoading = true;
			return showLoading.apply(this, param); // 原样移交函数参数和this
		}
	});
	Object.defineProperty(wx, 'hideLoading', {
		configurable: true, // 是否可以配置
		enumerable: true, // 是否可迭代
		writable: true, // 是否可重写
		value(...param) {
			if (isShowToast) { // Toast优先级更高
				return;
			}
			isShowLoading = false;
			return hideLoading.apply(this, param); // 原样移交函数参数和this
		}
	});
	Object.defineProperty(wx, 'showToast', {
		configurable: true, // 是否可以配置
		enumerable: true, // 是否可迭代
		writable: true, // 是否可重写
		value(...param) {
			if (isShowLoading) { // Toast优先级更高
				wx.hideLoading();
			}
			isShowToast = true;
			return showToast.apply(this, param); // 原样移交函数参数和this
		}
	});
	Object.defineProperty(wx, 'hideToast', {
		configurable: true, // 是否可以配置
		enumerable: true, // 是否可迭代
		writable: true, // 是否可重写
		value(...param) {
			isShowToast = false;
			return hideToast.apply(this, param); // 原样移交函数参数和this
		}
	});
}

/**
 * @param {Function} func
 * @param {number} delay
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, delay = 500, immediate = true) {
	let timeout, args, context, timestamp, result;

	const later = function() {
		const last = +new Date() - timestamp;
		if (last < delay && last > 0) {
			timeout = setTimeout(later, delay - last);
		} else {
			timeout = null;
			if (!immediate) {
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			}
		}
	};

	return function(...args) {
		context = this;
		timestamp = +new Date();
		const callNow = immediate && !timeout;
		if (!timeout) timeout = setTimeout(later, delay);
		if (callNow) {
			result = func.apply(context, args);
			context = args = null;
		}
		return result;
	};
}

/**
 * @param {Function} func
 * @param {number} delay
 * @return {*}
 */
export function throttle(func, delay = 16) {
	let timer = null,
		startTime = Date.now();
	return function() {
		let curTime = Date.now();
		let remaining = delay - (curTime - startTime);
		let context = this;
		let args = arguments;
		clearTimeout(timer);
		if (remaining <= 0) {
			func.apply(context, args);
			startTime = Date.now();
		} else {
			timer = setTimeout(func, remaining);
		}
	};
}

export function timeFormat(timestamp = null, fmt = 'yyyy-mm-dd') {
	timestamp = parseInt(timestamp);
	if (timestamp == null) timestamp = Number(new Date());
	if (timestamp.toString().length == 10) timestamp *= 1000;
	let date = new Date(timestamp);
	let ret;
	let opt = {
		"y+": date.getFullYear().toString(), // 年
		"m+": (date.getMonth() + 1).toString(), // 月
		"d+": date.getDate().toString(), // 日
		"h+": date.getHours().toString(), // 时
		"M+": date.getMinutes().toString(), // 分
		"s+": date.getSeconds().toString() // 秒
	};
	for (let k in opt) {
		ret = new RegExp("(" + k + ")").exec(fmt);
		if (ret) {
			fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
		};
	};
	return fmt;
}
