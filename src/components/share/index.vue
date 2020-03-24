<template>
  <div class="share">
    <img v-if="$isApp()" src="@/assets/img/share_btn.png" class="share-btn" @click="show = true">
    <van-action-sheet v-model="show" cancel-text="取消" title="分享至">
      <div class="content">
        <ul>
          <li v-for="(item, index) in list" :key="index" @click="share(item.type)">
            <img :src="item.icon" alt="">
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
export default {
  props: {
    shareConfig: {
      required: true,
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      show: false,
      list: [
        {
          name: '微信',
          icon: require('@/assets/img/share_weixin.png'),
          type: 'wxsession'
        },
        {
          name: '朋友圈',
          icon: require('@/assets/img/share_pyq.png'),
          type: 'wxtimeline'
        },
        {
          name: 'QQ',
          icon: require('@/assets/img/share_qq.png'),
          type: 'qq'
        },
        {
          name: 'QQ空间',
          icon: require('@/assets/img/share_qqkj.png'),
          type: 'qzone'
        }
      ]
    }
  },
  methods: {
    share (type) {
      /*
       * startShare(title: String, imageUrl: String, content: String, shareUrl: String, type: String, shareScene: Int）
       * type：String类型：qq（QQ），qzone(空间)，wxsession（微信），wxtimeline（朋友圈），weibo（微博）
       * shareScene，int类型：
       * 0，分享链接(可以有标题，有内容，有targetUrl)
       * 1，分享图片(只有图片，没有targetUrl)
       * 3，分享纯文本（只有文字，没有targetUrl）
       * 4，分享视频(可以有标题，有内容，有videoUrl)
       * 分享成功之后，会调用shareOver()方法，回传1
      **/
      // const shareConfig = {
      //   title: '',
      //   imageUrl: '',
      //   content: '',
      //   shareUrl: '',
      //   shareScene: 0
      // }
      window.A8Show.shareWithTitleImageUrlContentShareUrlType(
        this.shareConfig.title,
        this.shareConfig.imageUrl,
        this.shareConfig.content,
        this.shareConfig.shareUrl,
        type
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  .share {
    .van-action-sheet__header,
    .van-action-sheet__content,
    .van-action-sheet__cancel::before {
      background: #F7F7F7;
    }

    .van-action-sheet__close {
      display: none;
    }

    .content {

      ul {
        display: flex;
        padding: 20px 15px;

        li {
          flex: 1;
          text-align: center;
          font-size: 12px;
          font-family: PingFangSC-Regular,PingFang SC;
          font-weight: 400;
          color:#888;
          line-height: 17px;

          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }

    .van-popup--bottom.van-popup--round {
      border-radius:6px 6px 0px 0px;
    }

    .share-btn {
      width: 52px;
      height: 24px;
      position: fixed;
      right: 0;
      top: 25px;

    }
  }
</style>
