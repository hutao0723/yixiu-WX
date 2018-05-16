<template>
  <div class="column-page">
    <div class="page-header">
      <div class="header-img" v-show="detailObj.lateralCover" :style="{backgroundImage: `url(${detailObj.lateralCover})`}"></div>
      <div class="header-img-small" v-show="!detailObj.lateralCover&&detailObj.verticalCover" :style="{backgroundImage: `url(${detailObj.verticalCover})`}"></div>
      <div class="header-img" v-show="!detailObj.lateralCover&&!detailObj.verticalCover" :style="{backgroundImage: `url('//yun.dui88.com/yoofans/images/201804/miniapp/details-page-top.png')`}"></div>
      <div class="header-name-bg"></div>
      <div class="header-name">
        <span v-if="detailObj.price>0">{{detailObj.buyTimes}}人已购</span>
        <span v-else>{{detailObj.playTimes}}人已听</span>
        <span v-if="courseList.length > 0"> | 共{{courseList.length}}节</span>
      </div>
    </div>
    <div class="page-title">
      <div class="title-main">{{detailObj.title}}</div>
      <div class="title-sub">{{detailObj.subTitle}}</div>
    </div>
    <div class="page-tab" v-show="courseList.length > 0">
      <div class="clearfix">
        <div class="tab-left tab" :class="{ active: tabActive}" @click="tabActive = true">专栏详情</div>
        <div class="tab-right tab" :class="{ active: !tabActive}" @click="tabActive = false">课程目录</div>
      </div>
    </div>
    <div class="page-list" v-show="!tabActive">
      <div class="list-nav">
        <div class="nav-title">内容</div>
        <div class="nav-sort" @click="reverseList">
          <i class="iconfont icon-sort" v-show="!reverseTs">&#xe685;</i>
          <i class="iconfont icon-sort" v-show="reverseTs">&#xe684;</i>
          {{reverseTs?'倒序':'正序'}}</div>
      </div>
      <div class="list-content">
        <div class="item" v-for="(item,index) in courseList" :key="index" @click="playClick(detailObj.id, item.id, false)">
          <i class="iconfont icon-play active" v-if="audio.courseId == item.id">
            <img class="" src="../images/audio.svg" />
          </i>
          <i class="iconfont icon-play" v-else>&#xe617;</i>
          <span class="item-title">
            <span class="item-audition" v-if="item.watchable  == 1 && detailObj.powerLevel == 0">试听</span>
            <span :class="{active:audio.courseId == item.id}">{{item.title}}</span>
          </span>
          <span class="item-time">
            <i class="iconfont icon-time">&#xe62d;</i>{{item.timeLength | formatTime}}
          </span>
          <span class="item-date">{{item.publishTime | formatDate}}</span>
          <i class="iconfont icon-ispay" v-show="item.powerLevel == 0 && item.price > 0">&#xe60c;</i>
        </div>
      </div>
    </div>
    <div class="page-content" v-show="tabActive">
      <div v-html="detailObj.detail"></div>
    </div>
    <div class="page-btn" v-if="btnActive != 2">
      <a href="javascript:void(0)" class="btn-small btn-border btn" v-if="btnActive == 1" @click.stop="playClick(detailObj.id, '', true)">免费试听</a>
      <a href="javascript:void(0)" class="btn-small btn" v-if="btnActive == 1" @click="getPay">立即购买：{{detailObj.price / 100}}元</a>
      <a href="javascript:void(0)" class="btn-big btn" v-if="btnActive == 0" @click="getPay">立即购买：{{detailObj.price / 100}}元</a>
    </div>
    <AudioBar/>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import store from '../vuex/store'
  import order from '../api/order'
  import router from '../mixins/router';
  import AudioBar from 'components/basic/Audio_Bar';

  export default {
    data() {
      return {
        detailObj: {},
        tabActive: true,
        btnActive: 1,
        courseList: [],
        reverseTs: false,

      }
    },
    computed: {
      ...mapState(['audio', 'playing', 'currentTime', 'musicDuration']),
    },
    mounted() {
      // this.$store.dispatch('setWhichpage', '首页');
      // // 返回登录页面
      // if (!this.isLogin) {
      //   this.$router.push({ path: '/login' });
      // }
      this.getColumnDetail(this.$route.params.columnId)
      this.getColumnList(this.$route.params.columnId)
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
    created() {

    },
    methods: {
      // 获取详情
      async getColumnDetail(id) {
        // let self = this;
        // const url = `/api/column/get`;
        // this.$http.get(url, { params: { columnId: id } }).then(res => {
        //   self.detailObj = res.data.data
        // });
        let obj = await order.getColumnDetail(id)
        if (obj.powerLevel == 1 || obj.price == 0) {
          this.btnActive = 2;
        } else if (obj.watchable == 1) {
          this.btnActive = 1;
        } else {
          this.btnActive = 0;
        }
        this.detailObj = obj

        const msg = {
          title: obj.title,
          desc: obj.subTitle,
          link: window.location.href,
          imgUrl: obj.lateralCover || obj.verticalCover ||
            '//yun.dui88.com/yoofans/images/201804/miniapp/details-page-top.png',
        }
        this.wxShare(msg)

      },
      // 获取详情
      async getColumnList(id) {
        // let self = this;
        // const url = `/api/column/getCourses`;
        // this.$http.get(url, { params: { columnId: id } }).then(res => {
        //   self.courseList = res.data.data
        //   console.log(res.data.data)
        // });
        let obj = await order.getColumnList(id)
        this.courseList = obj
      },
      async getPay() {
        let obj = await order.buy(this.detailObj.id, 2)
      },
      goAudition() {},
      // 排序
      reverseList() {
        this.courseList = this.courseList.reverse();
        this.reverseTs = !this.reverseTs;
      },
    },
    components: {
      AudioBar
    },
    mixins: [router]
  };

</script>
<style lang="less">
  @import "../assets/style/base/util";
  @rem: 75rem;
  .column-page {
    height: 100%;
    position: relative;
  }

  .page-content {
    padding-bottom: 120/@rem;
    background: #fff;
    img {
      width: 100% !important;
    }
  }

  .page-header {
    .size(750, 400);
    position: relative;
    .header-img {
      .size(750, 400);
      display: block;
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
        background: #FF3E44;
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
        .active {
          color: #FF3E44;
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

  .icon-sort,
  .icon-ispay,
  .icon-time {
    font-size: 24/@rem;
  }

</style>
