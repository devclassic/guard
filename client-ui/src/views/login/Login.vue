<template>
  <div class="page">
    <div class="box">
      <div class="title">端点安环智控平台</div>
      <div class="slogan">AI智守 安环同行 全域可控</div>
      <div class="form">
        <div class="item">
          <div class="label">账号</div>
          <input type="text" placeholder="请输入账号" class="input" />
        </div>
        <div class="item">
          <div class="label">账号</div>
          <input type="text" placeholder="请输入密码" class="input" />
        </div>
      </div>
      <div @click="login" class="btn">登录</div>
      <div @click="guest" class="guest">体验账号登录</div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { useKeyboardScroll } from '../../hooks/useKeyboardScroll'

  useKeyboardScroll()

  const router = useRouter()

  const login = () => {
    router.push('/monitor')
  }

  const guest = () => {
    router.push('/monitor')
  }
</script>

<style scoped lang="scss">
  .page {
    background: url('../../assets/images/login-bg.png') no-repeat center / 100% 100%;
  }

  .box {
    width: 5.9rem;
    margin: 2.1rem auto 0;
    .title {
      font-size: 0.5rem;
      font-weight: bold;
    }
    .slogan {
      font-size: 0.28rem;
      margin-top: 0.2rem;
    }
    .form {
      margin-top: 0.2rem;
      .item {
        margin-top: 0.7rem;
        display: flex;
        flex-direction: column;
        .label {
          font-size: 0.32rem;
          font-weight: bold;
        }
        .input {
          width: 100%;
          height: 0.7rem;
          line-height: 0.7rem;
          margin-top: 0.1rem;
          font-size: 0.24rem;
          background: transparent;
          border: none;
          border-bottom: 1px solid #cccccc;
          outline: none;
          &::placeholder {
            color: #cccccc;
            opacity: 1;
          }
        }
      }
    }
    .btn {
      width: 3.3rem;
      height: 0.88rem;
      font-size: 0.3rem;
      color: #ffffff;
      margin-top: 0.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url('../../assets/images/login-btn.png') no-repeat center / 100% 100%;
    }
    .guest {
      margin-top: 0.45rem;
      font-size: 0.3rem;
      font-weight: bold;
    }
  }
</style>
