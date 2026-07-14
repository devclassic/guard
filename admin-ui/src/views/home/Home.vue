<template>
  <div class="box">
    <div><el-button @click="go" type="primary">进入云平台</el-button></div>
    <div>账号：{{ state.platform.account }}</div>
    <div>密码：{{ state.platform.password }}</div>
  </div>
</template>

<script setup>
  import { onMounted, reactive } from 'vue'
  import { useAxios } from '../../hooks/useAxios'

  const state = reactive({
    platform: {},
  })

  const http = useAxios()

  onMounted(async () => {
    const res = await http.post('/api/admin/home/info')
    state.platform = res.data.data
  })

  const go = () => {
    const a = document.createElement('a')
    a.target = '_blank'
    a.href = state.platform.url
    a.click()
  }
</script>

<style scoped lang="scss">
  .box {
    line-height: 1.5;
  }
</style>
