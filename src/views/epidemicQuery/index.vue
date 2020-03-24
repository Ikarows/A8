<template>
  <div class="epidemic-query">

    <div class="header">
      <h1 class="title">新冠肺炎疫情实时查</h1>

      <div class="total">
        <div class="tab">
          <div
            v-for="(item, index) in countData"
            :key="index"
            :class="[ index === active ? 'item active' : 'item' ]"
            @click="tabActive(index)"
          >{{ item.title }}</div>
        </div>
        <div v-if="countData[active] && countData[active].info.length > 0" class="content">
          <ul>
            <li v-for="(item, index) in countData[active].info" :key="index">
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
          <div class="th">球队名称</div>
          <div class="th">累计确诊</div>
          <div class="th">新增确诊</div>
          <div class="th">疑似</div>
          <div class="th">治愈</div>
          <div class="th">死亡</div>
          <div class="th">更多</div>
        </div>
        <div class="tbody">
          <div
            v-for="(item, index) in leagueCount"
            v-show="(item.sportType === active || active === 0 )"
            :key="index"
            class="tr"
            :class="[ item.childShow ? 'active' : '' ]"
          >
            <div class="td-box">
              <div class="list">
                <div class="td">{{ item.leagueName }}</div>
                <div class="td">{{ item.diagnosisTotal }}</div>
                <div class="td">{{ item.diagnosisNew }}</div>
                <div class="td">{{ item.suspectNow }}</div>
                <div class="td">{{ item.cureTotal }}</div>
                <div class="td">{{ item.deathTotal }}</div>
                <div class="td">
                  <span class="btn" @click="toggleChild(item)">
                    <img :src="[ item.childShow ? upIcon : downIcon]" alt="">
                  </span>
                </div>
              </div>
            </div>
            <div class="template">
              <div
                v-for="(child, k) in item.teamCount"
                v-show="item.childShow"
                :key="k"
                class="list"
              >
                <div class="td">{{ child.teamName }}</div>
                <div class="td">{{ child.diagnosisTotal }}</div>
                <div class="td">{{ child.diagnosisNew }}</div>
                <div class="td">{{ child.suspectNow }}</div>
                <div class="td">{{ child.cureTotal }}</div>
                <div class="td">{{ child.deathTotal }}</div>
                <div class="td" @click="toDetails(child.teamId, child.sportType)">详情</div>
              </div>
            </div>
          </div>
          <!-- <div class="no-data">暂无数据！</div> -->
        </div>
      </div>
    </div>

    <newsList :sport-type="active" />

    <share :share-config="shareConfig" />
  </div>
</template>

<script>
import newsList from '@/components/newsList'
import { count } from '@/api'
export default {
  components: {
    newsList
  },
  data () {
    return {
      active: 0,
      // 统计数据
      countData: [],
      // 球队病例
      leagueCount: [],
      // 数据截至时间
      dataTime: '',
      sportType: '', // 球队病例类型
      downIcon: require('@/assets/img/down.png'),
      upIcon: require('@/assets/img/up.png'),
      shareConfig: {
        title: document.title,
        imageUrl: 'https://via.placeholder.com/50/09f/fff.png',
        content: '这是新冠肺炎疫情实时查的分享内容',
        shareUrl: document.location.href
      } // 分享信息
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      count().then(res => {
        if (res.code === 200) {
          this.countData = res.data.countData
          this.leagueCount = res.data.leagueCount
          for (const item of this.leagueCount) {
            item.childShow = false
          }
          this.dataTime = res.time
        } else {
          this.$alert(res.msg)
        }
      })
    },

    tabActive (index) {
      this.active = index
    },

    toDetails (teamId, sportType) {
      this.$router.push({ path: '/epidemicQuery/detail', query: { teamId, sportType }})
    },

    toggleChild (item) {
      this.$forceUpdate()
      this.$set(item, 'childShow', !item.childShow)
    }
  }
}
</script>

<style lang="scss" scoped>
.epidemic-query {
  .header {
    height: 190px;
    background: $blue url('~@/assets/img/index_bg.png') no-repeat;
    background-size: 186px 66px;
    background-position: 92% 28px;
    color: #FFF;
    position: relative;
    margin-bottom: 129px;

    .title {
      width:120px;
      font-size:20px;
      line-height:28px;
      font-weight:500;
      text-align: left;
      position: absolute;
      bottom: 116px;
      left: 20px;
    }

    .total {
      height: 206px;
      color: $fontColor;
      border-radius:18px;
      background: #FFF;
      margin: 0 12px;
      position: absolute;
      bottom: -103px;
      left: 0;
      right: 0;
      overflow: hidden;
      box-shadow:0px 2px 15px 0px rgba(0,0,0,0.11);

      .tab {
        height: 45px;
        line-height: 40px;
        display: flex;
        text-align: center;

        .item {
          font-size:14px;
          color: #999;
          background: #EBEBEB;
          flex: 1;

          &.active {
            background: #EBEBEB url('~@/assets/img/indexnav_2_on.png') no-repeat center top;
            background-size: 100% 80%;
            color: $fontColor;
          }

          &:first-child {

            &.active {
              background: #EBEBEB url('~@/assets/img/indexnav_1_on.png') no-repeat center top;
              background-size: 100% 95%;
              color: $fontColor;
            }
          }

          &:last-child {

            &.active {
              background: #EBEBEB url('~@/assets/img/indexnav_3_on.png') no-repeat center top;
              background-size: 100% 95%;
              color: $fontColor;
            }
          }
        }
      }

      .content {
        height: 170px;
        background: #FFF;
        box-shadow: 20px 10px 25px 0px rgba(0,0,0,0.11);
        position: relative;
        border-top-right-radius: 18px;
        border-top-left-radius: 18px;
        margin-top: -10px;
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
              color: #FFA857;
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
          width: 23%;
        }

        &:nth-child(2),
        &:nth-child(3) {
          width: 18%;
        }

        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6),
        &:nth-child(7) {
          width: 12%;
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
            width: 23%;
          }

          &:nth-child(2),
          &:nth-child(3) {
            width: 18%;
          }

          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6),
          &:nth-child(7) {
            width: 12%;
          }
        }
      }
    }
  }
}
</style>
