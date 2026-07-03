<template>
  <div class="page">
    <div @click="router.back" class="page-back"></div>
    <div class="page-title">设备告警</div>
    <div class="list scroll">
      <div class="item">
        <div class="status">
          <div class="left">
            <div class="status1">待处理</div>
            <div class="status2">告警</div>
          </div>
          <div class="right">2026-04-16 13:05:49</div>
        </div>
        <div class="name">
          <img src="../../assets/images/monitor-item-icon.png" class="icon" />
          <div>传感器名称</div>
        </div>
        <div class="pos">
          <div class="icon"></div>
          <div class="text">设备位置：工厂西北角锅炉</div>
        </div>
        <div class="factor">甲烷(PPM)：1121.00 PPM</div>
        <div class="info">告警：AI告警判断原因和处理方案。尽量让ai处理在 30个字符内。</div>
      </div>
      <div class="item">
        <div class="status">
          <div class="left">
            <div class="status1 active">已处理</div>
            <div class="status2">告警</div>
          </div>
          <div class="right">2026-04-16 13:05:49</div>
        </div>
        <div class="name">
          <img src="../../assets/images/monitor-item-icon.png" class="icon" />
          <div>传感器名称</div>
        </div>
        <div class="pos">
          <div class="icon"></div>
          <div class="text">设备位置：工厂西北角锅炉</div>
        </div>
        <div class="factor">甲烷(PPM)：1121.00 PPM</div>
        <div class="info">告警：AI告警判断原因和处理方案。尽量让ai处理在 30个字符内。</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { showToast } from 'vant'

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
  }

  .list {
    width: 6.9rem;
    position: absolute;
    top: 1.65rem;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    .item {
      padding: 0.4rem 0.3rem;
      margin-bottom: 0.2rem;
      background: #ffffff;
      border-radius: 0.2rem;
      .status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .status1 {
            width: 0.88rem;
            height: 0.42rem;
            background: #ffefdd;
            color: #ff8800;
            border-radius: 0.1rem;
            font-size: 0.24rem;
            display: flex;
            justify-content: center;
            align-items: center;
            &.active {
              color: #02c3bc;
              background: #ddf7f6;
            }
          }
          .status2 {
            width: 0.88rem;
            height: 0.42rem;
            background: #ffe2e6;
            color: #ff2742;
            border-radius: 0.1rem;
            font-size: 0.24rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 0.2rem;
          }
        }
        .right {
          font-size: 0.24rem;
        }
      }
      .name {
        display: flex;
        align-items: center;
        font-size: 0.3rem;
        margin-top: 0.4rem;
        .icon {
          width: 0.47rem;
          height: 0.47rem;
          margin-right: 0.1rem;
        }
      }
      .pos {
        display: flex;
        align-items: center;
        font-size: 0.24rem;
        margin-top: 0.2rem;
        .icon {
          width: 0.25rem;
          height: 0.28rem;
          background: url('../../assets/images/detail-pos.png') no-repeat center / 100% 100%;
        }
        .text {
          margin-left: 0.1rem;
        }
      }
      .factor {
        font-size: 0.36rem;
        margin-top: 0.4rem;
      }
      .info {
        margin-top: 0.3rem;
        padding: 0.3rem 0.2rem;
        border-radius: 0.2rem;
        background: #e8eefe;
        font-size: 0.26rem;
        color: #222222;
        line-height: 1.5;
      }
    }
  }
</style>
