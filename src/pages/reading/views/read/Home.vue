<template>
  <div class="home-main">
    <!-- <div @click="play">播放</div> -->
    <!-- 未买课 -->

    <div class="home-box" v-show="pageStatus == 1 || pageStatus == 0">
      <div class="home-tab clearfix">
        <div class="item" @click="tabActive=true">
          <span :class="{ active: tabActive}">简介</span>
        </div>
        <div class="item" @click="tabActive=false">
          <span :class="{ active: !tabActive}">课程</span>
        </div>
      </div>
      <div class="home-bottom" @click="tabActive = false" :style="{bottom:bottomNavToggle?'100px':'0px'}" v-show="tabActive">去选课程</div>
      <div class="home-btn" :style="{bottom:bottomNavToggle?'100px':'0'}" v-show="!tabActive">
        <p>
          <span class="text-del">{{selectCourseObj.costPrice}}</span>
          <span class="text-red">¥{{selectCourseObj.presentPrice}}</span>元</p>
        <span @click="orderPay" class="btn-pay">立即购买</span>
      </div>
      <div class="home-test" ref="homemain">
        <div>
          <div class="home-content">
            <img src="http://yun.dui88.com/youfen/images/read_detail.jpg" alt="">
          </div>
          <div class="home-review" v-if="reviewList.length> 0">
            <h2>学员观点</h2>
            <div class="item" v-for="(item,index) in reviewList" :key="index">
              <img :src="item.userImgUrl" alt="" class="item-header">
              <div class="item-name">{{item.userNickname}}</div>
              <div class="item-periods">{{item.readName}}第{{item.readStageNum}}学员</div>
              <div class="item-content">{{item.readName}}</div>
              <div class="item-book">
                <div class="book-bg">
                  <img class="book-img" :src="item.courseUrl" alt="">
                </div>

                <div class="book-name otw">{{item.courseTitle}}</div>
                <div class="book-author otw">{{item.courseAuthor}} 著</div>
              </div>
              <div class="item-bottom">
                <span @click="getCommentPraise(item.id,item.userPraise)" v-if="pageStatus != 0">
                  <i class="iconfont icon-heart fr" :style="{color:item.userPraise?'red':'#000'}"></i>
                  <span class="fr">{{item.praiseCount}}</span>
                </span>
                <!-- <router-link :to="{ path: '/poster/' + item.id}" tag="a" class="iconfont icon-share fr"></router-link> -->
                <span>{{item.releaseTime| timeTransition}}</span>
              </div>

            </div>
          </div>
        </div>
        <div>
          <div class="home-course">
            <div class="item" v-for="(item,index) in readList" :key="index" :class="{active: selectCourseId == item.readId,none: item.purchased}"
              @click="selectCourse(item)">
              <div class="item-box">
                <div class="item-top">
                  <div class="item-none" v-if="item.purchased"></div>
                  <div class="item-name">{{item.title}}</div>
                  <div class="item-msg">第{{item.stageNum}}期 | {{item.beginDate}}（{{item.beginDateWeek}}）开课</div>
                  <div class="item-num">报名{{item.orderCount}}人</div>
                  <div class="item-btn">{{selectCourseId == item.readId?'已选':'选择'}}</div>
                </div>
                <div class="item-bottom">
                  <p v-html="item.briefer"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home-wechat" v-if="pageStatus == 2">
      <p class="text-a">
        <i class="iconfont icon-chenggong">&#xe608;</i>您已成功报名</p>
      <p class="text-b">长按识别二维码</p>
      <p class="text-c">关注公众号，去等待开课</p>
      <img src="http://yun.dui88.com/youfen/images/read_ewm.png" alt="">
    </div>
    <!-- 未开课 -->
    <div class="home-nonevent" v-if="pageStatus == 3">
      <div class="nonevent-box">
        <p class="text-a">您已成功报名</p>
        <p class="text-b">「 {{courseDetail.title}} 」</p>
        <p class="text-c">{{courseDetail.beginDate}}（{{courseDetail.beginDateWeek}}）开学，倒计时{{courseDetail.days}}天</p>
      </div>
      <p class="text-d">长按识别二维码添加老师微信</p>
      <p class="text-e">因添加学员较多，老师会在3个工作日内通过，请耐心等待~</p>
      <div class="ewm-bg">
        <img :src="courseDetail.teacherWxQrcodeUrl" alt="">
      </div>
      <!-- <p class="text-f">{{courseDetail.userNickname}}</p> -->
      <p class="text-g">微信添加老师后，你的专属老师会在课程</br>开始前邀请你进入对应班级群</p>
      <p class="text-h">关注微信公众号【一修读书】，点击</br>菜单栏“我的老师”添加</p>
    </div>

    <div class="home-already" v-if="pageStatus == 4">
      <AudioBar/>
      <h2>今日学习
        <span> | 第{{todayBookDetail.days}}/{{todayBookDetail.totalDays}}天</span>
      </h2>
      <div class="already-book">
        <img :src="todayBookDetail.courseUrl" alt="" class="book-img">
        <div class="book-name">《{{todayBookDetail.courseTitle}}》</div>
        <div class="book-msg">{{todayBookDetail.courseSubTitle}}</div>
        <div class="book-btn" @click="playAudio(todayBookDetail.courseId)">播放
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <h2>我的书架
        <span> | 缺卡{{todayBookDetail.lackClockDays}}天</span>
      </h2>
      <div class="already-list clearfix">
        <div class="item" v-for="(item,index) in historyBookList" :key="index" @click="getCourseList(item.id,item.title)">
          <div class="item-box">
            <img :src="item.imgUrl" alt="" class="item-img">
            <div class="item-lock" v-if="item.lockStatus">
              <i class="iconfont icon-lock"></i>
            </div>
          </div>
          <div class="item-name">{{item.title}}</div>
        </div>
      </div>
      <div class="already-alert" v-show="alertToggle">
        <div class="alert-top">
          <h3>{{bookName}}</h3>
          <div class="clearfix">
            <div class="item" v-for="(item,index) in courseList" :key="index" :class="{none: item.lockStatus}" @click="playAudio(item.courseId)">{{index+1}}</div>
          </div>
        </div>
        <div class="alert-btn" @click="alertToggle = false;">取消</div>
        <div class="alert-bg" @click="alertToggle = false;"></div>
      </div>
    </div>

  </div>
