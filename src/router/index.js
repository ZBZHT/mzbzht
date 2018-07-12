import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Login from '@/pages/login/Login'
import Sign from '@/pages/sign/Sign'
import Index from '@/pages/index/Index'

Vue.use(Router)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/city',
    name: 'City',
    component: City
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]
const router = new Router({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (!store.state.username) {
      router.replace('/login')
    } else {
      if (store.state.username === 'S') {
        this.$router.push('/sign')
      } else {
        window.location.href = 'http://192.168.2.251'
      }
    }
  } else {
    next()
  }
})
export default router
