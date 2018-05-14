<template>
  <div class="column-page">
    <div class="page-header">
      <div class="header-img" v-show="detailObj.lateralCover" :style="{backgroundImage: `url(${detailObj.lateralCover})`}"></div>
      <div class="header-img-small" v-show="!detailObj.lateralCover&&detailObj.verticalCover" :style="{backgroundImage: `url(${detailObj.verticalCover})`}"></div>
      <div class="header-img" v-show="!detailObj.lateralCover&&!detailObj.verticalCover" :style="{backgroundImage: `url('//yun.dui88.com/yoofans/images/201804/miniapp/details-page-top.png')`}"></div>
      <div class="header-name-bg"></div>
      <div class="header-name">
        <span v-if="detailObj.price>0">{{detailObj.buyTimes}}人已购</span>
        <span v-else>{{detailObj.playTimes}}人已听</span> | 时长{{detailObj.timeLength}}
      </div>
    </div>
    <div class="page-title">
      <div class="title-main">{{detailObj.title}}</div>
      <div class="title-sub">{{detailObj.subTitle}}</div>
    </div>
    <div class="page-tab">
      <div class="clearfix">
        <div class="tab-left tab" :class="{ active: tabActive}" @click="tabActive = true">专栏详情</div>
        <div class="tab-right tab" :class="{ active: !tabActive}" @click="tabActive = fasle">课程目录</div>
      </div>
    </div>
    <div class="page-list" v-show="!tabActive">
      <div class="list-nav">
        <div class="nav-title">内容</div>
        <div class="nav-sort">
          <i class="iconfont icon-sort"></i>排序</div>
      </div>
      <div class="list-content">
        <div class="item" v-for="(item,index) in courseList" :key="index">
          <i class="iconfont icon-svn">
            <!-- <img class="" src="https://yun.dui88.com/youfen/imgs/audio.svg" /> -->
          </i>
          <i class="iconfont icon-play"></i>
          <span class="item-title">
            <span class="item-audition" v-if="item.watchable  == 1 && detailObj.powerLevel == 0">试听</span>
            <span :class="{red:item.playing}">{{item.title}}</span>
          </span>
          <span class="item-time">
            <i class="iconfont icon-time"></i>{{item.timeLength}}
          </span>
          <span class="item-date">{{item.date}}</span>
          <i class="iconfong icon-ispay"></i>
        </div>
      </div>
    </div>
    <div class="page-content" v-show="tabActive">
      <div class="page-content" v-html="detailObj.detail"></div>
    </div>
    <div class="page-btn">
      <a href="javascript:void(0)" class="btn-small btn-border btn" v-if="btnActive == 1" @click="goAudition">免费试听</a>
      <a href="javascript:void(0)" class="btn-small btn" v-if="btnActive == 1" @click="getPay">立即购买：{{detailObj.price / 100}}元</a>
      <a href="javascript:void(0)" class="btn-big btn" v-if="btnActive == 0" @click="getPay">立即购买：{{detailObj.price / 100}}元</a>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import store from '../vuex/store'
  import httpServer from '../api/api';
  import config from '../api/config';
  import qs from 'qs';




  export default {
    data() {
      return {
        detailObj: {
          title: '课程标题测试测试测试测试课程标题测试测试测试测试课程标题测试测试测试测试课程标题测试测试测试测试',
          subTitle: '副标题测试副标题测试副标题测试副标题测试副标题测试副标题测试副标题测试副标题测试副标题测试副标题测试',
          powerLevel: 0,
          price: 19999,
        },
        tabActive: true,
        btnActive: 1,
        courseList: [
          {
            title: '课程表头课程表头课程表头课程表头课程表头课程表头课程表头课程表头',
            timeLength: '1:00',
            date: '03-20',
            watchable: 1,
            playing: 1,
          }
        ]

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
      console.log(this.audio)
      this.getColumnDetail(115)
    },
    methods: {
      // 获取专栏详情
      getColumnDetail(id) {
        this.$axios.get('/floor/column/getCourses?columnId=115').then(res => {
        })
      },

      getPay() {
      },
      goAudition() {
      },
    }
  };
</script>
<style lang="less" scoped>
  @import "../assets/style/base/util";
  @rem: 75rem;
  .column-page {
    height: 100%;
    position: relative;
  }

  .page-header {
    .size(750, 400);
    position: relative;
    .header-img-big {
      .size(750, 400);
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