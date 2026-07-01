<template>
  <div class="page">
    <div class="main">我的</div>
    <Tabbar />
  </div>
</template>

<script setup>
  import Tabbar from '../shared/tabbar/Tabbar.vue'
  import { useRouter } from 'vue-router'

  const router = useRouter()
</script>

<style scoped lang="scss"></style>
