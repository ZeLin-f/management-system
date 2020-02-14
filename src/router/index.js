import Vue from 'vue'
import Router from 'vue-router'
// 因为index.js和components文件夹并不处于同一级，因此需要..跳到上一级
import Login from '../components/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // 当访问根路径时让路由重定向到登录的路径
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login }
  ]
})
