<template>
  <div class="user-main">
    <div class="user-box">
      <div class="user-info">
        <img :src="imageUrl" class="info-icon" />
        <div class="info-text">{{username}}</div>
      </div>
      <div class="mtr20 user-h110 row" @click="shareToggle = true">
        <div class="icon-box share column-center">
          <i class="iconfont icon-recom user-icon"></i>
        </div>
        <div class="row ft32 ml30">推荐给好友</div>
      </div>
      <router-link :to="{ path: '/help' }">
        <div class="mtr20 user-h110 row">
          <div class="icon-box help column-center">
            <i class="iconfont icon-help user-icon"></i>
          </div>
          <div class="row ft32 ml30">帮助中心</div>
        </div>
      </router-link>
    </div>
    <Share v-show="shareToggle" v-on:success="success" />
  </div>
</template>

<script>
  import access from '../mixins/accessHandler';
  import Share from '../components/basic/Share';

  export default {
    components: {
      Share
    },
    data() {
      return {
        data: {},
        imageUrl: 'https://yun.dui88.com/yoofans/images/201804/miniapp/help-center.png',
        username: '哈哈',
        shareToggle: false,
      };
    },
    created() {},
    mounted() {
      this.getUserInfo();
      this.setTitle('个人中心');
    },
    methods: {
      success() {
        this.shareToggle = false;
      },
      getUserInfo() {
        this.$http.get('/user/getUserInfo').then(res => {
          let resp = res.data
          // console.log(resp.data)
          if (resp.success) {
            this.username = resp.data.nickname;
            this.imageUrl = resp.data.headimgurl;
          } else {
            console.log("获取用户信息失败")
          }
        });
      }
    },
    mixins: [access]
  };

</script>

<style lang="less">
  @import '../less/tool.less';
  @import '../less/icon.less';
  .user-main {
    height: 100%;
    .user-box {
      height: 100%;
      background: rgba(244, 244, 244, 1);
      box-sizing: border-box;
      border-top: 2/@rem solid #F4F4F4;
      .user-info {
        width: 750/@rem;
        height: 328/@rem;
        background: rgba(255, 255, 255, 1);
        padding: 1/@rem 0;
      }
      .info-icon {
        height: 150/@rem;
        margin: 54/@rem auto 0;
        width: 150/@rem;
        display: block;
        border-radius: 50%;
      }
      .info-text {
        text-align: center;
        margin-top: 22/@rem;
        height: 50/@rem;
        .fontSize(36);
        color: rgba(68, 68, 68, 1);
        line-height: 50/@rem;
      }
      .user-h110 {
        height: 110/@rem;
        background: rgba(255, 255, 255, 1);
        padding: 0 30/@rem;
        border-radius: 0;
        color: #333;
      }
      .ft32 {
        .fontSize(32);
      }
      .ml30 {
        margin-left: 30/@rem;
      }
      .mtr20 {
        margin-top: 20/@rem;
      }
      .icon-box {
        width: 50/@rem;
        height: 50/@rem;
        border-radius: 50%;
        &.share {
          background: rgba(255, 78, 81, 1);
        }
        &.help {
          background: rgba(65, 164, 255, 1);
        }
      }
      .user-icon {
        color: #fff;
        .fontSize(26);
      }
    }
  }

</style>

