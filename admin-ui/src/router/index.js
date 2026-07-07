import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: () => import('../views/login/Login.vue') },
    {
      path: '/',
      component: () => import('../views/shared/layout/Layout.vue'),
      children: [
        { path: '/home', component: () => import('../views/home/Home.vue') },
        { path: '/example', component: () => import('../views/example/Example.vue') },
      ],
    },
  ],
})

export default router