</template>

<script>
  import AudioBar from '../../components/basic/Audio_Bar';
  import play from '../../api/play';
  import order from '../../api/order';
  import store from '../../vuex/store';


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
        readList: [],
        tabActive: true,
        bookName: '',
        alertToggle: false,
        readId: '',

        pageStatus: 10, // 页面状态

        selectCourseId: 0, // 已选课程
        selectCourseObj: {},
        teacherWxName: '', // 老师名称
        teacherWxQrcodeUrl: '', // 老师微信二维码
        courseDetail: {}, // 课程详情
        todayBookDetail: {}, // 今日书
        historyBookList: [], // 历史书
        courseList: [], // 书对应列表

      };
    },
    computed: {
      ...mapState(['bottomNavToggle', 'bottomNavType'])
    },
    filters: {
      // 时长
      timeTransition: function (value) {
        let nowDate = new Date()
        let nowDateNum = nowDate.getTime()
        let valueDate = new Date(value)
        let valueDateNum = valueDate.getTime()
        let key = nowDateNum - valueDateNum

        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        let yesterday = new Date(today);
        let yesterdayNum = yesterday.getTime()
        let yes = valueDateNum - yesterdayNum;

        let Y, M, D, h, m, s;
        Y = valueDate.getFullYear() + '-';
        M = (valueDate.getMonth() + 1 < 10 ? '0' + (valueDate.getMonth() + 1) : valueDate.getMonth() + 1) + '-';
        D = (valueDate.getDate() < 10 ? '0' + valueDate.getDate() : valueDate.getDate()) + ' ';
        h = (valueDate.getHours() < 10 ? '0' + valueDate.getHours() : valueDate.getHours()) + ':';
        m = (valueDate.getMinutes() < 10 ? '0' + valueDate.getMinutes() : valueDate.getMinutes());
        let text = '';

        if (key > 0 && key < 60 * 1000) {
          text = '刚刚'
        }

        if (key >= 60 * 1000 && key < 60 * 60 * 1000) {
          text = Math.floor(key / (60 * 1000)) + '分钟前'
        }

        if (key >= 60 * 60 * 1000 && key < 2 * 60 * 60 * 1000) {
          text = '1小时前'
        }

        if (key >= 2 * 60 * 60 * 1000 && key < yes) {
          text = h + m
        }

        if (key >= yes) {
          text = M + D
        }
        return text
      },
    },
    created() {},
    async mounted() { 
      // 如果是支付流程直接支付
      if (this.$route.query.dcd) {
        this.getDcd(this.$route.query.dcd)
      }
      if (this.$route.query.courseId) {
        order.buy(this.$route.query.courseId, 4)
      }
      this.wxShare();
      let userState = await this.getThumbUp();
      console.log(userState)

      this.readId = userState.data.readId;
      // 状态判断逻辑
      if (userState.data) {
        if (
          userState.data.readState == -1
        ) {
          console.log('用户未购买未授权')
          this.getCommentTop();
          this.getReadList();
          this.pageStatus = 0;
          store.commit({
            type: 'setBottomNavToggle',
            bottomNavToggle: false
          })
          store.commit({
            type: 'setBottomNavType',
            bottomNavType: false
          })

        }
        if (
          userState.data.readState == 0
        ) {
          console.log('用户未购买已授权')
          this.getCommentTop();
          this.getReadList();
          this.pageStatus = 1;
          store.commit({
            type: 'setBottomNavToggle',
            bottomNavToggle: false
          })
          store.commit({
            type: 'setBottomNavType',
            bottomNavType: false
          })
        }

        if (
          userState.data.readState > 0 && !userState.data.followOfficialAccount
        ) {
          console.log('用户购买未关注')
          this.pageStatus = 2;
          this.tabActive = userState.data.readState != 4
          store.commit({
            type: 'setBottomNavToggle',
            bottomNavToggle: true
          })
          store.commit({
            type: 'setBottomNavType',
            bottomNavType: false
          })
        }

        if (
          userState.data.readState == 1 && userState.data.followOfficialAccount
        ) {
          console.log('用户购买已关注未开课')
          this.teacherWxName = userState.data.teacherWxName;
          this.teacherWxQrcodeUrl = userState.data.teacherWxQrcodeUrl;

          this.courseDetail = await this.readDetail();
          this.pageStatus = 3;
          store.commit({
            type: 'setBottomNavToggle',
            bottomNavToggle: true
          })
          store.commit({
            type: 'setBottomNavType',
            bottomNavType: false
          })
        }

        if (
          userState.data.readState == 2 && userState.data.followOfficialAccount
        ) {
          console.log('用户购买已关注已开课')
          this.getDetail();
          this.getBookList();
          this.pageStatus = 4;
          store.commit({
            type: 'setBottomNavToggle',
            bottomNavToggle: true
          })
          store.commit({
            type: 'setBottomNavType',
            bottomNavType: true
          })
        }

        if (
          userState.data.readState == 3 && userState.data.followOfficialAccount
        ) {
          console.log('用户购买已关注已读完')
          this.getCommentTop();
          this.getReadList();
          this.pageStatus = 1;
          store.commit({
            type: 'setBottomNavToggle',
            bottomNavToggle: true
          })
          store.commit({
            type: 'setBottomNavType',
            bottomNavType: false
          })
        }
      }

      // store.commit({
      //   type: 'setBottomNavToggle',
      //   bottomNavToggle: false
      // })
      // store.commit({
      //   type: 'setBottomNavType',
      //   bottomNavType: false
      // })
      this.changeLoginDays();
      this.changeReadStatus();
      // window.addEventListener('scroll', this.handleScroll,true);
      console.log(this.$refs)
      console.log(this.$refs.homemain)
      let self = this;
      self.$refs.homemain.addEventListener('scroll', self.dispatchScroll, true);

    },
    methods: {

      dispatchScroll(e) {
        console.log(this.$refs.homemain.scrollTop)
        // if(this.$refs.homemain.scrollTop > 7000){
        //   this.tabActive = false;
        //   console.log('sadas')
        // }
      },
      getDcd(dcd) {
        let self = this;
        let params = {};
        params = {
          dcd: dcd,
        }
        const url = `/distribution/binding`;
        this.$http.get(url, {
          params
        }).then((res) => {

        });
      },
      changeLoginDays() {
        let self = this;
        let params = {};
        params = {}
        const url = `/user/stat/changeLoginDays`;
        this.$http.get(url, {
          params
        }).then((res) => {

        });
      },
      changeReadStatus() {
        let self = this;
        let params = {};
        params = {}
        const url = `/user/stat/changeReadStatus`;
        this.$http.get(url, {
          params
        }).then((res) => {

        });
      },
      orderPay() {
        order.buy(this.selectCourseId, 4)
      },
      playAudio(id) {
        play.audioInit(this.readId, id, true)
        // 跳转到播放页
        this.$router.push('/audio/index/1')
      },
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
        const url = `/user/read/detail`;
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
        const url = `/user/read/state`;
        const res = await this.$http.get(url, {
          params
        });
        return res.data;
      },

      getCommentTop() {
        let self = this;
        let params = {};
        params = {}
        const url = `/comment/top`;
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
        const url = `/comment/praise`;
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
        const url = `/read/readList`;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.readList = res.data.data;
          if (res.data.data.length > 0) {
            this.selectCourseId = res.data.data[0].readId
            this.selectCourseObj = res.data.data[0];

          }
        });
      },

      getDetail() {
        let self = this;
        let params = {};
        let newDate = new Date();
        let n = newDate.getFullYear();
        let m = newDate.getMonth() + 1;
        if (m < 10) {
          m = '0' + m
        }
        let d = newDate.getDate();
        let date = n + '-' + m + '-' + d;
        params = {
          readId: this.readId,
          date: date,
        }
        const url = `/readBookCourse/courseDetailByDate`;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.todayBookDetail = res.data.data;
        });
      },
      getBookList() {
        let self = this;
        let params = {};
        params = {
          readId: this.readId,
        }
        const url = `/readBook/bookList`;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.historyBookList = res.data.data.content;
        });
      },
      getCourseList(id, name) {
        let self = this;
        let params = {};
        params = {
          readId: this.readId,
          bookId: id,
        }
        const url = `/readBookCourse/courseList`;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.courseList = res.data.data;
          this.bookName = name;
          this.alertToggle = true;
        });
      }



    }
  };

