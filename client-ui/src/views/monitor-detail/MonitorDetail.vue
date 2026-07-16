<template>
  <div class="page">
    <div @click="router.back" class="page-back"></div>
    <div class="page-title">{{ state.data.name }}</div>
    <div @click="state.showMenu = true" class="page-more"></div>
    <div class="info">
      <div class="left">
        <div class="icon"></div>
        <div class="text">设备位置：{{ state.data.pos }}</div>
      </div>
      <div class="right">
        {{
          state.data.timeStamp ? format(new Date(state.data.timeStamp), 'yyyy-MM-dd HH:mm:ss') : ''
        }}
      </div>
    </div>
    <div class="list scroll">
      <div v-if="!state.data.dataItem" class="item">
        <div class="wrap">
          <div class="left">
            <div class="status status-2">离线</div>
            设备离线
          </div>
        </div>
      </div>
      <template v-else>
        <template v-for="item in state.data.dataItem" :key="item.nodeId">
          <div
            v-for="item1 in item.registerItem"
            :key="item1.registerId"
            @click="historySingle(item.nodeId)"
            class="item">
            <div class="wrap">
              <div class="left">
                <div class="status" :class="`status${item1.alarmLevel}`">
                  {{ status[item1.alarmLevel] }}
                </div>
                {{ item1.registerName }}：{{ item1.data }} {{ item1.unit }}
              </div>
              <div class="right"></div>
            </div>
          </div>
        </template>
      </template>
    </div>
    <van-action-sheet v-model:show="state.showMenu" title="更多" round class="more-action-sheet">
      <div class="items">
        <div @click="history" class="item">
          <div class="left">历史数据</div>
          <div class="right"></div>
        </div>
        <div @click="alarm" class="item">
          <div class="left">告警记录</div>
          <div class="right"></div>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { showToast, showLoadingToast, closeToast } from 'vant'
  import { onMounted, onUnmounted, reactive } from 'vue'
  import { useAxios } from '../../hooks/useAxios'
  import { format } from 'date-fns'

  const state = reactive({
    data: {},
    showMenu: false,
  })

  let interval = null
  const route = useRoute()
  const router = useRouter()
  const http = useAxios()

  const status = {
    '0': '正常',
    '1': '报警',
    '2': '预警',
    '3': '预警',
    '4': '报警',
    '-2': '报警',
  }

  const getData = async (loading = true) => {
    if (loading) showLoadingToast({ message: '加载中', duration: 0 })
    const res = await http.post('/api/client/realtime', { group_id: 0, addr: route.query.addr })
    state.data = res.data.data[0]
    if (loading) closeToast()
  }

  onMounted(async () => {
    await getData()
    interval = setInterval(async () => {
      await getData(false)
    }, 5000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  const history = () => {
    router.push({ path: '/history', query: { addr: route.query.addr } })
  }

  const historySingle = node => {
    router.push({ path: '/history/single', query: { addr: route.query.addr, node: node } })
  }

  const alarm = () => {
    router.push({ path: '/alarm', query: { addr: route.query.addr } })
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
            &.status0 {
              background: #ddf7f6;
              color: #02c3bc;
            }
            &.status1 {
              background: #ffe2e6;
              color: #ff2742;
            }
            &.status2 {
              background: #feeedb;
              color: #fa9722;
            }
            &.status3 {
              background: #feeedb;
              color: #fa9722;
            }
            &.status4 {
              background: #ffe2e6;
              color: #ff2742;
            }
            &.status-2 {
              background: #f5f5f5;
              color: #cccccc;
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
