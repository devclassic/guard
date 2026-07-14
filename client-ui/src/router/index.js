import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/login/Login.vue'
import Monitor from '../views/monitor/Monitor.vue'
import MonitorDetail from '../views/monitor-detail/MonitorDetail.vue'
import History from '../views/history/History.vue'
import HistorySingle from '../views/history-single/HistorySingle.vue'
import Info from '../views/info/Info.vue'
import Alarm from '../views/alarm/Alarm.vue'
import AlarmDtail from '../views/alarm-detail/AlarmDetail.vue'
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
      path: '/monitor/detail',
      component: MonitorDetail,
      meta: {
        transitions: {
          priority: -2,
          enter: 'slide-left',
          leave: 'slide-left-reverse',
        },
      },
    },
    {
      path: '/history',
      component: History,
      meta: {
        transitions: {
          priority: -3,
          enter: 'slide-left',
          leave: 'slide-left-reverse',
        },
      },
    },
    {
      path: '/history/single',
      component: HistorySingle,
      meta: {
        transitions: {
          priority: -3,
          enter: 'slide-left',
          leave: 'slide-left-reverse',
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
      path: '/alarm',
      component: Alarm,
      meta: {
        transitions: {
          priority: -3,
          enter: 'slide-left',
          leave: 'slide-left-reverse',
        },
      },
    },
    {
      path: '/alarm/detail',
      component: AlarmDtail,
      meta: {
        transitions: {
          priority: -4,
          enter: 'slide-left',
          leave: 'slide-left-reverse',
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