</script>

<style lang="less">
  /* @import '../../less/letiable'; */

  @import '../../less/util';

  .home-main {
    width: 750/@rem;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    background: #fff;
    font-size: 24/@rem;
    .icon-nav {
      height: 480/@rem;
      border: 1px solid #ccc;
    }
    .home-test {
      height: 100%;
      overflow: scroll;
      padding-top: 108/@rem;
      box-sizing: border-box;
    }
    .home-box {
      height: 100%;
    }
    .home-tab {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
      z-index: 999;
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
    .home-btn {
      .text(24, 100);
      position: fixed;
      right: 0;
      bottom: 0;
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
      .btn-pay {
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
    .home-content {
      img {
        display: block;
        width: 750/@rem;
        border-bottom: 20/@rem solid #f0f0f0;
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
          .book-bg {}
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
    .home-bottom {
      .text(40, 100);
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

      .item,
      .item-name,
      .item-box,
      .item-top,
      .item-msg,
      .item-num,
      .item-btn,
      .item-bottom {
        transition: all 0.25s ease;
        -moz-transition: all 0.25s ease;
        /* Firefox 4 */
        -webkit-transition: all 0.25s ease;
        /* Safari and Chrome */
        -o-transition: all 0.25s ease;
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
          .item-none {
            .size(150, 117);
            position: absolute;
            right: 0;
            top: 0;
            background: url('http://yun.dui88.com/youfen/images/read_yz.png') no-repeat center;
            background-size: 100% 100%;
          }
          .item-name {
            .pos(40,
            22);
            .text(44,
            62);
            color: #333;
            font-weight: blod;
          }
          .item-msg {
            .pos(40,
            103);
            .text(26,
            37);
            color: #333;
          }
          .item-num {
            .pos(40,
            145);
            .text(26,
            37);
            color: #333;
          }
          .item-btn {
            .size(130,
            56);
            .text(32,
            56);
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
          font-size: 28/@rem  !important;
          line-height: 52/@rem;
          padding: 29/@rem 40/@rem;
          background: #fff;
          box-sizing: border-box;
          span,
          p,
          div {
            font-size: 28/@rem  !important;
          }
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
            .pos(40,
            22);
            /* .text(48,
            67); */
          }
          .item-msg {
            .pos(40,
            109);
            /* .text(28,
            40); */
            color: #333;
          }
          .item-num {
            .pos(40,
            157);
            /* .text(28,
            40); */
            color: #333;
          }
          .item-btn {
            .size(130,
            56);
            /* .text(32,
            56); */
            position: absolute;
            top: 124/@rem;
            background: #FF4C4C;
            border-color: #FF4C4C;
            color: #fff;
          }
        }
        .item-bottom {
          /* height: 230/@rem; */
          /* font-size: 30/@rem  !important; */
          line-height: 52/@rem;
          padding: 37/@rem 40/@rem;
          /* span,
          p,
          div {
            font-size: 30/@rem  !important;
          } */
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
        .text(40,
        56);
        font-weight: bold;
        text-align: center;
        padding-top: 65/@rem;
        color: #343434;
        .icon-chenggong {
          font-size: 56/@rem;
          line-height: 56/@rem;
          color: #FFE555;
          margin-right: 24/@rem;
        }
      }
      .text-b {
        .text(88,
        123);
        font-weight: bold;
        text-align: center;
        padding-top: 17/@rem;
        color: #343434;
      }
      .text-c {
        .text(40,
        56);
        text-align: center;
        padding-top: 24/@rem;
        color: #666;
      }
      img {
        .size(688,
        688);
        margin: 40/@rem auto;
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
        background: url('http://yun.dui88.com/youfen/images/read_bg.png') no-repeat center;
        background-size: 100% 100%;
        border-radius: 20/@rem;
        color: #333333;
        padding-top: 93/@rem;
        box-sizing: border-box;
        .text-a {
          .text(50,
          70);
          font-weight: bold;
        }
        .text-b {
          .text(28,
          40);
          margin-top: 10/@rem;
        }
        .text-c {
          .text(30,
          42);
          margin-top: 15/@rem;
          font-weight: bold;
        }
      }
      .ewm-bg {
        background: url('http://yun.dui88.com/youfen/images/read_ewmborder.png') no-repeat center;
        background-size: 100% 100%;
        height: 326/@rem;
        width: 326/@rem;
        margin: 30/@rem auto;
        padding: 15/@rem;
        box-sizing: border-box;
        img {
          display: block;
          height: 280/@rem;
          width: 280/@rem;
        }
      }
      .text-d {
        .text(36,
        50);
        margin-top: 34/@rem;
        font-weight: bold;
        color: #116EBC;
      }
      .text-e {
        .text(22,
        30);
        margin-top: 12/@rem;
        color: #666;
      }
      .text-f {
        .text(36,
        50);
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
        position: fixed;
        height: 116/@rem;
        background: #EEEEEE;
        color: #666;
        padding-top: 16/@rem;
        font-size: 26/@rem;
        line-height: 42/@rem;
        box-sizing: border-box;
        left: 0;
        bottom: 100/@rem;
        right: 0;
      }
    }
    .home-already {
      padding: 0 36/@rem;
      h2 {
        .text(50,
        70);
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
          .pos(40,
          30);
          .size(170,
          240);
          border: 5/@rem solid #fff;
          box-sizing: border-box;
        }
        .book-name {
          .pos(245,
          30);
          .text(30,
          42);
          color: #333;
        }
        .book-msg {
          .pos(256,
          86);
          font-size: 26/@rem;
          line-height: 36/@rem;
          color: #555;
          padding-right: 32/@rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
        .book-btn {
          .pos(256,
          218);
          .size(160,
          54);
          .text(30,
          54);
          background: #ffe555;
          border-radius: 50/@rem;
          text-align: center;
          color: #333;
          .icon-bofang {
            font-size: 30/@rem;
            line-height: 54/@rem;
          }
        }
      }
      .already-list {
        text-align: center;
        padding: 0 14/@rem;
        .item {
          float: left;
          margin-right: 70/@rem;
          overflow: hidden;
          position: relative;
          width: 170/@rem;
          .item-box {
            position: relative;
            border-radius: 6/@rem;
            overflow: hidden;
          }
          .item-img {
            .size(170,
            240);
            display: block;
          }
          .item-name {
            font-size: 24/@rem;
            line-height: 32/@rem;
            color: #333;
            margin-top: 20/@rem;
            margin-bottom: 36/@rem;
          }
          .item-lock {
            background: rgba(0, 0, 0, 0.7);
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            text-align: center;
            line-height: 240/@rem;
          }
          .icon-lock {
            font-size: 30/@rem;
            color: #fff;
          }
        }
        .item:nth-child(3n) {
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
          right: 0;
          h3 {
            .text(34,
            40);
            text-align: center;
            margin-bottom: 60/@rem;
            font-weight: normal;
          }
          .item {
            .size(140,
            64);
            .text(40,
            64);
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
          .item:nth-child(4n) {
            margin-right: 0;
          }
        }

        .alert-btn {
          .text(30,
          88);
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

