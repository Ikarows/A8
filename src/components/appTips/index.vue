<template>
  <div v-if="$isApp()" class="app-tips">
    <van-button class="btn" @click="goApp">APP内打开</van-button>
  </div>
</template>

<script>
export default {
  methods: {
    goApp () {
      window.location.href = 'https://www.a8sport.com'
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-tips {

    .btn {
      width: 95px;
      height: 35px;
      font-size: 14px;
      padding: 5px;
      text-align: center;
      position: fixed;
      bottom: 25px;
      left: 0;
      right: 0;
      margin: 0 auto;
      background: #0241F9;
      color: #FFF;
      line-height: 24px;
      border-radius: 20px;
    }
  }
</style>
