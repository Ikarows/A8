<template>
  <div class="news-list">
    <div class="column">
      <h1 class="title">体育动态实时播报</h1>
      <div class="steps">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-steps direction="vertical" :active="-1">
            <van-step v-for="(item, index) in list" :key="index">
              <div class="step-data" @click="toDetails(item.newsId)">
                <h3>{{ format(item.pubTime) }}</h3>
                <div class="box">
                  <p class="van-multi-ellipsis--l2">{{ item.title }}</p>
                  <small class="van-ellipsis">{{ item.summary }}</small>
                </div>
              </div>
            </van-step>
          </van-steps>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { news } from '@/api'

export default {
  props: {
    // 体育类型
    sportType: {
      required: true,
      type: [Number, String]
    },
    // 球队id
    teamId: {
      type: [Number, String],
      default: ''
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      current: '',
      pageSize: 20
    }
  },
  computed: {
    format () {
      return function (time) {
        return `${this.$moment(time).format('MMM Do')} ${this.$moment(time).format('LT')}`
      }
    }
  },
  methods: {
    onLoad () {
      const params = {
        sportType: this.sportType,
        teamId: this.teamId,
        current: this.current,
        pageSize: this.pageSize
      }
      news(params).then(res => {
        if (res.code === 200) {
          if (res.data.news.length > 0) {
            this.list.push.apply(this.list, res.data.news)
          }
          this.current = res.data.current

          // 加载状态结束
          this.loading = false

          // 数据全部加载完成
          if (res.data.news.length <= 0) {
            this.finished = true
          }
        }
      })
    },
    toDetails (id) {
      window.A8Show.goNews({ newsId: id })
    }
  }
}
</script>

<style lang="scss" scoped>
  .news-list {
    .column {
      margin: 0 12px 26px 12px;

      &:last-child {
        margin-bottom: 0;
      }

      .title {
        text-align: left;
        margin-bottom: 20px;
        font-size: 16px;
        line-height: 22px;
        color: $fontColor;
        font-weight: 500;
      }
    }

    .steps {

      .van-steps {
        padding-top: 0 !important;
        margin-top: -10px;
      }

      .van-steps--vertical {
        padding: 10px 10px 10px 32px;
      }

      h3 {
        font-size: 12px;
        font-family: PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color: $fontColor;
        line-height: 17px;
        margin-bottom: 5px;
      }

      .box {
        padding: 8px 12px;
        background: #F7F7F7;

        p {
          font-size: 14px;
          font-family: PingFangSC-Regular,PingFang SC;
          font-weight: 400;
          color:$fontColor;
          line-height: 20px;
          margin-bottom: 10px;
        }

        small {
          font-size: 12px;
          font-family: PingFangSC-Regular,PingFang SC;
          font-weight: 400;
          color:#999;
          line-height: 17px;
          display: block;
        }
      }

      ::v-deep .van-step__circle {
        width: 7px;
        height: 7px;
        background: #FFD101;
      }

      ::v-deep .van-step__icon--active,
      ::v-deep .van-step__title--active {
        color: #FFD101;
      }
    }

    ::v-deep .van-list__error-text,
    ::v-deep .van-list__finished-text,
    ::v-deep .van-list__loading {
      font-size: 12px;
      line-height: 28px;
    }
  }
</style>
