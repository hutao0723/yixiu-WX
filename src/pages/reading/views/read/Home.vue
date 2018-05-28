<template>
  <div class="home-main" ref="homeMain">
    <!-- 未买课 -->
    <div class="home-box">
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
            <img :src="item.userImgUrl" alt="" class="item-header">
            <div class="item-name">{{item.userNickname}}</div>
            <div class="item-periods">{{item.readName}}第{{item.readStageNum}}学员</div>
            <div class="item-content">{{item.readName}}</div>
            <div class="item-book">
              <img class="book-img" :src="item.courseUrl" alt="">
              <div class="book-name otw">{{item.courseTitle}}</div>
              <div class="book-author otw">{{item.courseAuthor}} 著</div>
            </div>
            <div class="item-bottom">
              <span @click="getCommentPraise(item.id,item.userPraise)">
                <i class="iconfont icon-heart fr" :style="{color:item.userPraise?'red':'#000'}"></i>
                <span class="fr">16</span>
              </span>
              <i class="iconfont icon-share fr"></i>
              <span>{{item.releaseTime | timeTransition}}</span>
            </div>

          </div>
        </div>
        <div class="home-bottom">去选课程</div>
      </div>

      <div v-show="!tabActive">
        <div class="home-course">
          <div class="item" v-for="(item,index) in courseList" :key="index" :class="{active: selectCourseId == item.readId,none: item.purchased}"
            @click="selectCourse(item)">
            <div class="item-box">
              <div class="item-top">
                <div class="item-name">{{item.title}}</div>
                <div class="item-msg">第{{item.stageNum}}期 | {{item.beginDate}}({{item.beginDateWeek}})开课</div>
                <div class="item-num">报名{{item.orderCount}}人</div>
                <div class="item-btn">{{selectCourseId == 0?'选择':'已选'}}</div>
              </div>
              <div class="item-bottom">
                <p v-html="item.briefer"></p>
              </div>
            </div>
          </div>
          <div class="home-btn">
            <p>
              <span class="text-del">{{selectCourseObj.costPrice}}</span>
              <span class="text-red">¥{{selectCourseObj.presentPrice}}</span>元</p>
            <a href="javascriot:void(0)">立即购买</a>
          </div>
        </div>
      </div>

    </div>
    <div class="home-wechat" v-if="pageStatus == 5">
      <p class="text-a">
        <i></i>您已成功报名</p>
      <p class="text-b">长按识别二维码</p>
      <p class="text-c">关注公众号，去等待开课</p>
      <img src="" alt="">
    </div>

    <!-- 未开课 -->
    <div class="home-nonevent" v-if="pageStatus == 3">
      <div class="nonevent-box">
        <p class="text-a">您已成功报名</p>
        <p class="text-b">「 {{courseObj.name}} 」</p>
        <p class="text-c">{{courseDetail.beginDate}}(开学，倒计时{{courseObj.date}}天</p>
      </div>
      <p class="text-d">长按识别二维码添加老师微信</p>
      <p class="text-e">因添加学员较多，老师会在3个工作日内通过，请耐心等待~</p>
      <img src="" alt="">
      <p class="text-f">美少女</p>
      <p class="text-g">微信添加老师后，你的专属老师会在课程</br>开始前邀请你进入对应班级群</p>
      <p class="text-h">关注微信公众号【一修读书】，点击</br>菜单栏“我的老师”添加</p>
    </div>

    <div class="home-already" v-if="pageStatus == 0">
      <h2>今日学习
        <span> | 第{{alreadyObj.nowDay}}/{{alreadyObj.totalDay}}天</span>
      </h2>
      <div class="already-book">
        <img src="" alt="" class="book-img">
        <div class="book-name">{{alreadyObj.name}}</div>
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
          <div class="item-name">{{item.name}}</div>
        </div>
      </div>
      <div class="already-alert" v-show="alertToggle">
        <div class="alert-top">
          <h3>{{bookName}}</h3>
          <div class="clearfix">
            <div class="item" v-for="(item,index) in 6" :key="index" :class="{none: index >4}">{{item}}</div>
          </div>
        </div>
        <div class="alert-btn" @click="alertToggle = false;">取消</div>
        <div class="alert-bg" @click="alertToggle = false;"></div>
      </div>
    </div>

    <AudioBar/>
  </div>
</template>

<script>
  import AudioBar from '../../components/basic/Audio_Bar';
  import {
    mapState
  } from 'vuex';
  export default {
    components: {
      AudioBar
    },
    data() {
      return {
        reviewList: [],
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
        tabActive: true,
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

        pageStatus: 0, // 页面状态

        selectCourseId: 0, // 已选课程
        selectCourseObj: {},
        teacherWxName: '', // 老师名称
        teacherWxQrcodeUrl: '', // 老师微信二维码
        courseDetail: {}, // 课程详情
      };
    },
    computed: {
      ...mapState({})
    },
    filters: {
      // 时长
      timeTransition: function (value) {

        return value
      },
    },
    created() {},
    async mounted() {

      let userState = await this.getThumbUp();
      console.log(userState)
      // 状态判断逻辑
      if (userState.data) {
        if (
          userState.data.readState == 0
        ) {
          console.log('用户未购买')
          this.pageStatus = 1;
        }

        if (
          userState.data.readState != 0 && !userState.data.followOfficialAccount
        ) {
          console.log('用户购买未关注')
          this.pageStatus = 2;
          this.tabActive = userState.data.readState != 4
        }

        if (
          userState.data.readState == 1 && userState.data.followOfficialAccount
        ) {
          console.log('用户购买已关注未开课')
          this.pageStatus = 3;
        }

        if (
          userState.data.readState == 2 && userState.data.followOfficialAccount
        ) {
          console.log('用户购买已关注已开课')
          this.pageStatus = 4;
        }

      }


      // 1
      this.getCommentTop();
      this.getReadList();
      // 2

      // 3
      this.teacherWxName = userState.data.teacherWxName;
      this.teacherWxQrcodeUrl = userState.data.teacherWxQrcodeUrl;

      this.courseDetail = await this.readDetail();
      console.log(this.courseDetail)




    },
    methods: {
      selectCourse(item) {
        if (this.selectCourseId != item.readId && !item.purchased) {
          this.selectCourseId = item.readId;
          this.selectCourseObj = item;
        }
      },
      async readDetail() {
        let self = this;
        let params = {};
        params = {}
        const url = `/api/user/read/detail`;
        const res = await this.$http.get(url, {
          params
        });
        return res.data.data;
      },
      async getThumbUp() {
        let self = this;
        let params = {};
        params = {

        }
        const url = `/api/user/read/state`;
        const res = await this.$http.get(url, {
          params
        });
        return res.data;
      },

      getCommentTop() {
        let self = this;
        let params = {};
        params = {}
        const url = `/api/comment/top`;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.reviewList = res.data.data.content;

        });
      },
      getCommentPraise(id, status) {
        let self = this;
        let params = {};
        params = {
          status: status ? 0 : 1,
          commentId: id
        }
        const url = `/api/comment/praise`;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.getCommentTop();
        });
      },
      getReadList() {
        let self = this;
        let params = {};
        params = {}
        const url = `/api/read/readList`;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.courseList = res.data.data;
          if (res.data.data.length > 0) {
            this.selectCourseId = res.data.data[0].readId
            this.selectCourseObj = res.data.data[0];

          }
        });
      },



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
      padding-bottom: 120/@rem;
      h2 {
        .text(40, 120);
        color: #333;
        text-align: center;
      }
      .item {
        position: relative;
        /* height: 560/@rem; */
        padding: 36/@rem 36/@rem 30/@rem 118/@rem;
        .item-header {
          .size(64, 64);
          .pos(30, 40);
          border-radius: 50%;
          overflow: hidden;
          background: #000;
        }
        .item-name {
          /* .pos(118, 36); */
          .text(30, 42);
          color: #333;
        }
        .item-periods {
          /* .pos(118, 82); */
          .text(24, 33);
          color: #666;
          margin-top: 4/@rem;
          margin-bottom: 14/@rem;
        }
        .item-content {
          /* .pos(118, 130); */
          font-size: 30/@rem;
          line-height: 42/@rem;
          color: #666;
        }
        .item-book {
          .size(596, 148);
          /* .pos(118, 318); */
          position: relative;
          background: #eee;
          border-radius: 4/@rem;
          margin-top: 20/@rem;
          margin-bottom: 35/@rem;
          .book-img {
            .pos(30, 13);
            .size(80, 112);
            border: 5/@rem solid #fff;
          }
          .book-name {
            .pos(0, 25);
            .text(30, 42);
            color: #555;
            width: 100%;
            padding-left: 134/@rem;
            padding-right: 10/@rem;
            box-sizing: border-box;

          }
          .book-author {
            .pos(0, 75);
            .text(26, 37);
            color: #666;
            width: 100%;
            padding-left: 134/@rem;
            padding-right: 10/@rem;
            box-sizing: border-box;
          }
        }
        .item-bottom {
          .size(22, 30);
          /* position: absolute; */
          /* bottom: 30/@rem; */
          /* left: 0; */
          width: 100%;
          box-sizing: border-box;
          .iconfont {
            line-height: 30/@rem;
            font-size: 24/@rem;
            padding: 0 10/@rem
          }
        }
      }
      .item:after {
        content: '';
        height: 1/@rem;
        background: #eee;
        margin-left: 118/@rem;
        margin-right: 36/@rem;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 596/@rem;
        box-sizing: border-box;
      }

    }
    .home-bottom{
      .text(40,100);
      position: fixed;
      left: 0;
      bottom: 0;
      background: #FF4C4C;
      color: #fff;
      width: 100%;
      z-index: 999;
      text-align: center;
    }
    .home-course {
      background: #f1f1f1;
      padding: 40/@rem 0 120/@rem 0;
      .home-btn {
        .text(24, 100);
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        z-index: 999;
        background: #fff;
        color: #FF4C4C;
        padding-left: 80/@rem;
        padding-right: 386/@rem;
        box-sizing: border-box;
        text-align: right;
        .text-del {
          color: #777;
          text-decoration: line-through;
        }
        .text-red {
          font-size: 40/@rem;
          margin-left: 20/@rem;
          margin-right: 6/@rem;

        }
        a {
          .size(360, 100);
          .text(40, 100);
          position: absolute;
          right: 0;
          top: 0;
          background: #FF4C4C;
          color: #fff;
          text-align: center;
        }
      }
      .item,
      .item-name,
      .item-box,
      .item-top,
      .item-msg,
      .item-num,
      .item-btn,
      .item-bottom {
        transition: all 0.5s;
        -moz-transition: all 0.5s;
        /* Firefox 4 */
        -webkit-transition: all 0.5s;
        /* Safari and Chrome */
        -o-transition: all 0.5s;
        /* Opera */
      }
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
          /* height: 220/@rem; */
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
          /* height: 230/@rem; */
          font-size: 30/@rem;
          line-height: 52/@rem;
          padding: 37/@rem 40/@rem;
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
    .home-wechat {
      .text-a {
        .text(40, 56);
        font-weight: bold;
        text-align: center;
        padding-top: 65/@rem;
        color: #343434;
      }
      .text-b {
        .text(88, 123);
        font-weight: bold;
        text-align: center;
        padding-top: 17/@rem;
        color: #343434;
      }
      .text-c {
        .text(40, 56);
        text-align: center;
        padding-top: 24/@rem;
        color: #666;
      }
      img {
        .size(688, 688);
        margin: 40/@rem auto;
        background: #666;
        display: block;
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
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 999;
        .alert-bg {
          position: fixed;
          left: 0;
          bottom: 0;
          top: 0;
          right: 0;
          z-index: 999;
          background: rgba(0, 0, 0, 0.5);
        }
        .alert-top {
          padding: 26/@rem 35/@rem;
          background: #f5f5f8;
          position: absolute;
          left: 0;
          bottom: 88/@rem;
          z-index: 9999;
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
          z-index: 9999;
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

