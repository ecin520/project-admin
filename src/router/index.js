import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import {Message} from 'element-ui'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/basic/Login'),
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('../components/basic/404'),
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      meta: {
        title: '个人中心',
        requireAuth: true
      },
      component: () => import('../components/Home'),
      children: [
        {
          path: '/home-page',
          name: 'HomePage',
          component: () => import('../components/page/HomePage')
        },
        {
          path: '/user-page',
          name: 'UserPage',
          component: () => import('../components/page/management/UserPage')
        },
        {
          path: '/role-page',
          name: 'RolePage',
          component: () => import('../components/page/management/RolePage')
        },
        {
          path: '/permission-page',
          name: 'PermissionPage',
          component: () => import('../components/page/management/PermissionPage')
        },
        {
          path: '/access-log',
          name: 'AccessLog',
          component: () => import('../components/page/monitor/AccessLog')
        },
        {
          path: '/interface-call',
          name: 'InterfaceCall',
          component: () => import('../components/page/monitor/InterfaceCall')
        },
        {
          path: '/personal',
          name: '/permission',
          component: () => import('../components/page/Personal')
        },
        {
          path: '/document-api',
          name: 'DocumentApi',
          component: () => import('../components/page/tool/DocumentApi')
        }
      ]
    },
    {
      path: '/*',
      component: () => import('../components/basic/404')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!store.state.auth) {
      if (store.state.token) {
        next()
      } else {
        Message({message: '请登录', type: 'error'})
        store.dispatch('logout')
        next({ path: '/login' })
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
