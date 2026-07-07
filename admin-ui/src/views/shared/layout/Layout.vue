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
        <el-menu-item index="/example">示列页面</el-menu-item>
        <el-sub-menu index="2">
          <template #title>设备管理</template>
          <el-menu-item index="2-1">设备分组</el-menu-item>
          <el-menu-item index="2-2">设备列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>系统设置</template>
          <el-menu-item index="3-1">用户管理</el-menu-item>
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
            <span>管理员</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
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
  import { reactive, watchEffect } from 'vue'
  import { useRoute } from 'vue-router'
  import { useWindowSize } from '@vueuse/core'

  const state = reactive({
    showMenu: true,
  })

  const route = useRoute()

  const { width, height } = useWindowSize()

  watchEffect(() => {
    state.showMenu = width.value > 1024
  })

  const menu = () => {
    state.showMenu = !state.showMenu
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
