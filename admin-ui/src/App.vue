<template>
  <router-view />
</template>

<script setup></script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    line-height: 1;
    background: #f5f5f5;
  }

  .breadcrumb {
    margin-bottom: 10px;
  }

  .tools {
    margin-bottom: 10px;
  }

  .pager {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @media screen and (max-width: 1024px) {
      justify-content: center;
    }
  }

  .dialog {
    width: 600px;
    @media screen and (max-width: 1024px) {
      width: 90%;
    }
    .el-form-item:last-child {
      margin-bottom: 0;
    }
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
