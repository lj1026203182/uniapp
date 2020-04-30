const toFixed = (val, num = 2) => Number(val).toFixed(num)

const install = Vue => {
	Vue.filter('toFixed', (val, num) => toFixed(val, num))
}

export default install
