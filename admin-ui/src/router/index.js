import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: () => import('../views/login/Login.vue') },
    {
      path: '/',
      component: () => import('../views/shared/layout/Layout.vue'),
      children: [
        { path: '/home', component: () => import('../views/home/Home.vue') },
        { path: '/user/admin', component: () => import('../views/admin/Admin.vue') },
        { path: '/user/user', component: () => import('../views/user/User.vue') },
        { path: '/device/group', component: () => import('../views/group/Group.vue') },
        { path: '/system/config', component: () => import('../views/config/Config.vue') },
      ],
    },
  ],
})

export default router
