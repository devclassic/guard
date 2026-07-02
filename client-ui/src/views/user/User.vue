<template>
  <div class="page">
    <div @click="router.back" class="back"></div>
    <div class="title">个人中心</div>
    <div class="list">
      <div class="item">
        <div class="wrap">
          <div class="left">账号</div>
          <div class="right">woaiwhr001</div>
        </div>
      </div>
      <div class="item">
        <div class="wrap nb">
          <div class="left">销售</div>
          <div class="right">王浩冉 13847253707</div>
        </div>
      </div>
      <div @click="repass" class="item mt">
        <div class="wrap nb">
          <div class="left">修改密码</div>
          <div class="right">
            <div class="arrow"></div>
          </div>
        </div>
      </div>
    </div>
    <div @click="logout" class="logout">退出登录</div>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  import { showToast } from 'vant'

  const router = useRouter()

  const repass = () => {
    showToast({
      message: '请联系平台销售修改',
      duration: 3000,
    })
  }

  const logout = () => {
    router.push('/login')
  }
</script>

<style scoped lang="scss">
  .page {
    .back {
      width: 0.21rem;
      height: 0.39rem;
      background: url('../../assets/images/page-back.png') no-repeat center / 100% 100%;
      position: absolute;
      top: 0.65rem;
      left: 0.3rem;
    }
    .title {
      font-size: 0.34rem;
      font-weight: bold;
      position: absolute;
      top: 0.65rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .list {
    margin: 1.65rem auto 0;
    font-size: 0.3rem;
    .item {
      height: 1rem;
      background: #ffffff;
      display: flex;
      align-items: center;
      &.mt {
        margin-top: 0.2rem;
      }
      .wrap {
        height: 100%;
        margin-left: 0.3rem;
        padding-right: 0.3rem;
        border-bottom: 1px solid #e8e8e8;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &.nb {
          border: 0;
        }
        .left {
          font-weight: bold;
        }
        .right {
          .arrow {
            width: 0.1rem;
            height: 0.2rem;
            background: url('../../assets/images/user-arrow.png') no-repeat center / 100% 100%;
          }
        }
      }
    }
  }

  .logout {
    font-size: 0.3rem;
    color: #005cdd;
    position: absolute;
    left: 50%;
    bottom: 1.35rem;
    transform: translateX(-50%);
  }
</style>
