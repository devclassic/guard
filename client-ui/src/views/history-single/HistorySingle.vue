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
      <div>时间：{{ state.startTime }} ～ {{ state.endTime }}</div>
    </div>
    <div v-if="false" class="info">
      <div class="row1">
        <div class="left">
          <div class="status status1">正常</div>
          <div class="value">CO2：1016.00 PPM</div>
        </div>
        <div class="right"></div>
      </div>
      <div class="row2">
        <div class="item">
          <div class="v1">CO2(PPM)</div>
          <div class="v2">近一天</div>
        </div>
        <div class="item">
          <div class="v1">416.00</div>
          <div class="v2">最小值</div>
        </div>
        <div class="item">
          <div class="v1">508.90</div>
          <div class="v2">平均值</div>
        </div>
        <div class="item">
          <div class="v1">1121.00</div>
          <div class="v2">最大值</div>
        </div>
      </div>
    </div>
    <div class="list scroll">
      <table v-if="state.list.length" class="table">
        <thead>
          <tr>
            <th>{{ state.list[0].data[0].registerName }}</th>
            <th @click="sort">
              <div>时间</div>
              <div class="sort"></div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in state.list">
            <td>{{ item.data[0].text }}</td>
            <td>{{ format(new Date(item.recordTime), 'yyyy-MM-dd HH:mm:ss') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { showToast, showLoadingToast, closeToast } from 'vant'
  import { onMounted, onUnmounted, reactive, useTemplateRef } from 'vue'
  import { format, subDays, subMonths, startOfDay, endOfDay } from 'date-fns'
  import { useAxios } from '../../hooks/useAxios'

  const state = reactive({
    list: [],
    startTime: '',
    endTime: '',
    select: 0,
    sort: 'asc',
    showDate: false,
    selectBgRef: useTemplateRef('selectBg'),
  })

  let interval = null
  const route = useRoute()
  const router = useRouter()
  const http = useAxios()

  const getRecentDays = days => {
    const now = new Date()
    const start = startOfDay(subDays(now, days))
    const end = endOfDay(now)
    state.startTime = format(new Date(start), 'yyyy-MM-dd HH:mm:ss')
    state.endTime = format(new Date(end), 'yyyy-MM-dd HH:mm:ss')
  }

  const sortByTime = (array, key, order) => {
    return [...array].sort((a, b) => {
      const timeA = new Date(a[key]).getTime()
      const timeB = new Date(b[key]).getTime()
      return order === 'desc' ? timeB - timeA : timeA - timeB
    })
  }

  const getData = async (loading = true) => {
    if (loading) showLoadingToast({ message: '加载中', duration: 0 })
    const res = await http.post('/api/client/history', {
      deviceAddr: route.query.addr,
      nodeId: route.query.node,
      startTime: state.startTime,
      endTime: state.endTime,
    })
    if (res.data.data) {
      state.list = sortByTime(res.data.data, 'recordTime', state.sort)
    }
    if (loading) closeToast()
  }

  const sort = async () => {
    if (state.sort === 'desc') {
      state.sort = 'asc'
    } else {
      state.sort = 'desc'
    }
    await getData()
  }

  onMounted(async () => {
    getRecentDays(1)
    await getData()
    interval = setInterval(async () => {
      await getData(false)
    }, 5000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  const select = async i => {
    state.select = i
    switch (state.select) {
      case 0:
        state.selectBgRef.style.left = '0'
        getRecentDays(1)
        await getData()
        break
      case 1:
        state.selectBgRef.style.left = '1.55rem'
        getRecentDays(7)
        await getData()
        break
      case 2:
        state.selectBgRef.style.left = '3.32rem'
        getRecentDays(30)
        await getData()
        break
      case 3:
        state.selectBgRef.style.left = '5.175rem'
        state.showDate = true
        break
    }
  }

  const onDate = async values => {
    const [start, end] = values
    state.startTime = format(new Date(start), 'yyyy-MM-dd HH:mm:ss')
    state.endTime = format(new Date(end), 'yyyy-MM-dd HH:mm:ss')
    state.showDate = false
    await getData()
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

  .info {
    width: 6.9rem;
    padding: 0.4rem 0.2rem;
    background: #ffffff;
    margin: 0.2rem auto 0;
    border-radius: 0.2rem;
    .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
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
        }
        .value {
          font-size: 0.3rem;
        }
      }
      .right {
        width: 0.4rem;
        height: 0.08rem;
        background: url('../../assets/images/detail-more.png') no-repeat center / 100% 100%;
      }
    }
    .row2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.36rem;
      .item {
        text-align: center;
        .v1 {
          font-size: 0.36rem;
        }
        .v2 {
          font-size: 0.26rem;
          margin-top: 0.26rem;
        }
        &:first-child {
          text-align: left;
        }
      }
    }
  }

  .list {
    width: 6.3rem;
    position: absolute;
    top: 3.2rem;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    display: flex;
    align-items: flex-start;
    .table {
      td {
        white-space: nowrap;
        text-align: left;
        padding: 0.08rem 0.5rem 0.08rem 0;
      }
      th {
        font-size: 0.26rem;
      }
      td {
        font-size: 0.24rem;
      }
      th:first-child {
        width: 2.7rem;
        text-align: left;
      }
      th:last-child {
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
