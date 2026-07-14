<template>
  <div class="page">
    <div class="main">
      <div class="box">
        <div class="title">消息</div>
        <div class="list">
          <div @click="router.push('/alarm')" class="item">
            <img src="../../assets/images/info-bell1.png" class="icon" />
            <div class="text">
              <div class="title">设备告警</div>
              <div class="info">{{ state.info.alarm }}</div>
            </div>
          </div>
          <div @click="router.push({ path: '/monitor', query: { state: 4 } })" class="item">
            <img src="../../assets/images/info-bell2.png" class="icon" />
            <div class="text">
              <div class="title">离线通知</div>
              <div class="info">{{ state.info.offline }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Tabbar :current="1" />
  </div>
</template>

<script setup>
  import Tabbar from '../shared/tabbar/Tabbar.vue'
  import { useRouter } from 'vue-router'
  import { useAxios } from '../../hooks/useAxios.js'
  import { onMounted, onUnmounted, reactive } from 'vue'

  const state = reactive({
    info: {
      alarm: '正在获取...',
      offline: '正在获取...',
    },
  })

  let interval = null
  const router = useRouter()
  const http = useAxios()

  const getData = async () => {
    const res = await http.post('/api/client/info')
    const info = res.data.data
    state.info.alarm = `当前共 ${info.alarm} 条告警未处理`
    state.info.offline = `当前共 ${info.offline} 个设备离线`
  }

  onMounted(async () => {
    await getData()
    interval = setInterval(getData, 30000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })
</script>

<style scoped lang="scss">
  .box {
    width: 6.9rem;
    margin: 1.05rem auto 0;
    .title {
      font-size: 0.3rem;
    }
    .list {
      margin-top: 0.35rem;
      .item {
        padding: 0.35rem 0.3rem;
        background: #ffffff;
        margin-bottom: 0.2rem;
        border-radius: 0.2rem;
        display: flex;
        align-items: center;
        .icon {
          width: 0.73rem;
          height: 0.73rem;
        }
        .text {
          margin-left: 0.4rem;
          .title {
            font-size: 0.3rem;
            font-weight: bold;
          }
          .info {
            font-size: 0.24rem;
            margin-top: 0.2rem;
          }
        }
      }
    }
  }
</style>
