<template>
  <div class="home-main" ref="homeMain">
    <div @click="play">播放</div>
    <!-- 未买课 -->
    <div class="home-box" v-if="courseObj.status == 0">
      <div class="home-tab clearfix">
        <div class="item" @click="tabActive=true">
          <span :class="{ active: tabActive}">简介</span>
        </div>
        <div class="item" @click="tabActive=false">
          <span :class="{ active: !tabActive}">课程</span>
        </div>
      </div>
      <div v-show="tabActive">
        <div class="home-content"></div>
        <div class="home-review">
          <h2>学员观点</h2>
          <div class="item" v-for="(item,index) in reviewList" :key="index">
            <img :src="item.headerImg" alt="" class="item-header">
            <div class="item-name">{{item.name}}</div>
            <div class="item-periods">{{item.periods}}</div>
            <div class="item-content">{{item.content}}</div>
            <div class="item-book">
              <img class="book-img" :src="item.bookImg" alt="">
              <div class="book-name">《{{item.bookName}}》</div>
              <div class="book-author">{{item.author}} 著</div>
            </div>
            <div class="item-praise">
              <i></i>
            </div>
            <div class="item-transmit">
              <i></i>
            </div>
          </div>
        </div>
      </div>

      <div v-show="!tabActive">
        <div class="home-course">
          <div class="item" v-for="(item,index) in courseList" :key="index" :class="{active: index == 0,none: index == 2}">
            <div class="item-box">
              <div class="item-top">
                <div class="item-name">{{item.name}}</div>
                <div class="item-msg">第{{item.num}}期 | {{item.date}}开课</div>
                <div class="item-num">报名{{item.peoNum}}人</div>
                <div class="item-btn">{{index == 0?'已选':'选择'}}</div>
              </div>
              <div class="item-bottom">
                <p>· {{item.text1}}</p>
                <p>· {{item.text2}}</p>
                <p>· {{item.text3}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 未开课 -->
    <div class="home-nonevent" v-if="courseObj.status == 1">
      <div class="nonevent-box">
        <p class="text-a">您已成功报名</p>
        <p class="text-b">「 {{courseObj.name}} 」</p>
        <p class="text-c">{{courseObj.date}}开学，倒计时{{courseObj.date}}天</p>
      </div>
      <p class="text-d">长按识别二维码添加老师微信</p>
      <p class="text-e">因添加学员较多，老师会在3个工作日内通过，请耐心等待~</p>
      <img src="" alt="">
      <p class="text-f">美少女</p>
      <p class="text-g">微信添加老师后，你的专属老师会在课程</br>开始前邀请你进入对应班级群</p>
      <p class="text-h">关注微信公众号【一修读书】，点击</br>菜单栏“我的老师”添加</p>
    </div>

    <div class="home-already" v-if="courseObj.status == 2">
      <h2>今日学习
        <span> | 第{{alreadyObj.nowDay}}/{{alreadyObj.totalDay}}天</span>
      </h2>
      <div class="already-book">
        <img src="" alt="" class="book-img">
        <div class="book-name">《{{alreadyObj.name}}》</div>
        <div class="book-msg">{{alreadyObj.msg}}</div>
        <div class="book-btn">播放
          <i></i>
        </div>
      </div>
      <h2>我的书架
        <span> | 缺卡{{alreadyObj.lockDay}}天</span>
      </h2>
      <div class="already-list clearfix">
        <div class="item" v-for="(item,index) in alreadyObj.list" :key="index" @click="alertToggle = true;">
          <div class="item-lock">
            <img src="" alt="" class="item-img">
          </div>
          <div class="item-name">《{{item.name}}》</div>
        </div>
      </div>
      <div class="already-alert" v-show="alertToggle">
        <div class="alert-top">
          <h3>《{{bookName}}》</h3>
          <div class="clearfix">
            <div class="item" v-for="(item,index) in 6" :key="index" :class="{none: index >4}">{{item}}</div>
          </div>
        </div>
        <div class="alert-btn" @click="alertToggle = false;">取消</div>
      </div>
    </div>
    
    <AudioBar/>
  </div>
</template>

<script>
  import AudioBar from '../../components/basic/Audio_Bar';
  import play from '../../api/play'
  import {
    mapState
  } from 'vuex';
  export default {
    components: {
      AudioBar
    },
    data() {
      return {
        reviewList: [{
          headerImg: '',
          name: '木南岸那',
          periods: '魔鬼训练营第3期',
          content: '张老师讲的太好了阿斯顿撒张老师讲的太好了阿斯顿撒张老师讲的太好了阿斯顿撒张老师讲的太好了阿斯顿撒张老师讲的太好了阿斯顿撒张老师讲的太好了阿斯顿撒',
          bookImg: '',
          bookName: '遇见傻逼',
          author: '的sa',
          praiseNumber: '23',
        }],
        courseList: [{
          name: '情商高手+好口才训练营',
          num: '3',
          date: '5-18',
          peoNum: '233',
          text1: '名人教你说话之道',
          text2: '怎么优雅、友好地拒绝别人',
          text3: '做生活中的高情商者、职场中的优雅人士',
        }, {
          name: '情商高手+好口才训练营',
          num: '3',
          date: '5-18',
          peoNum: '233',
          text1: '名人教你说话之道',
          text2: '怎么优雅、友好地拒绝别人',
          text3: '做生活中的高情商者、职场中的优雅人士',
        }, {
          name: '情商高手+好口才训练营',
          num: '3',
          date: '5-18',
          peoNum: '233',
          text1: '名人教你说话之道',
          text2: '怎么优雅、友好地拒绝别人',
          text3: '做生活中的高情商者、职场中的优雅人士',
        }],
        tabActive: false,
        courseObj: {
          status: 0,
          name: '30天魔鬼训练营',
          date: '5-23',
        },
        alreadyObj: {
          nowDay: 5,
          totalDay: 30,
          lockDay: 3,
          name: '遇见未知的自己',
          msg: '做生活中的高情商者、职场中的商者、职场中的优雅人士做生活中的高情商者、职场中的优雅人士',
          list: [{
            img: '',
            name: '拍摄照片1',
          }, {
            img: '',
            name: '拍摄照片2',
          }, {
            img: '',
            name: '拍摄照片3拍摄照片3',
          }, {
            img: '',
            name: '拍摄照片4',
          }, {
            img: '',
            name: '拍摄照片5',
          }],
        },
        bookName: '今天的网红经济',
        alertToggle: false,
      };
    },
    computed: {
      ...mapState({})
    },
    created() {},
    mounted() {},
    methods: {
      play() {
        play.audioInit(28, 196, true)
      }
    }
  };

</script>

<style lang="less">
  @import '../../less/variable';
  @import '../../less/util';

  .home-main {
    width: 750/@rem;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    font-size: 24/@rem;
    .icon-nav {
      height: 480/@rem;
      border: 1px solid #ccc;
    }
    .home-tab {
      .item {
        width: 50%;
        float: left;
        text-align: center;
        span {
          .size(126, 102);
          .text(44, 102);
          display: inline-block;
          text-align: center;
          color: #bbb;
        }
        .active {
          color: #333;
          border-bottom: 6/@rem solid #333;
        }
      }
    }
    .home-review {
      h2 {
        .text(40, 120);
        color: #333;
        text-align: center;
      }
      .item {
        position: relative;
        height: 560/@rem;
        .item-header {
          .size(64, 64);
          .pos(30, 40);
          border-radius: 50%;
          overflow: hidden;
          background: #000;
        }
        .item-name {
          .pos(118, 36);
          .text(30, 42);
          color: #333;
          padding-right: 62/@rem;
        }
        .item-periods {
          .pos(118, 82);
          .text(24, 33);
          color: #666;
          padding-right: 62/@rem;
        }
        .item-content {
          .pos(118, 130);
          font-size: 30/@rem;
          line-height: 42/@rem;
          color: #666;
          padding-right: 62/@rem;
        }
        .item-book {
          .size(596, 148);
          .pos(118, 318);
          position: relative;
          background: #eee;
          border-radius: 4/@rem;
          .book-img {
            .pos(30, 13);
            .size(80, 112);
            border: 5/@rem solid #fff;
          }
          .book-name {
            .pos(120, 25);
            .text(30, 42);
            color: #555;
          }
          .book-author {
            .pos(134, 75);
            .text(26, 37);
            color: #666;
          }
        }
      }

    }
    .home-course {
      background: #f1f1f1;
      padding: 40/@rem 0;
      .item {
        margin-bottom: 40/@rem;
        padding: 0 45/@rem;
        .item-box {
          border-radius: 20/@rem;
          overflow: hidden;
        }
        .item-top {
          height: 210/@rem;
          position: relative;
          background: #FEED47;
          .item-name {
            .pos(40, 22);
            .text(44, 62);
            color: #333;
            font-weight: blod;
          }
          .item-msg {
            .pos(40, 103);
            .text(26, 37);
            color: #333;
          }
          .item-num {
            .pos(40, 145);
            .text(26, 37);
            color: #333;
          }
          .item-btn {
            .size(130, 56);
            .text(32, 56);
            position: absolute;
            top: 115/@rem;
            right: 20/@rem;
            border: 1/@rem solid #333;
            border-radius: 10/@rem;
            background: #FEED47;
            text-align: center;
          }
        }
        .item-bottom {
          height: 220/@rem;
          font-size: 28/@rem;
          line-height: 52/@rem;
          padding: 29/@rem 40/@rem;
          background: #fff;
          box-sizing: border-box;
        }
      }
      .active {
        padding: 0 20/@rem;
        .item-box {
          box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1);
        }
        .item-top {
          height: 220/@rem;
          .item-name {
            .pos(40, 22);
            .text(48, 67);
          }
          .item-msg {
            .pos(40, 109);
            .text(28, 40);
            color: #333;
          }
          .item-num {
            .pos(40, 157);
            .text(28, 40);
            color: #333;
          }
          .item-btn {
            .size(130, 56);
            .text(32, 56);
            position: absolute;
            top: 124/@rem;
            background: #FF4C4C;
            border-color: #FF4C4C;
            color: #fff;
          }
        }
        .item-bottom {
          height: 230/@rem;
          font-size: 30/@rem;
          line-height: 52/@rem;
          padding: 37/@rem 40/@rem;
          background: #fff;
          box-sizing: border-box;
        }
      }
      .none {
        .item-top {
          background: #FFF4B6;
          .item-name {
            color: #888;
          }
          .item-msg {
            color: #888;
          }
          .item-num {
            color: #888;
          }
          .item-btn {
            display: none;
          }
        }
        .item-bottom {
          color: #999;
        }
      }
    }
    .home-nonevent {
      position: relative;
      padding: 20/@rem 34/@rem;
      text-align: center;
      padding-bottom: 116/@rem;
      .nonevent-box {
        height: 290/@rem;
        background: #FFE555;
        border-radius: 20/@rem;
        color: #333333;
        padding-top: 93/@rem;
        box-sizing: border-box;
        .text-a {
          .text(50, 70);
          font-weight: bold;
        }
        .text-b {
          .text(28, 40);
          margin-top: 10/@rem;
        }
        .text-c {
          .text(30, 42);
          margin-top: 15/@rem;
          font-weight: bold;
        }
      }
      .text-d {
        .text(36, 50);
        margin-top: 34/@rem;
        font-weight: bold;
        color: #116EBC;
      }
      .text-e {
        .text(22, 30);
        margin-top: 12/@rem;
        color: #666;
      }
      .text-f {
        .text(36, 50);
        font-weight: bold;
        color: #116EBC;
      }
      .text-g {
        font-size: 28/@rem;
        line-height: 40/@rem;
        color: #333;
        margin-top: 16/@rem;
      }
      .text-h {
        position: absolute;
        height: 116/@rem;
        background: #EEEEEE;
        color: #666;
        padding-top: 16/@rem;
        font-size: 26/@rem;
        line-height: 36/@rem;
        box-sizing: border-box;
        left: 0;
        bottom: 0;
        right: 0;
      }
    }
    .home-already {
      padding: 0 36/@rem;
      h2 {
        .text(50, 70);
        margin-top: 40/@rem;
        margin-bottom: 30/@rem;
        span {
          font-size: 26/@rem
        }
      }
      .already-book {
        background: #eee;
        height: 300/@rem;
        border-radius: 20/@rem;
        position: relative;
        .book-img {
          .pos(40, 30);
          .size(170, 240);
          border: 5/@rem solid #fff;
          box-sizing: border-box;
        }
        .book-name {
          .pos(245, 30);
          .text(30, 42);
          color: #333;
        }
        .book-msg {
          .pos(256, 86);
          font-size: 26/@rem;
          line-height: 36/@rem;
          color: #555;
          padding-right: 32/@rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .book-btn {
          .pos(256, 218);
          .size(160, 54);
          .text(30, 54);
          background: #ffe555;
          border-radius: 50/@rem;
          text-align: center;
          color: #333;
        }
      }
      .already-list {
        text-align: center;
        padding: 0 14/@rem;
        .item {
          float: left;
          margin-right: 70/@rem;
          border-radius: 6/@rem;
          overflow: hidden;
          position: relative;
          width: 170/@rem;
          .item-img {
            .size(170, 240);
            display: block;
            background: #000;
          }
          .item-name {
            font-size: 24/@rem;
            line-height: 32/@rem;
            color: #333;
            margin-top: 20/@rem;
            margin-bottom: 36/@rem;
          }
          .item-lock {
            background: #000;
            opacity: 0.6;
          }
        }
        .item:nth-last-child(3) {
          margin-right: 0;
        }
      }
      .already-alert {
        position: fixed;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        z-index: 999;
        background:rgba(0,0,0,0.5);
        .alert-top {
          padding: 26/@rem 35/@rem;
          background: #f5f5f8;
          position: absolute;
          left: 0;
          bottom: 88/@rem;
          h3 {
            .text(34, 40);
            text-align: center;
            margin-bottom: 60/@rem;
            font-weight: normal;
          }
          .item {
            .size(140, 64);
            .text(40, 64);
            text-align: center;
            color: #444;
            background: #FFE555;
            border-radius: 10/@rem;
            margin-right: 40/@rem;
            margin-bottom: 30/@rem;
            float: left;
          }
          .none {
            background: #E6E6E6;
            color: #bababa;
          }
          .item:nth-last-child(3) {
            margin-right: 0;
          }
        }

        .alert-btn {
          .text(30, 88);
          position: absolute;
          left: 0;
          bottom: 0;
          right: 0;
          text-align: center;
          color: #888;
          background: #fff;
        }
      }
    }
  }

</style>

