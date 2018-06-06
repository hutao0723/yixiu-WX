<template>
  <div class="home-main">
    <div class="home-type" v-show="pageStatus == 1 || pageStatus == 0">
      <a href="https://kefu.easemob.com/webim/im.html?configId=f56195f3-2ff6-412b-983e-0231f5586efb" class="home-service" :class="{bottom:bottomNavToggle}"></a>
      <div class="home-tab clearfix" id="hometab">
        <div class="item" @click="tabActiveToggle(true)">
          <span :class="{ active: tabActive}">简介</span>
        </div>
        <div class="item" @click="tabActiveToggle(false)">
          <span :class="{ active: !tabActive}">课程</span>
        </div>
      </div>
      <div class="home-bottom" @click="tabActiveToggle(false)" :class="{bottom:bottomNavToggle}" v-show="tabActive">去选课程</div>
      <div class="home-btn" :class="{bottom:bottomNavToggle}" v-show="!tabActive">
        <p>
          <span class="text-del">{{selectCourseObj.costPrice}}</span>
          <span class="text-red">¥{{selectCourseObj.presentPrice}}</span>元</p>
        <span @click="orderPay" class="btn-pay">立即购买</span>
      </div>


      <div id="maincontent" class="home-detail" ref="homemain" v-show="tabActive">
        <div class="home-content">
          <img src="http://yun.dui88.com/youfen/images/read_img01.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/read_img02.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/read_img03.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/read_img04.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/read_img05.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/read_img06.jpg" alt="">
        </div>
        <div class="home-review" v-if="reviewList.length> 0">
          <h2>学员观点</h2>
          <div class="item" v-for="(item,index) in reviewList" :key="index">
            <img :src="item.userImgUrl" alt="" class="item-header">
            <div class="item-name">{{item.userNickname}}</div>
            <div class="item-periods">{{item.readName}}第{{item.readStageNum}}期学员</div>
            <div class="item-content">{{item.content}}</div>
            <div class="item-book">
              <div class="book-bg">
                <img class="book-img" :src="item.courseUrl" alt="">
              </div>

              <div class="book-name otw">{{item.courseTitle}}</div>
              <div class="book-author otw" v-if="item.courseAuthor">{{item.courseAuthor}} 著</div>
            </div>
            <div class="item-bottom">
              <span @click="getCommentPraise(item.id,item.userPraise)" v-if="pageStatus != 0">
                <i class="iconfont icon-heart fr" :style="{color:item.userPraise?'red':'#000'}"></i>
                <span class="fr">{{item.praiseCount}}</span>
              </span>
              <router-link :to="{ path: '/poster/' + item.id+'/0/1'}" tag="a" class="iconfont icon-share fr"></router-link>
              <span>{{item.releaseTime| timeTransition}}</span>
            </div>
          </div>
        </div>
        <h3>上滑加载更多精彩课程
          <i class="iconfont">&#xe61e;</i>
        </h3>
      </div>
      <div class="home-course" v-show="!tabActive">
        <div class="item" v-for="(item,index) in readList" :key="index" :class="{active: selectCourseId == item.readId,none: item.purchased}"
          @click="selectCourse(item)">
          <div class="item-box">
            <div class="item-top">
              <div class="item-none" v-if="item.purchased"></div>
              <div class="item-name">{{item.title}}</div>
              <div class="item-msg">第{{item.stageNum}}期
                <i></i>{{item.beginDate}}（{{item.beginDateWeek}}）开课</div>
              <div class="item-num">报名{{item.orderCount}}人</div>
              <div class="item-btn" v-show="selectCourseId != item.readId">选择</div>
              <div class="item-btn red" v-show="selectCourseId == item.readId">已选</div>
            </div>
            <div class="item-bottom">
              <p v-html="item.briefer"></p>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- 报名未关注 -->
    <div class="home-wechat" v-if="pageStatus == 2">
      <p class="text-a">
        <i class="iconfont"></i>您已成功报名</p>
      <p class="text-b">长按识别二维码</p>
      <p class="text-c">关注公众号，去等待开课</p>
      <img src="http://yun.dui88.com/youfen/images/read_ewm3.png" alt="">
    </div>
    <!-- 报名未开课 -->
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
      <p class="text-g">微信添加老师后，你的专属老师会在课程</br>开始前邀请你进入对应班级群</p>
    </div>
    <!-- 已关注已开课 -->
    <div class="home-already" v-if="pageStatus == 4">
      <AudioBar/>
      <h2>今日学习
        <span> | 第{{todayBookDetail.days}}/{{todayBookDetail.totalDays}}天</span>
      </h2>
      <div class="already-book">
        <img :src="todayBookDetail.courseUrl" alt="" class="book-img">
        <div class="book-name otw">《{{todayBookDetail.courseTitle}}》</div>
        <div class="book-msg">{{todayBookDetail.courseSubTitle}}</div>
        <div class="book-btn" @click="playAudio(todayBookDetail.courseId)">播放
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <h2>我的书架
        <span> | 缺卡{{todayBookDetail.lackClockDays}}天</span>
      </h2>
      <div class="already-list clearfix">
        <div class="item" v-for="(item,index) in historyBookList" :key="index" @click="getCourseList(item)">
          <div class="item-box">
            <img :src="item.imgUrl" alt="" class="item-img">
            <div class="item-lock" v-if="item.lockStatus">
              <i class="iconfont icon-lock"></i>
            </div>
          </div>
          <div class="item-name">《{{item.title}}》</div>
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
    <div class="home-pop" v-show="payCancelToggle">
      <div class="pop-content">
        <h2>还有疑问?</br>联系老师进一步了解</h2>
        <img src="http://yun.dui88.com/youfen/images/read_headimg01.png" alt="">
        <div class="text-name">小雪老师</div>
        <div class="text-msg">智慧与美貌并存的读书达人</div>
        <a class="btn" href="https://kefu.easemob.com/webim/im.html?configId=1738cfa5-7e3c-4fe2-9302-0997c4e3bd9f">跟她聊聊</a>
      </div>
      <div class="pop-bg"></div>
      <i class="pop-close iconfont icon-close" @click="payCancelToggle = false;"></i>
    </div>
  </div>
