import Vue from 'vue'
import 'babel-polyfill'
import App from './App.vue'
import router from './src/core/router'
import store from './src/core/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({router, store, render: h => h(App)}).$mount('#app')
