import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/global.css'
// 导入图标
import './assets/fonts/iconfont.css'
// 导入axios
import axios from 'axios'
// 配置请求的根路径（接口基准地址）
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 把axios挂载到vue的原型对象上，每一个vue组件都可以访问$http从而通过$http利用axios发起ajax请求
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
