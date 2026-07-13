<template>
  <div class="page">
    <div @click="router.back" class="page-back"></div>
    <div class="page-title">告警详细</div>
    <div class="list scroll">
      <div class="item">
        <div class="status">
          <div class="left">
            <div class="status1" :class="{ active: alarmStore.info.read }">
              {{ alarmStore.info.read ? '已处理' : '待处理' }}
            </div>
            <div class="status2" :class="`status2${alarmStore.info.alarmLevel}`">
              {{ status[alarmStore.info.alarmLevel] }}
            </div>
          </div>
          <div class="right">
            {{ format(new Date(alarmStore.info.recordTime), 'yyyy-MM-dd HH:mm:ss') }}
          </div>
        </div>
        <div class="name">
          <img src="../../assets/images/monitor-item-icon.png" class="icon" />
          <div>{{ alarmStore.info.name }}</div>
        </div>
        <div class="pos">
          <div class="icon"></div>
          <div class="text">{{ alarmStore.info.pos }}</div>
        </div>
        <div class="factor">
          <template v-if="alarmStore.info.alarmLevel === -1">设备离线</template>
          <template v-else>
            {{ alarmStore.info.factorName }}：{{ alarmStore.info.dataValue }}
          </template>
        </div>
        <div v-if="alarmStore.info.alarmLevel !== -1 && state.md" class="info">
          <markdown-preview :source="state.md" class="md" />
        </div>
      </div>
    </div>
    <div v-if="!(alarmStore.info.read && alarmStore.info.alarmLevel === -1)" class="bottombar">
      <div
        v-if="alarmStore.info.alarmLevel !== -1"
        @click="ai"
        class="ai"
        :class="{ noread: alarmStore.info.read }">
        AI分析
      </div>
      <div
        v-if="!alarmStore.info.read"
        @click="read"
        class="btn"
        :class="{ noai: alarmStore.info.alarmLevel === -1 }">
        已处理
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { showToast } from 'vant'
  import { useAlarmStore } from '../../stores/alarm'
  import { useUserStore } from '../../stores/user'
  import { format } from 'date-fns'
  import { useAxios } from '../../hooks/useAxios'
  import { reactive } from 'vue'
  import { fetchEventSource } from '@microsoft/fetch-event-source'
  import MarkdownPreview from '@uivjs/vue-markdown-preview'
  import '@uivjs/vue-markdown-preview/markdown.css'

  const state = reactive({
    md: '',
  })

  const router = useRouter()
  const http = useAxios()
  const alarmStore = useAlarmStore()
  const userStore = useUserStore()

  const status = {
    '1': '告警',
    '2': '预警',
    '3': '预警',
    '4': '告警',
    '-1': '离线',
    '-2': '告警',
  }

  const ai = async () => {
    state.md = '思考分析中...'
    let result = ''
    const base = import.meta.env.VITE_BASE_URL ?? ''
    const ctrl = new AbortController()
    fetchEventSource(`${base}/api/client/ai`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': userStore.token,
      },
      body: JSON.stringify({ info: alarmStore.info }),
      signal: ctrl.signal,
      onmessage(event) {
        if (!event.data) return
        try {
          const parsed = JSON.parse(event.data)
          if (parsed.content) {
            result += parsed.content
            state.md = result
          } else if (parsed.done) {
            result = ''
          }
        } catch (e) {}
      },
    })
  }

  const read = async () => {
    const res = await http.post('/api/client/read', { record_id: alarmStore.info.recordId })
    if (res.data.success) {
      alarmStore.info.read = true
    }
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
    padding-bottom: 1.25rem;
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
        .md {
          background: transparent;
          padding: 0;
          margin: 0;
          font-size: 0.26rem;
        }
      }
    }
  }

  .bottombar {
    width: 100%;
    height: 1.25rem;
    background: #ffffff;
    border-top: 1px solid #e8e8e8;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.3rem;
    .ai {
      width: 2.33rem;
      height: 0.88rem;
      background: #f0f1f7;
      color: #4586ff;
      border-radius: 0.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      &.noread {
        width: 90%;
      }
    }
    .btn {
      width: 4.37rem;
      height: 0.88rem;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      background: url('../../assets/images/alarm-detail-btn.png') no-repeat center / 100% 100%;
      margin-left: 0.2rem;
      &.noai {
        width: 90%;
        margin-left: 0;
      }
    }
  }
</style>
