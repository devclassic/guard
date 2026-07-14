<template>
  <div class="page">
    <div class="search-box" :class="{ active: state.showSearch }">
      <div class="header">
        <div class="input-box">
          <input
            ref="search"
            v-model="state.search"
            @keydown.enter="searchSubmit"
            type="text"
            class="input" />
          <div @click="clear" class="clear"></div>
        </div>
        <div @click="cancel" class="cancel">取消</div>
      </div>
    </div>
    <div class="main">
      <div class="box">
        <div class="top">
          <div
            @click="state.showGroup = !state.showGroup"
            class="left"
            :class="{ active: state.showGroup }">
            <div class="text">{{ groupName }}</div>
            <div class="icon"></div>
          </div>
          <div class="right">
            <div @click="showSearch" class="search">
              <div class="text">{{ search }}</div>
            </div>
            <div class="bell" :class="{ active: state.nums.alarming > 0 }"></div>
          </div>
        </div>
        <div v-if="state.showGroup" class="group">
          <div
            v-for="(item, i) in state.groups"
            :key="item.id"
            class="item"
            :class="{ active: i === state.groupIndex }"
            @click="groupChange(i)">
            <div class="text">{{ item.name }}</div>
            <div class="select"></div>
          </div>
        </div>
        <div class="info">
          <div class="item">
            <div class="num">{{ state.nums.alarming }}</div>
            <div class="text">告警设备</div>
          </div>
          <div class="item">
            <div class="num">{{ state.nums.preAlarming }}</div>
            <div class="text">预警设备</div>
          </div>
          <div class="item">
            <div class="num">{{ state.nums.offline }}</div>
            <div class="text">离线设备</div>
          </div>
          <div class="item">
            <div class="num">{{ state.nums.online }}</div>
            <div class="text">在线设备</div>
          </div>
          <div class="item">
            <div class="num">{{ state.nums.all }}</div>
            <div class="text">全部设备</div>
          </div>
        </div>
        <div class="tool">
          <div @click="state.showMenu = !state.showMenu" class="left">
            <div>设备状态</div>
            <div class="status" :class="`icon${state.stateMenuIndex}`"></div>
            <div class="text">{{ state.menus[state.stateMenuIndex] }}</div>
          </div>
          <div class="right">
            <div @click="openAll" class="btn btn1" :class="{ active: state.open }"></div>
            <div
              @click="state.showMenu = !state.showMenu"
              class="btn btn2"
              :class="{ active: state.showMenu }"></div>
          </div>
        </div>
        <div v-show="state.showMenu" class="menu">
          <div
            v-for="(item, i) in state.menus"
            :key="item"
            class="item"
            :class="{ active: i === state.stateMenuIndex }"
            @click="stateMenuChange(i)">
            <div class="title">
              <div class="icon" :class="`icon${i}`"></div>
              <div class="text">{{ item }}</div>
            </div>
            <div class="select"></div>
          </div>
        </div>
        <div ref="list" class="list scroll">
          <div v-for="item in state.list" :key="item.addr" class="item">
            <div class="info1">
              <div @click="detail" class="left">
                <img src="../../assets/images/monitor-item-icon.png" class="icon" />
                <div class="name">{{ item.name }}</div>
              </div>
              <div class="right">
                <div class="status" :class="item.deviceStatus">{{ status[item.deviceStatus] }}</div>
                <div @click="open(item)" class="link">
                  <div>{{ item.open ? '收起' : '展开' }}</div>
                  <div v-if="item.open" class="open"></div>
                  <div v-else class="close"></div>
                </div>
              </div>
            </div>
            <div v-if="item.open" class="info2">
              <div class="time">
                更新时间：{{ format(new Date(item.timeStamp), 'yyyy-MM-dd HH:mm:ss') }}
              </div>
              <template v-if="item.deviceStatus === 'offline'">
                <div v-if="item.open" class="offline">
                  <div class="icon"></div>
                  <div class="text">设备离线，无数据</div>
                </div>
              </template>
              <template v-else>
                <div class="values">
                  <template v-for="item1 in item.dataItem" :key="item1.nodeId">
                    <div v-for="item2 in item1.registerItem" :key="item2.registerId" class="value">
                      <div class="icon" :class="`icon${item2.alarmLevel}`"></div>
                      <div class="text">
                        {{ item2.registerName }}：{{ item2.data }} {{ item2.unit }}
                      </div>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Tabbar :current="0" />
  </div>
</template>

