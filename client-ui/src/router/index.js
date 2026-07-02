import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/Login.vue'
import Monitor from '../views/monitor/Monitor.vue'
import Info from '../views/info/Info.vue'
import Mine from '../views/mine/Mine.vue'
import User from '../views/user/User.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    {
      path: '/login',
      component: Login,
      meta: {
        transitions: {
          priority: -1,
          enter: 'fade',
          leave: 'fade',
        },
      },
    },
    {
      path: '/monitor',
      component: Monitor,
      meta: {
        transitions: {
          priority: -1,
          enter: 'fade',
          leave: 'fade',
        },
      },
    },
    {
      path: '/info',
      component: Info,
      meta: {
        transitions: {
          priority: -1,
          enter: 'fade',
          leave: 'fade',
        },
      },
    },
    {
      path: '/mine',
      component: Mine,
      meta: {
        transitions: {
          priority: -1,
          enter: 'fade',
          leave: 'fade',
        },
      },
    },
    {
      path: '/user',
      component: User,
      meta: {
        transitions: {
          priority: -2,
          enter: 'slide-left',
          leave: 'slide-left-reverse',
        },
      },
    },
  ],
})

export default router
