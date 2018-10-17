import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Login from '@/pages/login/Login'
import Sign from '@/pages/sign/Sign'
import Index from '@/pages/index/Index'
import CourseIndex from '@/pages/courseIndex/CourseIndex'
import Course from '@/pages/course/Course'
import CompetitionIndex from '@/pages/competitionIndex/CompetitionIndex'
import ExerciseIndex from '@/pages/exerciseIndex/ExerciseIndex'
import SourceIndex from '@/pages/sourceIndex/SourceIndex'
import TestIndex from '@/pages/testIndex/TestIndex'
import CourseDetail from '@/pages/courseDetail/CourseDetail'

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
  },
  {
    path: '/courseIndex',
    name: 'CourseIndex',
    component: CourseIndex
  },
  {
    path: '/course',
    name: 'Course',
    component: Course,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/competitionIndex',
    name: 'CompetitionIndex',
    component: CompetitionIndex,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/exerciseIndex',
    name: 'ExerciseIndex',
    component: ExerciseIndex,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/sourceIndex',
    name: 'SourceIndex',
    component: SourceIndex,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/testIndex',
    name: 'TestIndex',
    component: TestIndex,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/courseDetail',
    name: 'CourseDetail',
    component: CourseDetail,
    meta: {
      requireAuth: true
    }
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
      // if (store.state.username !== 'S') {
      //   window.location.href = 'http://192.168.2.251'
      // } else {
      //   this.$router.push('/sign')
      // }
      next()
    }
  } else {
    next()
  }
})
export default router
