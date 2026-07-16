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
    <div class="list scroll">
      <table v-if="state.list.length" class="table">
        <thead>
          <tr>
            <th @click="sort">
              <div>时间</div>
              <div class="sort"></div>
            </th>
            <template v-for="item in state.list[0].items">
              <template v-for="item1 in item.data">
                <th>{{ item1.registerName }}</th>
              </template>
            </template>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in state.list">
            <tr>
              <td>{{ format(new Date(item.recordTime), 'yyyy-MM-dd HH:mm:ss') }}</td>
              <template v-for="item1 in item.items">
                <template v-for="item2 in item1.data">
                  <td>
                    {{ item2.text }}
                  </td>
                </template>
              </template>
            </tr>
          </template>
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
    loading && showLoadingToast({ message: '加载中', duration: 0 })
    const res = await http.post('/api/client/history', {
      deviceAddr: route.query.addr,
      nodeId: -1,
      startTime: state.startTime,
      endTime: state.endTime,
    })
    if (res.data.data) {
      const result = Object.entries(
        res.data.data.reduce((acc, item) => {
          const key = item.recordTime
          if (!acc[key]) acc[key] = []
          acc[key].push(item)
          return acc
        }, {}),
      ).map(([recordTime, items]) => ({
        recordTime: Number(recordTime),
        items: items.sort((a, b) => a.nodeId - b.nodeId),
      }))
      state.list = sortByTime(result, 'recordTime', state.sort)
    }
    loading && closeToast()
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
      th,
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
