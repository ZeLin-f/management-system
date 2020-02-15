import Vue from 'vue'
import Router from 'vue-router'
// 因为index.js和components文件夹并不处于同一级，因此需要..跳到上一级
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    // 当访问根路径时让路由重定向到登录的路径
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})

// 挂载路由导航守卫
// 通过路由导航守卫控制权限，当用户未登录时（没有token），如果强行访问'/home',会跳转到'/login'
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next是一个函数，表示放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
