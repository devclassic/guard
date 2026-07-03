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
              <div class="info">设备名称1出现气体泄漏，请尽快处理</div>
            </div>
          </div>
          <div @click="router.push('/monitor')" class="item">
            <img src="../../assets/images/info-bell2.png" class="icon" />
            <div class="text">
              <div class="title">离线通知</div>
              <div class="info">目前3个设备已离线</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script setup>
  import Tabbar from '../shared/tabbar/Tabbar.vue'
  import { useRouter } from 'vue-router'
  import { useTabbarStore } from '../../stores/tabbar.js'

  const tabbarStore = useTabbarStore()
  tabbarStore.current = 1

  const router = useRouter()
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
