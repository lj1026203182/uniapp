import Vue from 'vue'
import App from './App'
import store from './store'
import filter from 'filter/filter.js'
import iTabBar from 'components/iTabBar/iTabBar.vue'
import uView from "@/uview-ui";

Vue.use(uView).use(filter);

Vue.prototype.$store = store
Vue.component('iTabBar', iTabBar)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

app.$mount()

export default app
