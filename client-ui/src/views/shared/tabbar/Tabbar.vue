<template>
  <div class="tabbar">
    <div @click="change(0)" class="item" :class="{ active: tabbarStore.current === 0 }">
      <div class="icon icon1"></div>
      <div class="text">监控</div>
    </div>
    <div @click="change(1)" class="item" :class="{ active: tabbarStore.current === 1 }">
      <div class="icon icon2"></div>
      <div class="text">消息</div>
    </div>
    <div @click="change(2)" class="item" :class="{ active: tabbarStore.current === 2 }">
      <div class="icon icon3"></div>
      <div class="text">我的</div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useTabbarStore } from '../../../stores/tabbar'

  const props = defineProps(['current'])

  const router = useRouter()
  const tabbarStore = useTabbarStore()

  tabbarStore.current = props.current

  const change = index => {
    switch (index) {
      case 0:
        router.push('/monitor')
        break
      case 1:
        router.push('/info')
        break
      case 2:
        router.push('/mine')
        break
    }
    tabbarStore.current = index
  }
</script>

<style scoped lang="scss">
  .tabbar {
    width: 100%;
    height: 0.9rem;
    background: #ffffff;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      .icon {
        width: 0.55rem;
        height: 0.55rem;
        &.icon1 {
          background: url('../../../assets/images/tabbar-icon1.png') no-repeat center / 100% 100%;
        }
        &.icon2 {
          background: url('../../../assets/images/tabbar-icon2.png') no-repeat center / 100% 100%;
        }
        &.icon3 {
          background: url('../../../assets/images/tabbar-icon3.png') no-repeat center / 100% 100%;
        }
      }
      .text {
        color: #666666;
        font-size: 0.2rem;
        text-align: center;
      }
      &.active {
        .icon1 {
          background: url('../../../assets/images/tabbar-icon1a.png') no-repeat center / 100% 100% !important;
        }
        .icon2 {
          background: url('../../../assets/images/tabbar-icon2a.png') no-repeat center / 100% 100% !important;
        }
        .icon3 {
          background: url('../../../assets/images/tabbar-icon3a.png') no-repeat center / 100% 100% !important;
        }
        .text {
          color: #005cdd;
        }
      }
    }
  }
</style>
