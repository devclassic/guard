<template>
  <el-card class="login">
    <template #header>端点安环智控管理平台</template>
    <el-form label-width="auto">
      <el-form-item label="账号">
        <el-input v-model="state.account" placeholder="请输入账号" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="state.passowrd" type="password" placeholder="请输入密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="footer">
        <el-button type="info">重置</el-button>
        <el-button @click="submit" type="primary">登录</el-button>
      </div>
    </template>
  </el-card>
</template>

<script setup>
  import { reactive } from 'vue'
  import { useRouter } from 'vue-router'
  import { useEventListener } from '@vueuse/core'

  const state = reactive({
    account: '',
    passowrd: '',
  })

  const router = useRouter()

  const submit = () => {
    router.push('/home')
  }

  useEventListener('keydown', e => {
    if (e.key === 'Enter') {
      submit()
    }
  })
</script>

<style scoped lang="scss">
  .login {
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @media screen and (max-width: 1024px) {
      width: 90%;
    }
    :deep(.el-form-item:last-child) {
      margin-bottom: 0;
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>
