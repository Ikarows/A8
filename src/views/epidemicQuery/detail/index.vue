<template>
  <div class="epidemic-query-detail">

    <div class="header">

      <div class="total">
        <div class="content">
          <ul>
            <li v-for="(item, index) in count" :key="index">
              <p>{{ item.name }}</p>
              <h1>{{ item.count }}</h1>
            </li>
          </ul>
          <div class="tips van-hairline--top">
            数据说明：截止至 {{ dataTime }}  数据来源为网络平台
          </div>
        </div>
      </div>
    </div>

    <div class="column">
      <h1 class="title">球队病例</h1>
      <div class="table van-hairline--surround">
        <div class="thead">
          <div class="th">球员头像</div>
          <div class="th">球员</div>
          <div class="th">位置</div>
          <div class="th">状态</div>
        </div>
        <div class="tbody">
          <div v-for="(item, index) in list" :key="index" class="tr">
            <div class="td-box">
              <div class="list">
                <div class="td"><img :src="item.photo" alt="" class="icon"></div>
                <div class="td">{{ item.simpleName }}</div>
                <div class="td">{{ item.place }}</div>
                <div class="td" :class="'t' + item.health">{{ item.health | health }}</div>
              </div>
            </div>
          </div>
          <div v-if="list.length <= 0" class="no-data">暂无数据！</div>
        </div>
      </div>
    </div>

    <newsList :sport-type="sportType" :team-id="teamId" />

    <share :share-config="shareConfig" />
  </div>
</template>

<script>
import newsList from '@/components/newsList'
import { team } from '@/api'
export default {
  components: {
    newsList
  },
  filters: {
    health (type) {
      let data
      switch (type) {
        case 0:
          data = '健康'
          break
        case 1:
          data = '疑似'
          break
        case 2:
          data = '确诊'
          break
        case 3:
          data = '死亡'
          break
        case 4:
          data = '治愈'
          break
        default:
          break
      }
      return data
    }
  },
  data () {
    return {
      active: 0,
      count: [],
      list: [],
      info: '',
      // 数据截至时间
      dataTime: '',
      teamId: this.$route.query.teamId,
      sportType: this.$route.query.sportType,
      shareConfig: {
        title: '',
        imageUrl: '',
        content: '',
        shareUrl: document.location.href
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      const params = {
        teamId: this.teamId,
        sportType: this.sportType
      }
      team(params).then(res => {
        if (res.code === 200) {
          this.info = res.data
          this.count = res.data.count
          this.list = res.data.list
          this.dataTime = res.time
          this.shareConfig.title = res.data.title
          this.shareConfig.content = res.data.content
          this.shareConfig.imageUrl = res.data.imageUrl
          document.title = res.data.teamName
        } else {
          this.$alert(res.msg)
        }
      })
    },
    tabActive (index) {
      this.active = index
    }
  }
}
</script>

<style lang="scss" scoped>
.epidemic-query-detail {
  .header {
    height: 120px;
    background: $blue;
    color: #FFF;
    position: relative;
    margin-bottom: 110px;

    .total {
      height: 166px;
      color: $fontColor;
      border-radius:18px;
      background: #FFF;
      margin: 0 12px;
      position: absolute;
      bottom: -83px;
      left: 0;
      right: 0;
      overflow: hidden;
      box-shadow:0px 2px 15px 0px rgba(0,0,0,0.11);

      .content {
        height: 170px;
        background: #FFF;
        box-shadow: 20px 10px 25px 0px rgba(0,0,0,0.11);
        position: relative;
        border-top-right-radius: 18px;
        border-top-left-radius: 18px;
        display: flex;
        flex-wrap: wrap;
        text-align: center;

        ul {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          align-content: center;
          margin-top: 10px;
        }

        li {
          width: 33.3%;
          margin-bottom: 13px;
          position: relative;

          &::after {
            width: 1px;
            height: 60px;
            position: absolute;
            box-sizing: border-box;
            content: ' ';
            pointer-events: none;
            right: 0;
            top: 50%;
            margin-top: -30px;
            border: 1px solid #ebedf0;
            transform: scale(.5);
          }

          &:last-child {

            &::after {
              display: none;
            }
          }

          p {
            font-size: 10px;
            color: $fontColor;
            margin-bottom: 3px;
          }

          h1 {
            font-size:18px;
            font-weight: 500;
          }

          &:nth-child(1) {

            h1 {
              color: #A2161A;
            }
          }

          &:nth-child(2) {

            h1 {
              color: #31AD71;
            }
          }

          &:nth-child(3) {

            h1 {
              color: #888;
            }
          }

          &:nth-child(4) {

            h1 {
              color: #D15850;
            }
          }

          &:nth-child(5) {

            h1 {
              color: #FFC000;
            }
          }
        }

        .tips {
          margin: 0 10px;
          padding: 7px 0 7px 0;
          font-size:10px;
          line-height:14px;
          color: #999;
          text-align: left;
        }
      }
    }
  }

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

  .table {
    text-align: center;

    .icon {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      overflow: hidden;
      background: #D8D8D8;
      display: inline-block;
    }

    .red {
      color: #A2161A;
    }

    .orange {
      color: #FFC000;
    }

    .thead {
      display: flex;
      background: #EBEBEB;
      padding: 5px;
      box-sizing: border-box;

      .th {
        font-size: 10px;
        color: $fontColor;
        line-height:14px;

        &:nth-child(1) {
          width: 20%;
        }

        &:nth-child(2) {
          width: 40%;
        }

        &:nth-child(3),
        &:nth-child(4) {
          width: 20%;
        }
      }
    }

    .tbody {

      .tr {

        &:nth-child(even) {
          background: #F7F7F7;
        }

        .btn {
          width: 7px;
          height: 5px;
          display: block;
          margin: 0 auto;

          &.up {
            background: url('~@/assets/img/up.png') no-repeat center center;
            background-size: 100%;
          }
        }

        .template {
          background: #FFF;
          font-size: 12px;

          .td:first-child {
            font-weight: 500;
          }

          .td:last-child {
            font-weight: 500;
            color: #4A90E2;
            font-size: 12px;
          }
        }

        &.active {
          background: #E8E8E8;

          .td-box {
            background: #E8E8E8;
          }
        }

        .list {
          display: flex;
        }

        .td {
          font-size: 12px;
          padding: 5px 0;

          &:first-child {
            font-weight: bold;
          }

          &:nth-child(1) {
            width: 20%;
          }

          &:nth-child(2) {
            width: 40%;
          }

          &:nth-child(3),
          &:nth-child(4) {
            width: 20%;
          }
        }
      }
    }

    .t0 {
      color: $fontColor;
    }

    .t1 {
      color: #FFC000;
    }

    .t2 {
      color: #A2161A;
    }

    .t3 {
      color: #888;
    }

    .t4 {
      color: #31AD71;
    }
  }

  .no-data {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #999;
  }
}
</style>