</template>

<script>
  import AudioBar from '../../components/basic/Audio_Bar';
  import play from '../../api/play';
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
        maincontent: 0,
        bodycontent: 0,
        payCancelToggle: false,


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
      let self = this;
      // 如果是支付流程直接支付
      if (self.$route.query.dcd && !self.$route.query.isPay) {
        self.getDcd(self.$route.query.dcd)
      }
      if (self.$route.query.courseId && !self.$route.query.isPay) {
        self.tabActive = false;
        self.buy(self.$route.query.courseId, 4)
      }


      let userState = await self.getThumbUp();
      self.wxShare(userState.data.userId);
      self.readId = userState.data.readId;
      // 状态判断逻辑
      if (userState.data) {
        if (
          userState.data.readState == -1
        ) {
          console.log('用户未购买未授权')
          self.pageStatus = 0;
          self.getCommentTop();
          self.getReadList();
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
          userState.data.readState == 0
        ) {
          console.log('用户未购买已授权')
          self.pageStatus = 1;
          self.getCommentTop();
          self.getReadList();
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
          userState.data.readState > 0 && !userState.data.followOfficialAccount
        ) {
          console.log('用户购买未关注')
          self.pageStatus = 2;
          self.tabActive = userState.data.readState != 4
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
          self.pageStatus = 3;
          self.readDetail();
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
          self.pageStatus = 4;
          self.getDetail();
          self.getBookList();
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
          userState.data.readState == 3
        ) {
          console.log('用户购买已关注已读完')
          self.pageStatus = 1;
          self.getCommentTop();
          self.getReadList();
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
      self.changeLoginDays();
      self.changeReadStatus();
      // setTimeout(() => {
      //   var maincontento = document.getElementById("maincontent");
      //   var maincontenth = maincontento.offsetHeight; //高度
      //   this.maincontent = maincontenth;

      //   this.bodycontent = document.body.clientHeight;
      //   console.log('maincontent高度:' + this.maincontent)
      // }, 500)
      // // window.addEventListener('scroll', this.handleScroll,true);
      // self.$refs.homemain.addEventListener('scroll', self.dispatchScroll, true);

    },
    methods: {


      // 支付


      /**
       * 拉起支付
       */
      async buy(itemId, itemType) {
        console.log('拉起支付')
        const orderId = await this.placeOrder({
          itemId,
          itemType
        });
        if (!orderId) {
          return false;
        }
        const payment = await this.wxPrePay({
          orderId
        });
        this.wxPay(payment);
      },


      /**
       * 下单
       */
      async placeOrder({
        itemId,
        itemType
      }) {
        console.log('下单')
        const url = `/api/order/submit`;
        const res = await this.$http.post(url, {
          itemId,
          itemType
        });

        if (!res.data.success) {
          location.href = '/reading.html#/index/home';
          return false;
        }
        return res.data.data;
      },

      /**
       * 预支付
       */
      async wxPrePay({
        orderId
      }) {
        console.log('预支付')
        const payType = 'WECHATREADH5APAY';
        const url = `/api/pay/submit`;
        const res = await this.$http.post(url, {
          orderId,
          payType
        });
        return res.data.data;
      },

      /**
       * 支付
       */
      wxPay(payment) {
        let self = this;

        function onBridgeReady() {
          WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
              "appId": payment.appId, //公众号名称，由商户传入     
              "timeStamp": payment.timeStamp, //时间戳，自1970年以来的秒数     
              "nonceStr": payment.nonceStr, //随机串     
              "package": payment.package,
              "signType": payment.signType, //微信签名方式：     
              "paySign": payment.paySign //微信签名 
            },
            function (res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {

                // } 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。

                function url_add_hash(url, key) {
                  var key = (key || 't') + '='; //默认是"t"  
                  var reg = new RegExp(key + '\\d+'); //正则：t=1472286066028  
                  var timestamp = +new Date();
                  if (url.indexOf(key) > -1) { //有时间戳，直接更新  
                    return url.replace(reg, key + timestamp);
                  } else { //没有时间戳，加上时间戳  
                    if (url.indexOf('#') > -1) {
                      return url.split('#')[0] + '?' + key + timestamp + location.hash;
                    } else {
                      return url + '?' + key + timestamp;
                    }
                  }
                }

                window.location.href = url_add_hash(window.location.href)
              } else {
                self.payCancelToggle = true;
              }
            }
          );
        }
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
          }
        } else {
          onBridgeReady();
        }
      },



      tabActiveToggle(e) {
        this.$refs.homemain.scrollTop = 0
        this.tabActive = e;
      },
      dispatchScroll(e) {
        console.log(this.$refs.homemain.scrollTop + document.body.clientHeight)
        let self = this;
        var startX = 0,
          startY = 0,
          isTrue = 0;

        function touchStart(evt) {
          try {
            var touch = evt.touches[0], //获取第一个触点
              x = Number(touch.pageX), //页面触点X坐标
              y = Number(touch.pageY); //页面触点Y坐标
            //记录触点初始位置
            startX = x;
            startY = y;
          } catch (e) {
            console.log(e.message)
          }
        }

        function touchMove(evt) {
          try {
            var touch = evt.touches[0], //获取第一个触点
              x = Number(touch.pageX), //页面触点X坐标
              y = Number(touch.pageY); //页面触点Y坐标


            // //判断滑动方向
            // if (startY - y > 200) {
            //   console.log('到底部并且上滑了')
            //   isTrue = 1;
            // } else if (y - startY > 200) {
            //   console.log('下滑了')
            //   isTrue = 2;
            // } else {
            //   isTrue = 0;
            // }


          } catch (e) {}
        }

        function touchEnd() {
          if (isTrue == 1) {
            self.$refs.homemain.scrollTop = 0
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
            window.scrollTo(0, 0);
            self.tabActive = false;
          }
        }

        //绑定事件
        document.addEventListener('touchstart', touchStart, false);
        document.addEventListener('touchmove', touchMove, false);
        document.addEventListener('touchend', touchEnd, false);
      },
      getDcd(dcd) {
        let self = this;
        let params = {};
        params = {
          dcd: dcd,
        }
        const url = `/api/distribution/binding`;
        this.$http.get(url, {
          params
        }).then((res) => {

        });
      },
      changeLoginDays() {
        let self = this;
        let params = {};
        params = {}
        const url = `/api/user/stat/changeLoginDays`;
        this.$http.get(url, {
          params
        }).then((res) => {

        });
      },
      changeReadStatus() {
        let self = this;
        let params = {};
        params = {}
        const url = `/api/user/stat/changeReadStatus`;
        this.$http.get(url, {
          params
        }).then((res) => {

        });
      },
      orderPay() {
        this.buy(this.selectCourseId, 4)
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
      readDetail() {
        let self = this;
        let params = {};
        params = {}
        const url = `/api/user/read/detail`;
        this.$http.get(url, {
          params
        }).then((res) => {
          self.courseDetail = res.data.data
        });
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
        const url = `/api/readBookCourse/courseDetailByDate`;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.todayBookDetail = res.data.data;
        });
      },
      getBookList() {
        let self = this
        let params = {};
        params = {
          readId: this.readId,
        }
        const url = `/api/readBook/bookList`;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.historyBookList = res.data.data.content;
        });
      },
      getCourseList(item) {
        if (item.lockStatus) {
          return false;
        }
        let self = this;
        let params = {};
        params = {
          readId: this.readId,
          bookId: item.id,
        }
        const url = `/api/readBookCourse/courseList`;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.courseList = res.data.data;
          this.bookName = item.title;
          this.alertToggle = true;
        });
      }



    }
  };

