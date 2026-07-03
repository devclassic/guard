<template>
  <div class="page">
    <div @click="router.back" class="page-back"></div>
    <div class="page-title">设备名称</div>
    <div @click="state.showMenu = true" class="page-more"></div>
    <div class="info">
      <div class="left">
        <div class="icon"></div>
        <div class="text">设备位置：工厂西北角锅炉</div>
      </div>
      <div class="right">2026-04-15 13:05:49</div>
    </div>
    <div class="list scroll">
      <div class="item">
        <div class="wrap">
          <div class="left">
            <div class="status status1">正常</div>
            CO2：1016.00 PPM
          </div>
          <div class="right"></div>
        </div>
      </div>
      <div class="item">
        <div class="wrap">
          <div class="left">
            <div class="status status2">离线</div>
            甲烷(PPM)：无数据
          </div>
          <div class="right"></div>
        </div>
      </div>
      <div class="item">
        <div class="wrap">
          <div class="left">
            <div class="status status3">告警</div>
            甲烷(PPM)：无数据
          </div>
          <div class="right"></div>
        </div>
        <div class="text">告警：AI告警判断原因和处理方案。尽量让ai处理在 30个字符内。</div>
      </div>
    </div>
    <van-action-sheet v-model:show="state.showMenu" title="更多" round class="more-action-sheet">
      <div class="items">
        <div class="item">
          <div class="left">历史数据</div>
          <div class="right"></div>
        </div>
        <div class="item">
          <div class="left">告警记录</div>
          <div class="right"></div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { showToast } from 'vant'
  import { reactive } from 'vue'

  const state = reactive({
    showMenu: false,
  })

  const router = useRouter()
</script>

<style scoped lang="scss">
  .page {
    .page-back {
      width: 0.21rem;
      height: 0.39rem;
      background: url('../../assets/images/page-back.png') no-repeat center / 100% 100%;
      position: absolute;
      top: 0.65rem;
      left: 0.3rem;
    }
    .page-title {
      font-size: 0.34rem;
      font-weight: bold;
      position: absolute;
      top: 0.65rem;
      left: 50%;
      transform: translateX(-50%);
    }
    .page-more {
      width: 0.08rem;
      height: 0.4rem;
      background: url('../../assets/images/page-more.png') no-repeat center / 100% 100%;
      position: absolute;
      top: 0.65rem;
      right: 0.45rem;
    }
  }

  .info {
    width: 6.9rem;
    font-size: 0.24rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 1.65rem;
    left: 50%;
    transform: translateX(-50%);
    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 0.25rem;
        height: 0.28rem;
        background: url('../../assets/images/detail-pos.png') no-repeat center / 100% 100%;
      }
      .text {
        margin-left: 0.1rem;
      }
    }
  }

  .list {
    width: 6.9rem;
    position: absolute;
    top: 2.2rem;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    .item {
      padding: 0.4rem 0.2rem;
      border-radius: 0.2rem;
      background: #ffffff;
      margin-bottom: 0.2rem;
      .wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          font-size: 0.3rem;
          .status {
            width: 0.88rem;
            height: 0.42rem;
            font-size: 0.24rem;
            border-radius: 0.1rem;
            margin-right: 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            &.status1 {
              background: #ddf7f6;
              color: #02c3bc;
            }
            &.status2 {
              background: #f5f5f5;
              color: #cccccc;
            }
            &.status3 {
              background: #ffe2e6;
              color: #ff2742;
            }
          }
        }
        .right {
          width: 0.4rem;
          height: 0.08rem;
          background: url('../../assets/images/detail-more.png') no-repeat center / 100% 100%;
        }
      }
      .text {
        width: 6.3rem;
        margin: 0.3rem auto 0;
        padding: 0.25rem 0.2rem;
        background: #e8eefe;
        font-size: 0.26rem;
        border-radius: 0.2rem;
        line-height: 1.5;
      }
    }
  }

  :deep(.more-action-sheet) {
    width: calc(100% - 0.6rem);
    margin: 0 auto;
    left: 0;
    right: 0;
    color: #222222;
    .van-action-sheet__header {
      font-size: 0.32rem;
      font-weight: normal;
    }
    i {
      color: #222222;
    }
    .items {
      font-size: 0.3rem;
      padding: 0 0.15rem;
      .item {
        height: 1.2rem;
        padding: 0 0.2rem;
        border-bottom: 1px solid #e8e8e8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .right {
          width: 0.2rem;
          height: 0.36rem;
          background: url('../../assets/images/detail-arrow.png') no-repeat center / 100% 100%;
        }
      }
    }
  }
</style>
