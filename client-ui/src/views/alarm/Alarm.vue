<template>
  <div class="page">
    <div @click="router.back" class="page-back"></div>
    <div class="page-title">告警记录</div>
    <div class="list scroll">
      <div v-for="item in state.list" @click="detail(item)" class="item">
        <div class="status">
          <div class="left">
            <div class="status1" :class="{ active: item.read }">
              {{ item.read ? '已处理' : '待处理' }}
            </div>
            <div class="status2" :class="`status2${item.alarmLevel}`">
              {{ status[item.alarmLevel] }}
            </div>
          </div>
          <div class="right">{{ format(new Date(item.recordTime), 'yyyy-MM-dd HH:mm:ss') }}</div>
        </div>
        <div class="name">
          <img src="../../assets/images/monitor-item-icon.png" class="icon" />
          <div>{{ item.name }}</div>
        </div>
        <div class="pos">
          <div class="icon"></div>
          <div class="text">{{ item.pos }}</div>
        </div>
        <div class="factor">
          <template v-if="item.alarmLevel === -1">设备离线</template>
          <template v-else>{{ item.factorName }}：{{ item.dataValue }}</template>
        </div>
        <div v-if="false" class="info">
          告警：AI告警判断原因和处理方案。尽量让ai处理在 30个字符内。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { showToast } from 'vant'
  import { useAxios } from '../../hooks/useAxios'
  import { onMounted, onUnmounted, reactive } from 'vue'
  import { format } from 'date-fns'
  import { useAlarmStore } from '../../stores/alarm'

  const state = reactive({
    list: [],
  })

  const status = {
    '1': '告警',
    '2': '预警',
    '3': '预警',
    '4': '告警',
    '-1': '离线',
    '-2': '告警',
  }

  let interval = null
  const router = useRouter()
  const http = useAxios()
  const alarmStore = useAlarmStore()

  const getData = async () => {
    const res = await http.post('/api/client/alarms')
    state.list = res.data.data
  }

  onMounted(async () => {
    await getData()
    interval = setInterval(getData, 5000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  const detail = item => {
    alarmStore.info = item
    router.push('/alarm/detail')
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
            &.status21 {
              background: #ffe2e6;
              color: #ff2742;
            }
            &.status22 {
              background: #feeedb;
              color: #fa9722;
            }
            &.status23 {
              background: #feeedb;
              color: #fa9722;
            }
            &.status24 {
              background: #ffe2e6;
              color: #ff2742;
            }
            &.status2-1 {
              background: #f5f5f5;
              color: #cccccc;
            }
            &.status2-2 {
              background: #ffe2e6;
              color: #ff2742;
            }
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
