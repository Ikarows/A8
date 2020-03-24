<template>
  <div class="news-detail">
    <h1 class="title">东京奥组委多名理事同意东京奥运推迟至2022年</h1>
    <div class="info">
      <img src="" class="userimg" alt="">
      <div class="right">
        <h1 class="username">詹姆斯邦德</h1>
        <p>19分钟前</p>
      </div>
    </div>
    <div class="content">
      据日本体育杂志《日刊体育》17日报道，就东京奥组委理事高桥治之提出的东京奥运会延期到2022年举行方案，已有多名奥组委理事表示同意。据称，奥组委理事会30日将召开会议讨论该问题。报道称，东京奥组委理事高桥治之早前在接受美国媒体采访时称，奥运会可以延期1年或2年举行。而的最新想法是改到2022年举行，这样夏季奥运会和冬季奥运会同年举办，2022年将成为引人注目的“奥运年”。
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .news-detail {
    padding: 12px 16px;

    .title {
      font-size: 18px;
      font-family: PingFangSC-Medium,PingFang SC;
      font-weight: 500;
      color:#202020;
      line-height: 25px;
    }

    .info {
      margin: 21px 0;
      display: flex;

      .userimg {
        width: 30px;
        height: 30px;
        background: #eee;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        margin-right: 6px;
      }

      .right {

        .username {
          font-size: 12px;
          font-family: PingFangSC-Regular,PingFang SC;
          font-weight: 400;
          color:#202020;
          line-height: 17px;
          margin-bottom: 3px;
        }

        p {
          font-size: 10px;
          font-family: PingFangSC-Regular,PingFang SC;
          font-weight: 400;
          color:#999;
          line-height: 12px;
        }
      }
    }

    .content {
      font-size: 16px;
      line-height: 28px;
    }
  }
</style>
