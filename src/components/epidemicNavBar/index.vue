<template>
  <div class="epidemic-nav-bar">
    <van-nav-bar class="navbar" :border="false" :title="titleVal" left-arrow @click-left="back">
      <span slot="right" class="share-icon" />
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    isTitle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      titleVal: this.isTitle ? this.title ? this.title : this.$route.meta.title : ''
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .epidemic-nav-bar {

    ::v-deep .van-ellipsis {
      color: #FFF;
    }
  }
</style>