<script setup>
  import Tabbar from '../shared/tabbar/Tabbar.vue'
  import { useRoute, useRouter } from 'vue-router'
  import { format } from 'date-fns'
  import {
    computed,
    nextTick,
    onActivated,
    onDeactivated,
    onMounted,
    onUnmounted,
    reactive,
    useTemplateRef,
  } from 'vue'
  import { useAxios } from '../../hooks/useAxios.js'
  import { useTabbarStore } from '../../stores/tabbar.js'

  defineOptions({
    name: 'monitor',
  })

  const state = reactive({
    list: [],
    listState: [],
    menus: ['全部设备', '预警状态', '告警状态', '正常运行', '离线状态', '在线设备'],
    search: '',
    open: false,
    groups: [],
    groupIndex: 0,
    groupId: 0,
    stateMenuIndex: 0,
    nums: {
      normal: 0,
      alarming: 0,
      preAlarming: 0,
      offline: 0,
      all: 0,
    },
    showMenu: false,
    showGroup: false,
    showSearch: false,
    listRef: useTemplateRef('list'),
    searchRef: useTemplateRef('search'),
  })

  const route = useRoute()
  const router = useRouter()
  const http = useAxios()
  const tabbarStore = useTabbarStore()

  if (route.query.state) {
    state.stateMenuIndex = route.query.state
  }

  const status = {
    normal: '正常',
    alarming: '报警',
    preAlarming: '预警',
    offline: '离线',
  }

  const search = computed(() => {
    return state.search ? state.search : '搜索设备'
  })

  const showSearch = () => {
    state.showSearch = true
    state.searchRef.focus()
  }

  const searchSubmit = async () => {
    state.showSearch = false
    await getData()
  }

  const clear = () => {
    state.search = ''
    state.searchRef.focus()
  }

  const cancel = async () => {
    state.search = ''
    state.showSearch = false
    await getData()
  }

  const open = item => {
    item.open = !item.open
    state.listState = state.list.map(item => ({ open: item.open }))
  }

  const openAll = () => {
    state.open = !state.open
    state.list.forEach(item => {
      item.open = state.open
    })
    state.listState = state.list.map(item => ({ open: item.open }))
  }

  const getData = async () => {
    let res = await http.post('/api/client/groups')
    state.groups = [{ id: 0, name: '全部分组' }, ...res.data.data]
    const group_id = state.groups[state.groupIndex].id
    res = await http.post('/api/client/realtime', { group_id, search: state.search })
    const list = res.data.data
    state.nums.alarming = list.filter(item => item.deviceStatus === 'alarming').length
    state.nums.preAlarming = list.filter(item => item.deviceStatus === 'preAlarming').length
    state.nums.offline = list.filter(item => item.deviceStatus === 'offline').length
    state.nums.online = list.filter(item => item.deviceStatus !== 'offline').length
    state.nums.all = list.length
    const status = {
      1: 'preAlarming',
      2: 'alarming',
      3: 'normal',
      4: 'offline',
    }
    if (state.groupId === group_id) {
      state.listState.forEach((item, i) => {
        list[i].open = item.open
      })
    }
    state.groupId = group_id
    if (state.stateMenuIndex === 0) {
      state.list = list
    } else {
      if (state.stateMenuIndex === 5) {
        state.list = list.filter(item => item.deviceStatus !== 'offline')
      } else {
        state.list = list.filter(item => item.deviceStatus === status[state.stateMenuIndex])
      }
    }
  }

  const groupName = computed(() => {
    if (state.groups.length === 0) {
      return ''
    }
    return state.groups[state.groupIndex].name
  })

  const groupChange = async i => {
    state.showGroup = false
    state.groupIndex = i
    await getData()
  }

  const stateMenuChange = async i => {
    state.showMenu = false
    state.stateMenuIndex = i
    await getData()
  }

  let interval = null

  onMounted(async () => {
    await nextTick()
    const rect = state.listRef.getBoundingClientRect()
    state.listRef.style.cssText = `
      margin-top: 0;
      width: 6.9rem;
      position: absolute;
      top: ${rect.top}px;
      bottom: 0;
    `
    await getData()
    interval = setInterval(getData, 5000)
  })

  onUnmounted(() => {
    clearInterval(interval)
  })

  onActivated(async () => {
    tabbarStore.current = 0

    if (route.query.state) {
      state.stateMenuIndex = route.query.state
    }

    await getData()
    interval = setInterval(getData, 5000)
  })

  onDeactivated(() => {
    clearInterval(interval)
  })

  const detail = () => {
    router.push('/monitor/detail')
  }
