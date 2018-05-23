<template>
  <div class="course-main" ref='courseMain'>
    <div class="page-header" :monitor-log="getMonitor()">
      <div class="header-img" v-show="detailObj.lateralCover" :style="{backgroundImage: `url(${detailObj.lateralCover})`}"></div>
      <div class="header-img-small" v-show="!detailObj.lateralCover&&detailObj.verticalCover" :style="{backgroundImage: `url(${detailObj.verticalCover})`}"></div>
      <div class="header-img" v-show="!detailObj.lateralCover&&!detailObj.verticalCover" :style="{backgroundImage: `url('//yun.dui88.com/yoofans/images/201804/miniapp/details-page-top.png')`}"></div>
      <div class="header-name-bg"></div>
      <div class="header-name">
        <span v-if="detailObj.price>0">{{detailObj.buyTimes}}人已购</span>
        <span v-else>{{detailObj.playTimes}}人已听</span>
        <span> | 时长{{detailObj.timeLength | formatTimeText}}</span>
      </div>
    </div>
    <div class="page-title">
      <div class="title-main">{{detailObj.title}}</div>
      <div class="title-sub">{{detailObj.subTitle}}</div>
    </div>
    <div class="page-content" v-show="tabActive">
      <div v-html="detailObj.detail"></div>
    </div>
    <div class="page-btn">
      <a href="javascript:void(0)" class="btn-small btn-border btn" v-if="btnActive == 1" @click.stop="playClick('', detailObj.id, true)">免费试听</a>
      <a href="javascript:void(0)" class="btn-small btn" v-if="btnActive == 1" @click="getPay">立即购买：{{detailObj.price / 100}}元</a>
      <a href="javascript:void(0)" class="btn-big btn" v-if="btnActive == 0" @click="getPay">立即购买：{{detailObj.price / 100}}元</a>
      <a href="javascript:void(0)" class="btn-big btn" v-if="btnActive == 2" @click.stop="playClick('', detailObj.id, false)">播放</a>
    </div>
    <AudioBar/>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import store from '../vuex/store';
  import order from '../api/order';
  import router from '../mixins/router';
  import AudioBar from '../components/basic/Audio_Bar';
  import access from '../mixins/accessHandler';
  export default {
    data() {
      return {
        detailObj: {},
        tabActive: true,
        btnActive: 1,
        courseList: []
      }
    },
    computed: {
      ...mapState(['audio', 'playing', 'currentTime', 'musicDuration']),
    },

    async mounted() {
      await this.getColumnDetail(this.$route.params.courseId);
      let self = this;
      // setTimeout(() => {
      //     // 滚动
      //     self.$refs.courseMain.addEventListener('scroll', self.dispatchScroll, false);
      //     // 埋点
      //     window.monitor && window.monitor.showLog(self);
      //   }, 100);
      
    },
    filters: {
      // 时长
      formatTimeText: function (value) {
        let h = Math.floor(value / 60 % 60)
        let m = Math.floor(value % 60)

        let data = (h < 10 ? '0' + h : h) + '分' + (m < 10 ? '0' + m : m) + '秒'
        return data
      },
      // 时长
      formatTime: function (value) {
        let h = Math.floor(value / 60 % 60)
        let m = Math.floor(value % 60)

        let data = (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m)
        return data
      },
      // 日期
      formatDate: function (value) {
        let newDate = new Date(value);
        let m = newDate.getMonth() + 1;
        let d = newDate.getDate();
        return m + '-' + d;
      },
    },
    methods: {
      // 获取monitor
      getMonitor(id,type,area) {

        // item tabindex dpmc
        return JSON.stringify({
          'dcm': '8001.'+ id + type?type:0 + '0',
          'dpm': 'appId.801' + area,
        });
      },
      // 获取详情
      async getColumnDetail(id) {
        // let self = this;
        // const url = `/api/course/get`;
        // this.$http.get(url, { params: { courseId: id } }).then(res => {
        //   self.detailObj = res.data.data
        // });
        let obj = await order.getCourseDetail(id)
        if (obj.powerLevel == 1 || obj.price == 0) {
          this.btnActive = 2;
        } else if (obj.freeTime > 0) {
          this.btnActive = 1;
        } else {
          this.btnActive = 0;
        }
        this.detailObj = obj

        document.setTitle = function (t) {
        document.title = t;
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
          setTimeout(function () {
            i.remove();
          }, 9)
        }
        document.body.appendChild(i);
      }
      document.setTitle(this.detailObj.title)
        const msg = {
          title: obj.title,
          desc: obj.subTitle,
          link: window.location.href,
          imgUrl: obj.lateralCover || obj.verticalCover ||
            '//yun.dui88.com/yoofans/images/201804/miniapp/details-page-top.png',
        }

        this.wxShare(msg)
      },
      async getPay() {
        let obj = await order.buy(this.detailObj.id, 1)
      },
      // 触发滚动
      dispatchScroll () {
        this.mainScrollTop = this.$refs.courseMain.scrollTop;
        // console.log(this.$refs.homeMain.scrollTop)
        window.monitor && window.monitor.showLog(this);
      }
    },
    beforeDestroy () {
      this.$refs.courseMain.removeEventListener('scroll', this.dispatchScroll, false);
    },
    components: {
      AudioBar
    },
    mixins: [router, access]
  };

