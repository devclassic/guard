<template>
  <div class="page">
    <div class="main">
      <div class="box">
        <div class="top">
          <div class="left">济南孙村产业企业</div>
          <div class="right">
            <div class="search">
              <div class="text">搜索设备</div>
            </div>
            <div class="bell"></div>
          </div>
        </div>
        <div class="info">
          <div class="item">
            <div class="num">0</div>
            <div class="text">告警设备</div>
          </div>
          <div class="item">
            <div class="num">81</div>
            <div class="text">离线设备</div>
          </div>
          <div class="item">
            <div class="num">4</div>
            <div class="text">在线设备</div>
          </div>
          <div class="item">
            <div class="num">85</div>
            <div class="text">全部设备</div>
          </div>
        </div>
        <div class="tool">
          <div class="left">
            <div>设备状态</div>
            <div class="status"></div>
            <div class="text">正常运行</div>
          </div>
          <div class="right">
            <div class="btn btn1"></div>
            <div class="btn btn2"></div>
          </div>
        </div>
        <div ref="list" class="list scroll">
          <div class="item">
            <div class="info1">
              <div class="left">
                <img src="../../assets/images/monitor-item-icon.png" class="icon" />
                <div class="name">传感器名称</div>
              </div>
              <div class="right">
                <div class="status status2">离线</div>
                <div class="link">展开 ></div>
              </div>
            </div>
            <div class="info2">
              <div class="time">更新时间：2026-04-15 13:05:49</div>
              <div class="offline">
                <div class="icon"></div>
                <div class="text">设备离线，无数据</div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="info1">
              <div class="left">
                <img src="../../assets/images/monitor-item-icon.png" class="icon" />
                <div class="name">传感器名称</div>
              </div>
              <div class="right">
                <div class="status status1">正常</div>
                <div class="link">展开 ></div>
              </div>
            </div>
            <div class="info2">
              <div class="time">更新时间：2026-04-15 13:05:49</div>
              <div class="values">
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="info1">
              <div class="left">
                <img src="../../assets/images/monitor-item-icon.png" class="icon" />
                <div class="name">传感器名称</div>
              </div>
              <div class="right">
                <div class="status status1">正常</div>
                <div class="link">展开 ></div>
              </div>
            </div>
            <div class="info2">
              <div class="time">更新时间：2026-04-15 13:05:49</div>
              <div class="values">
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="info1">
              <div class="left">
                <img src="../../assets/images/monitor-item-icon.png" class="icon" />
                <div class="name">传感器名称</div>
              </div>
              <div class="right">
                <div class="status status1">正常</div>
                <div class="link">展开 ></div>
              </div>
            </div>
            <div class="info2">
              <div class="time">更新时间：2026-04-15 13:05:49</div>
              <div class="values">
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
                <div class="value">
                  <div class="icon"></div>
                  <div class="text">氧气：21.4%vol</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { nextTick, onMounted, reactive, useTemplateRef } from 'vue'
  import Tabbar from '../shared/tabbar/Tabbar.vue'

  const router = useRouter()

  const state = reactive({
    listRef: useTemplateRef('list'),
  })

  onMounted(async () => {
    await nextTick()
    const rect = state.listRef.getBoundingClientRect()
    state.listRef.style.cssText = `
      position: absolute;
      top: ${rect.top}px;
      bottom: 0;
    `
  })
</script>

<style scoped lang="scss">
  .main {
    background: url('../../assets/images/monitor-bg.png') no-repeat top center / 100% 3.6rem;
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
            margin: 0.15rem 0 0 0.6rem;
          }
        }
        .bell {
          width: 0.4rem;
          height: 0.4rem;
          background: url('../../assets/images/monitor-bell.png') no-repeat top center / 100% 100%;
          margin-left: 0.2rem;
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
      }
      .text {
        font-size: 0.24rem;
        text-align: center;
        margin-top: 0.3rem;
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
          background: url('../../assets/images/monitor-status.png') no-repeat center / 100% 100%;
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
        }
        .btn2 {
          background: url('../../assets/images/monitor-tool2.png') no-repeat center / 100% 100%;
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
            .link {
              font-size: 0.24rem;
              color: #005cdd;
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
                background: url('../../assets/images/monitor-value.png') no-repeat center / 100%
                  100%;
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