</script>

<style scoped lang="scss">
  .search-box {
    position: absolute;
    top: 0.8rem;
    opacity: 0;
    transition: all 0.3s ease;
    width: 100%;
    height: 100%;
    background: #f4f6f8;
    z-index: -999;
    &.active {
      top: 0;
      opacity: 1;
      z-index: 999;
    }
    .header {
      height: 1.3rem;
      background: #ffffff;
      display: flex;
      .input-box {
        width: 6.07rem;
        height: 0.6rem;
        margin: 0.55rem 0 0 0.3rem;
        background: url('../../assets/images/monitor-search-input.png') no-repeat center / 100% 100%;
        position: relative;
        .input {
          width: 4.65rem;
          height: 0.3rem;
          border: 0;
          outline: 0;
          background: transparent;
          position: absolute;
          top: 50%;
          left: 0.6rem;
          transform: translateY(-50%);
          font-size: 0.26rem;
          color: #333333;
        }
        .clear {
          width: 0.4rem;
          height: 0.4rem;
          position: absolute;
          top: 0.1rem;
          right: 0.3rem;
        }
      }
      .cancel {
        font-size: 0.26rem;
        color: #005cdd;
        margin: 0.7rem 0 0 0.3rem;
      }
    }
  }

  .box {
    width: 6.9rem;
    margin: 0.9rem auto 0;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        font-size: 0.3rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        &.active {
          color: #005cdd;
        }
        .icon {
          width: 0.15rem;
          height: 0.1rem;
          background: url('../../assets/images/monitor-group-icon.png') no-repeat center / 100% 100%;
          margin-left: 0.1rem;
        }
        &.active {
          .icon {
            background: url('../../assets/images/monitor-group-icon-a.png') no-repeat center / 100%
              100%;
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        .search {
          width: 2.52rem;
          height: 0.6rem;
          background: url('../../assets/images/monitor-search.png') no-repeat top center / 100% 100%;
          .text {
            font-size: 0.26rem;
            color: #999999;
            margin: 0.15rem 0.35rem 0 0.6rem;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        .bell {
          width: 0.4rem;
          height: 0.4rem;
          background: url('../../assets/images/monitor-bell.png') no-repeat top center / 100% 100%;
          margin-left: 0.2rem;
          &.active {
            background: url('../../assets/images/monitor-bell-a.png') no-repeat top center / 100%
              100%;
          }
        }
      }
    }
    .info {
      margin-top: 0.8rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .item {
        font-size: 0.36rem;
        text-align: center;
        .num {
          font-size: 0.36rem;
          font-weight: bold;
        }
        .text {
          font-size: 0.24rem;
          text-align: center;
          margin-top: 0.3rem;
        }
      }
    }
    .tool {
      margin-top: 0.7rem;
      font-size: 0.26rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .status {
          width: 0.4rem;
          height: 0.4rem;
          margin-left: 0.3rem;
        }
        .text {
          margin-left: 0.1rem;
        }
      }
      .right {
        display: flex;
        .btn {
          width: 0.36rem;
          height: 0.36rem;
        }
        .btn1 {
          background: url('../../assets/images/monitor-tool1.png') no-repeat center / 100% 100%;
          margin-right: 0.2rem;
          &.active {
            background: url('../../assets/images/monitor-tool1a.png') no-repeat center / 100% 100%;
          }
        }
        .btn2 {
          background: url('../../assets/images/monitor-tool2.png') no-repeat center / 100% 100%;
          &.active {
            background: url('../../assets/images/monitor-tool2a.png') no-repeat center / 100% 100%;
          }
        }
      }
    }

    .icon0 {
      background: url('../../assets/images/monitor-status1.png') no-repeat center / 100% 100%;
    }
    .icon1 {
      background: url('../../assets/images/monitor-status2.png') no-repeat center / 100% 100%;
    }
    .icon2 {
      background: url('../../assets/images/monitor-status3.png') no-repeat center / 100% 100%;
    }
    .icon3 {
      background: url('../../assets/images/monitor-status4.png') no-repeat center / 100% 100%;
    }
    .icon4 {
      background: url('../../assets/images/monitor-status5.png') no-repeat center / 100% 100%;
      width: 0.35rem !important;
      height: 0.481rem !important;
    }
    .icon5 {
      background: url('../../assets/images/monitor-status6.png') no-repeat center / 100% 100%;
    }

    .group {
      width: 100%;
      margin-top: 0.1rem;
      position: absolute;
      left: 0;
      z-index: 100;
      background: #ffffff;
      padding-left: 0.3rem;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        border-bottom: 1px solid #e8e8e8;
        padding-right: 0.3rem;
        .text {
          font-size: 0.3rem;
        }
        .select {
          width: 0.3rem;
          height: 0.26rem;
          background: url('../../assets/images/monitor-status-a.png') no-repeat center / 100% 100%;
          display: none;
        }
        &:last-child {
          border: 0;
        }
        &.active {
          .select {
            display: block;
          }
          .text {
            color: #005cdd;
          }
        }
      }
    }

    .menu {
      width: 100%;
      margin-top: 0.1rem;
      position: absolute;
      left: 0;
      z-index: 100;
      background: #ffffff;
      padding: 0 0.15rem;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        border-bottom: 1px solid #e8e8e8;
        padding: 0 0.25rem;
        .title {
          display: flex;
          align-items: center;
          .icon {
            width: 0.4rem;
            height: 0.4rem;
          }
          .text {
            margin-left: 0.3rem;
            font-size: 0.3rem;
          }
        }
        .select {
          width: 0.3rem;
          height: 0.26rem;
          background: url('../../assets/images/monitor-status-a.png') no-repeat center / 100% 100%;
          display: none;
        }
        &:last-child {
          border: 0;
        }
        &.active {
          .select {
            display: block;
          }
        }
      }
    }
    .list {
      margin-top: 0.3rem;
      .item {
        background: #ffffff;
        border-radius: 0.2rem;
        padding: 0.4rem 0.3rem 0.4rem 0.2rem;
        margin-bottom: 0.2rem;
        .info1 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            display: flex;
            align-items: center;
            .icon {
              width: 0.47rem;
              height: 0.47rem;
            }
            .name {
              font-size: 0.3rem;
              margin-left: 0.1rem;
              font-weight: bold;
            }
          }
          .right {
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
              &.normal {
                background: #ddf7f6;
                color: #02c3bc;
              }
              &.alarming {
                background: #ffe2e6;
                color: #ff2742;
              }
              &.preAlarming {
                background: #feeedb;
                color: #fa9722;
              }
              &.offline {
                background: #f5f5f5;
                color: #cccccc;
              }
            }
            .link {
              font-size: 0.24rem;
              color: #005cdd;
              display: flex;
              align-items: center;
              .close {
                width: 0.1rem;
                height: 0.2rem;
                margin-left: 0.08rem;
                background: url('../../assets/images/monitor-close.png') no-repeat center / 100%
                  100%;
              }
              .open {
                width: 0.18rem;
                height: 0.1rem;
                margin-left: 0.08rem;
                background: url('../../assets/images/monitor-open.png') no-repeat center / 100% 100%;
              }
            }
          }
        }
        .info2 {
          .time {
            font-size: 0.24rem;
            margin-top: 0.15rem;
          }
          .offline {
            display: flex;
            align-items: center;
            margin-top: 0.35rem;
            .icon {
              width: 0.3rem;
              height: 0.3rem;
              background: url('../../assets/images/monitor-offline.png') no-repeat center / 100%
                100%;
            }
            .text {
              font-size: 0.26rem;
              margin-left: 0.2rem;
            }
          }
          .values {
            margin-top: 0.35rem;
            color: #222222;
            display: table;
            clear: both;
            .value {
              width: 3.2rem;
              margin-top: 0.2rem;
              float: left;
              display: flex;
              &:nth-child(1),
              &:nth-child(2) {
                margin-top: 0;
              }
              .icon {
                width: 0.3rem;
                height: 0.3rem;
                flex-shrink: 0;
                &.icon0 {
                  background: url('../../assets/images/monitor-value0.png') no-repeat center / 100%
                    100%;
                }
                &.icon1 {
                  background: url('../../assets/images/monitor-value1.png') no-repeat center / 100%
                    100%;
                }
                &.icon2 {
                  background: url('../../assets/images/monitor-value2.png') no-repeat center / 100%
                    100%;
                }
                &.icon3 {
                  background: url('../../assets/images/monitor-value2.png') no-repeat center / 100%
                    100%;
                }
                &.icon4 {
                  background: url('../../assets/images/monitor-value1.png') no-repeat center / 100%
                    100%;
                }
                &.icon-2 {
                  background: url('../../assets/images/monitor-value1.png') no-repeat center / 100%
                    100%;
                }
              }
              .text {
                font-size: 0.26rem;
                margin-left: 0.2rem;
              }
            }
          }
        }
      }
    }
  }
</style>