</script>

<style lang="less">
  /* @import '../../less/letiable'; */

  @import '../../less/util';
  html,
  body,
  #app,
  .index-main,
  .home-main,
  .home-type,
  .home-detail {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }

  .home-main {
    .home-type {
      padding-top: 100/@rem;
      background: #f1f1f1;
      padding-bottom: 100/@rem;
      box-sizing: border-box;
    }
    .home-service {
      .size(100, 100);
      position: absolute;
      right: 30/@rem;
      bottom: 140/@rem;
      background: url('http://yun.dui88.com/youfen/images/read_btn1.png') no-repeat center;
      background-size: 100% 100%;
      z-index: 888;
    }
    .home-service.bottom {
      bottom: 240/@rem;
    }
    .home-detail {
      -webkit-overflow-scrolling: touch;
      position: absolute;
      transition: all 1s cubic-bezier(0.86, 0, 0.03, 1);
      -webkit-transition: -webkit-all 1s cubic-bezier(0.86, 0, 0.03, 1);
    }
    .home-box {
      position: relative;
      background: #f1f1f1;
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding-top: 100/@rem;

    }

    .home-tab {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background: #fff;
      z-index: 999;
      .item:after {
        content: '';
        height: 50/@rem;
        background: #d8d8d8;
        position: absolute;
        bottom: 25/@rem;
        left: 50%;
        width: 1/@rem;
        box-sizing: border-box;
      }
      .item {
        width: 50%;
        float: left;
        text-align: center;
        span {
          .size(126,
          94);
          .text(40,
          94);
          display: inline-block;
          text-align: center;
          color: #949494;
          font-weight: 500;
        }
        .active {
          color: #333;
          border-bottom: 6/@rem solid #333;
        }
      }
    }
    .home-btn {
      .text(24,
      100);
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
      box-shadow: 0px -1px 20px 0px rgba(0, 0, 0, 0.1);
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
        .size(360,
        100);
        .text(40,
        100);
        position: absolute;
        right: 0;
        top: 0;
        background: #FF4C4C;
        color: #fff;
        text-align: center;
        box-shadow: 0px -1px 20px 0px rgba(0, 0, 0, 0.1);
      }
    }
    .home-bottom.bottom {
      bottom: 100/@rem;
    }
    .home-btn.bottom {
      bottom: 100/@rem;
    }
    .home-content {
      img {
        display: block;
        width: 100%;
      }
    }
    .home-review {
      background: #fff;
      padding-bottom: 120/@rem;
      h2 {
        .text(40,
        56);
        padding-top: 45/@rem;
        color: #333;
        text-align: center;
      }
      h3 {
        .text(32,
        120);
        color: #888;
        text-align: center;
        font-weight: normal;
        .iconfont {
          .text(24,
          120);
          margin-left: 20/@rem;
          color: #888;

        }
      }
      .item {
        position: relative;
        /* height: 560/@rem; */
        padding: 36/@rem 36/@rem 30/@rem 118/@rem;
        .item-header {
          .size(64,
          64);
          .pos(30,
          40);
          border-radius: 50%;
          overflow: hidden;
          background: #000;
        }
        .item-name {
          /* .pos(118, 36); */
          font-weight: bold;
          .text(30,
          42);
          color: #333;
        }
        .item-periods {
          /* .pos(118, 82); */
          .text(24,
          33);
          color: #666;
          margin-top: 4/@rem;
          margin-bottom: 14/@rem;
        }
        .item-content {
          /* .pos(118, 130); */
          max-height: 9999px;
          font-size: 28/@rem;
          line-height: 42/@rem;
          color: #333;
        }
        .item-book {
          .size(580,
          148);
          /* .pos(118, 318); */
          position: relative;
          background: #eee;
          border-radius: 4/@rem;
          margin-top: 20/@rem;
          .book-bg {}
          .book-img {
            .pos(30,
            13);
            .size(80,
            112);
            border: 5/@rem solid #fff;
          }
          .book-name {
            .pos(0,
            25);
            .text(30,
            42);
            color: #555;
            width: 100%;
            padding-left: 134/@rem;
            padding-right: 10/@rem;
            box-sizing: border-box;

          }

          .book-author {
            .pos(0,
            75);
            .text(26,
            37);
            color: #666;
            width: 100%;
            padding-left: 134/@rem;
            padding-right: 10/@rem;
            box-sizing: border-box;
          }
        }
        .item-bottom {
          .text(22,
          30);
          margin-top: 25/@rem;
          color: #666;
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
        width: 580/@rem;
        box-sizing: border-box;
      }

    }
    .home-bottom {
      .text(40,
      100);
      position: fixed;
      left: 0;
      bottom: 0;
      background: #FF4C4C;
      color: #fff;
      width: 100%;
      z-index: 999;
      text-align: center;
    }
    .home-bottom.bottom {
      bottom: 100/@rem;
    }
    .home-course {
      background: #f1f1f1;
      padding-top: 60/@rem;
      padding-bottom: 120/@rem;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
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
        margin: 0 45/@rem 50/@rem 45/@rem;
        border-radius: 20/@rem;
        overflow: hidden;
        .item-box {
          border-radius: 20/@rem;
          overflow: hidden;
        }
        .item-top {
          height: 210/@rem;
          position: relative;
          background: #fff670;
          .item-none {
            .size(150,
            117);
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
            padding-left: 24/@rem;
          }
          .item-name:after {
            content: '';
            height: 38/@rem;
            width: 10/@rem;
            background: #FF7E12;
            position: absolute;
            top: 12/@rem;
            left: 0;
            box-sizing: border-box;
          }
          .item-msg {
            .pos(40,
            103);
            .text(26,
            37);
            color: #333;
            i {
              display: inline-block;
              height: 20/@rem;
              width: 2/@rem;
              margin: 0 14/@rem;
              background: #333;
            }
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
            background: #fff670;
            text-align: center;
          }
          .item-btn.red {
            background: #FF4C4C;
            border-color: #FF4C4C;
            color: #fff;
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
        transform: scale(1.1);
        box-shadow: 0/@rem -2/@rem 14/@rem 5/@rem rgba(0, 0, 0, 0.2);
        border: 2/@rem solid #FF4C4C;
        .item-box {}
        .item-top {
          background: #FEED47;
        }
        .item-btn {
          background: #FEED47;
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
            i {
              background: #888;
            }
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
        .iconfont {
          font-size: 0;
          height: 56/@rem;
          width: 56/@rem;
          display: inline-block;
          vertical-align: middle;
          background: url('http://yun.dui88.com/youfen/images/read_icon.png') no-repeat center;
          background-size: 100% 100%;
          margin-right: 24/@rem;
          margin-bottom: 10/@rem
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
      padding: 50/@rem 34/@rem 20/@rem 34/@rem;
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
          /* font-weight: bold; */
        }
      }
      .ewm-bg {
        img {
          margin: 24/@rem auto 36/@rem auto;
          display: block;
          height: 430/@rem;
          width: 369/@rem;
        }
      }
      .text-d {
        .text(36,
        50);
        margin-top: 70/@rem;
        font-weight: bold;
        color: #116EBC;
      }
      .text-e {
        .text(24,
        30);
        margin-top: 20/@rem;
        color: #333;
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
        font-weight: bold;
      }
      .text-h {
        position: fixed;
        height: 116/@rem;
        background: #666;
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
          .pos(0,
          30);
          .text(30,
          42);
          color: #333;
          padding-left: 245/@rem;
          padding-right: 32/@rem;
          box-sizing: border-box;
          width: 100%;

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
    .home-pop {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 999;
      .pop-bg {
        position: fixed;
        left: 0;
        bottom: 0;
        top: 0;
        right: 0;
        z-index: 999;
        background: rgba(0, 0, 0, 0.5);
      }
      .pop-close {
        .pos(604,
        185);
        .size(56,
        56);
        .text(24,
        56);
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        border-radius: 50%;
        text-align: center;
        z-index: 9999;
      }
      .pop-content {
        .pos(55,
        284);
        .size(640,
        614);
        background: #fff;
        border-radius: 12/@rem;
        position: relative;
        z-index: 9999;
        h2 {
          .text(36,
          55);
          height: 210/@rem;
          padding-top: 50/@rem;
          text-align: center;
          color: #333;
          border-bottom: 1/@rem dashed #bbb;
          letter-spacing: 8/@rem;
          box-sizing: border-box;
        }
        .text-name {
          .text(29,
          40);
          .pos(266,
          300);
          color: #333;
          font-weight: bold;
        }
        .text-msg {
          .text(26,
          37);
          .pos(266,
          348);
          color: #555;
        }
        img {
          .pos(100,
          273);
          .size(140,
          140);

        }
        .btn {
          .pos(40,
          474);
          .size(560,
          86);
          .text(38,
          86);
          text-align: center;
          color: #fff;
          background: #4799FA;
          border-radius: 12/@rem;
        }
      }
      .pop-top {
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

      .pop-btn {
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

</style>

