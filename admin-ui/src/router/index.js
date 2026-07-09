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
        { path: '/admin', component: () => import('../views/admin/Admin.vue') },
        { path: '/user', component: () => import('../views/user/User.vue') },
      ],
    },
  ],
})

export default router
