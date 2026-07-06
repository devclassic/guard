<template>
  <div class="page">
    <div @click="router.back" class="page-back"></div>
    <div class="page-title">设备历史数据</div>
    <div class="select">
      <div ref="selectBg" class="bg"></div>
      <div @click="select(0)" class="item" :class="{ active: state.select === 0 }">近1天</div>
      <div @click="select(1)" class="item" :class="{ active: state.select === 1 }">近7天</div>
      <div @click="select(2)" class="item" :class="{ active: state.select === 2 }">近1个月</div>
      <div @click="select(3)" class="item" :class="{ active: state.select === 3 }">自定义</div>
    </div>
    <van-calendar v-model:show="state.showDate" type="range" @confirm="onDate" />
    <div class="time">
      <div class="icon"></div>
      <div>时间：2026-04-15 13:05:49 ～ 2026-04-16 13:05:49</div>
    </div>
    <div class="list scroll">
      <table class="table">
        <thead>
          <tr>
            <th>
              <div>时间</div>
              <div class="sort"></div>
            </th>
            <th>CO2(PPM)</th>
            <th>CO2(PPM)</th>
            <th>CO2(PPM)</th>
            <th>CO2(PPM)</th>
            <th>CO2(PPM)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2026-04-16 13:05:49</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
          </tr>
          <tr>
            <td>2026-04-16 13:05:49</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
          </tr>
          <tr>
            <td>2026-04-16 13:05:49</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
          </tr>
          <tr>
            <td>2026-04-16 13:05:49</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
          </tr>
          <tr>
            <td>2026-04-16 13:05:49</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
            <td>0.5</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { showToast } from 'vant'
  import { reactive, useTemplateRef } from 'vue'

  const state = reactive({
    select: 0,
    showDate: false,
    selectBgRef: useTemplateRef('selectBg'),
  })

  const router = useRouter()

  const select = i => {
    state.select = i
    switch (state.select) {
      case 0:
        state.selectBgRef.style.left = '0'
        break
      case 1:
        state.selectBgRef.style.left = '1.55rem'
        break
      case 2:
        state.selectBgRef.style.left = '3.32rem'
        break
      case 3:
        state.selectBgRef.style.left = '5.175rem'
        state.showDate = true
        break
    }
  }

  const onDate = values => {
    const [start, end] = values
  }
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

  .select {
    width: 6.9rem;
    height: 0.47rem;
    background: #ffffff;
    border-radius: 0.3rem;
    margin: 1.65rem auto 0;
    font-size: 0.26rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    .bg {
      width: 1.725rem;
      height: 100%;
      background: #005cdd;
      position: absolute;
      left: 0;
      z-index: 1;
      border-radius: 0.3rem;
      transition: all 0.3s ease;
    }
    .item {
      position: relative;
      z-index: 2;
      &.active {
        color: #ffffff;
      }
    }
  }

  .time {
    width: 6.9rem;
    display: flex;
    align-items: center;
    font-size: 0.24rem;
    margin: 0.26rem auto 0;
    .icon {
      width: 0.3rem;
      height: 0.3rem;
      background: url('../../assets/images/history-time.png') no-repeat center / 100% 100%;
      margin-right: 0.15rem;
    }
  }

  .list {
    width: 6.9rem;
    position: absolute;
    top: 3.2rem;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    display: flex;
    align-items: flex-start;
    .table {
      font-size: 0.24rem;
      th,
      td {
        white-space: nowrap;
        text-align: left;
        padding: 0.08rem 0.5rem 0.08rem 0;
      }
      th:first-child {
        padding: 0;
        vertical-align: center;
        display: flex;
        align-items: center;
        .sort {
          width: 0.3rem;
          height: 0.3rem;
          background: url('../../assets/images/history-sort.png') no-repeat center / 100% 100%;
          margin-left: 0.2rem;
        }
      }
    }
  }
</style>