</script>
<style lang="less">
  @import "../assets/style/base/util";
  @rem: 75rem;
  .course-main {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    z-index: 1000
  }

  .page-content {
    padding-bottom: 120/@rem;
    background: #fff;
    img {
      width: 100% !important;
      // -webkit-overflow-scrolling: touch !important;
    }
    div {
      // -webkit-overflow-scrolling: touch !important;
    }
  }

  .page-header {
    .size(750, 400);
    position: relative;
    .header-img {
      display: block;
      width: 100%;
      height: 100%;
      background-size: 100% auto;
      background-repeat: no-repeat;
      overflow: hidden;
    }
    .header-img-small {
      .pos(272, 50);
      .size(206, 276);
    }
    .header-name-bg {
      position: absolute;
      width: 100%;
      opacity: 0.5;
      bottom: 0;
      left: 0;
      height: 93/@rem;
      background: linear-gradient(180deg, rgba(238, 238, 238, 0), rgba(0, 0, 0, 1));
    }
    .header-name {
      .pos(30, 353);
      .text(26, 37);
      color: #fff;
    }
  }

  .page-title {
    background: #fff;
    position: relative;
    border-bottom: 20/@rem solid #F4F4F4;
    padding: 30/@rem 24/@rem;
    .title-main {
      font-size: 34/@rem;
      line-height: 48/@rem;
      max-height: 96/@rem;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .title-sub {
      .text(28, 40);
      color: #787878;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .page-tab {
    padding: 0 30/@rem;
    .clearfix {
      border-bottom: 1/@rem solid #e5e5e5;
    }
    .tab {
      .text(32, 86);
      margin: 0 72.5/@rem;
      width: 200/@rem;
      text-align: center;
      color: #333;
      float: left;
    }
    .active {
      color: #ff464a;
      border-bottom: 4/@rem solid #FF3E44;
    }
  }

  .list-nav {
    margin: 0 30/@rem;
    height: 94/@rem;
    position: relative;
    .nav-title {
      .pos(0, 24);
      .text(32, 45);
      color: #222;
    }
    .nav-sort {
      .flexmiddle;
      .text(25, 36);
      color: #787878;
      position: absolute;
      top: 29/@rem;
      right: 0;
      .icon-sort {
        margin-right: 10/@rem;
      }
    }
  }

  .list-content {
    padding-bottom: 120/@rem;
    margin: 0 30/@rem;
    .item {
      height: 157/@rem;
      position: relative;
      border-bottom: 1/@rem solid #E5E5E5;
      .icon-play {
        .pos(14, 52);
        .size(54, 54);
        .text(20, 54);
        background: #aaa;
        text-align: center;
        color: #fff;
        border-radius: 50%;
      }
      .icon-svn {
        background: #ff3e44;
        img {
          width: 54/@rem;
          height: 54/@rem;
        }
      }
      .item-title {
        .pos(100, 16);
        .text(28, 80, 40);
        width: 504/@rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        .item-audition {
          font-size: 24/@rem;
          padding: 0 5/@rem;
          border-radius: 5/@rem;
          margin-right: 10/@rem;
          display: inline-block;
          color: #fff;
          background: #FF3E44;
        }
        .red {
          color: #FF3E44;
        }
      }
      .item-date {
        .text(23, 33);
        color: #787878;
        position: absolute;
        top: 23/@rem;
        right: 0;
      }
      .item-time {
        .flexmiddle;
        .pos(100, 108);
        .text(24, 33);
        color: #787878;
        .icon-time {
          margin-right: 15/@rem;
        }
      }
      .icon-ispay {
        color: #999;
        position: absolute;
        right: 11/@rem;
        bottom: 21/@rem;
      }
    }
  }


  .page-btn {
    .size(750, 120);
    border-top: 1/@rem solid #E5E5E5;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    background: #fff;
    .btn {
      .pos(388, 22);
      .size(332, 76);
      .text(30, 76);
      border-radius: 45/@rem;
      background: #FF4E47;
      color: #fff;
      text-align: center;
      z-index: 99;
      background: rgba(216, 216, 216, 1);
      background: linear-gradient(90deg, rgba(255, 80, 72, 1), rgba(255, 99, 77, 1));
    }
    .btn-border {
      .pos(30, 22);
      .text(30, 76, 70);
      box-sizing: border-box;
      border: 3/@rem solid #FF4E47;
      background: #fff;
      color: #FF3E44;
      box-shadow: none;
    }
    .btn-big {
      .pos(144, 22);
      .size(460, 76);
      .text(36, 76);
      background: rgba(216, 216, 216, 1);
      background: linear-gradient(90deg, rgba(255, 80, 72, 1), rgba(255, 99, 77, 1));
    }
  }

</style>

