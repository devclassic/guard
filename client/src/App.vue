<template>
  <RouterViewTransition :route-key="route.path" />
</template>

<script setup>
  import { useRoute } from 'vue-router'

  const route = useRoute()
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
    background-color: #f9f9f9;
    .main {
      width: 100%;
      position: absolute;
      top: 0;
      bottom: 0.9rem;
    }
  }
</style>
