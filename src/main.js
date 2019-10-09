import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Utils from './lib/Utils'
import Api from './api/api'
import router from './components/router';
// import Vconlose from 'vconsole'

import './assets/css/reset.css' //重写样式引入
import './assets/js/layout';
Vue.config.productionTip = false
Vue.prototype.$utils = Utils
Vue.prototype.$api = Api

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
// new Vconlose()

