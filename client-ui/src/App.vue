<template>
  <KeepAlive>
    <RouterViewTransition :route-key="route.path" />
  </KeepAlive>
</template>

<script setup>
  import { onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { showDialog } from 'vant'
  import { useUserStore } from './stores/user'
  import { useAxios } from './hooks/useAxios'

  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  const http = useAxios()

  let checkInterval = null

  const checkLogin = async () => {
    if (route.path === '/login') {
      return
    }
    const res = await http.post('/api/client/check')
    if (!res.data.success) {
      clearInterval(checkInterval)
      await showDialog({
        title: '提示',
        message: '登录已经过期',
      })
      router.push('/login')
    }
  }

  router.beforeEach((to, from, next) => {
    if (!userStore.token && to.path !== '/login') {
      router.push('/login')
    } else {
      if (to.path === '/login') {
        return next()
      }
      checkLogin()
      checkInterval = setInterval(checkLogin, 2000)
    }
    next()
  })

  onUnmounted(() => {
    clearInterval(checkInterval)
  })
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  html {
    font-size: calc(100vw / 7.5);
  }

  body {
    margin: 0;
    line-height: 1;
    color: #4a4a4a;
  }

  .scroll {
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    transform: translate3d(0, 0, 0);
  }

  .page {
    width: 100%;
    min-height: 100dvh;
    position: absolute;
    margin: 0 auto;
    background: #f9f9f9 url('./assets/images/page-bg.png') no-repeat top center / 100% 3.6rem;
    .main {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0.9rem;
    }
  }
</style>
