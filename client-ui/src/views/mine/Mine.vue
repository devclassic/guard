<template>
  <div class="page">
    <div class="main">
      <div class="box">
        <div class="title">我的</div>
        <div class="list">
          <div @click="user" class="item">
            <img src="../../assets/images/mine-icon1.png" class="icon" />
            <div class="text">个人中心</div>
          </div>
          <div @click="version" class="item">
            <img src="../../assets/images/mine-icon2.png" class="icon" />
            <div class="text">关于版本</div>
          </div>
          <div @click="help" class="item">
            <img src="../../assets/images/mine-icon3.png" class="icon" />
            <div class="text">帮助中心</div>
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
  import { showToast } from 'vant'
  import { useTabbarStore } from '../../stores/tabbar.js'

  const tabbarStore = useTabbarStore()
  tabbarStore.current = 2

  const router = useRouter()

  const user = () => {
    router.push('/user')
  }

  const version = () => {
    showToast({
      message: '当前版本为内部开发版',
      duration: 3000,
    })
  }

  const help = () => {
    showToast({
      message: '进入个人中心获取平台销售联系方式',
      duration: 3000,
    })
  }
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
        padding: 0.25rem 0.25rem;
        background: #ffffff;
        margin-bottom: 0.2rem;
        border-radius: 0.2rem;
        display: flex;
        align-items: center;
        .icon {
          width: 0.65rem;
          height: 0.65rem;
        }
        .text {
          margin-left: 0.5rem;
          font-size: 0.3rem;
          font-weight: bold;
        }
      }
    }
  }
</style>
