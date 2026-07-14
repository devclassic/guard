<template>
  <div class="layout">
    <div
      :style="{
        width: state.showMenu ? '200px' : 0,
      }"
      class="layout-left">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        :default-active="route.path"
        text-color="#fff"
        :router="true"
        class="menu">
        <el-menu-item index="/home">首页</el-menu-item>

        <el-sub-menu index="/device">
          <template #title>设备相关</template>
          <el-menu-item index="/device/group">设备分组</el-menu-item>
          <el-menu-item index="/device/device">设备管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/user">
          <template #title>用户管理</template>
          <el-menu-item index="/user/admin">后端用户</el-menu-item>
          <el-menu-item index="/user/user">前端用户</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="/system">
          <template #title>系统设置</template>
          <el-menu-item index="/system/config">项目配置</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </div>
    <div class="layout-right">
      <div class="header">
        <div @click="menu" class="left">
          <el-icon v-if="state.showMenu" color="#ffffff"><Fold /></el-icon>
          <el-icon v-if="!state.showMenu" color="#ffffff"><Expand /></el-icon>
        </div>
        <div class="right">
          <el-dropdown trigger="click" class="user">
            <span>{{ userStore.user.name }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onUnmounted, reactive, watchEffect } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useWindowSize } from '@vueuse/core'
  import { ElMessageBox } from 'element-plus'
  import { useUserStore } from '../../../stores/user'
  import { useAxios } from '../../../hooks/useAxios'

  const route = useRoute()
  const router = useRouter()
  const userStore = useUserStore()
  const http = useAxios()

  let checkInterval = null

  const checkLogin = async () => {
    if (route.path === '/login') {
      return
    }
    const res = await http.post('/api/admin/check')
    if (!res.data.success) {
      clearInterval(checkInterval)
      await ElMessageBox.alert('登录已经过期', '提示', {
        type: 'warning',
        callback() {
          router.push('/login')
        },
      })
    }
  }

  if (!userStore.token) {
    router.push('/login')
  } else {
    checkLogin()
    checkInterval = setInterval(checkLogin, 2000)
  }

  onUnmounted(() => {
    clearInterval(checkInterval)
  })

  const state = reactive({
    showMenu: true,
  })

  const { width, height } = useWindowSize()

  watchEffect(() => {
    state.showMenu = width.value > 1024
  })

  const menu = () => {
    state.showMenu = !state.showMenu
  }

  const logout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }
</script>

<style scoped lang="scss">
  .layout {
    display: flex;
    overflow: hidden;
    .layout-left {
      width: 200px;
      height: 100dvh;
      overflow: auto;
      transition: all 0.3s ease;
      .menu {
        min-height: 100%;
        border-right: 0;
      }
    }
    .layout-right {
      flex: 1;
      position: relative;
      .header {
        height: 56px;
        background: #545c64;
        padding: 0 30px 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          cursor: pointer;
        }
        .right {
          .user {
            span {
              color: #ffffff;
              cursor: pointer;
            }
          }
        }
      }
      .main {
        width: 100%;
        overflow: auto;
        padding: 10px;
        position: absolute;
        top: 56px;
        bottom: 0;
      }
    }
  }
</style>
