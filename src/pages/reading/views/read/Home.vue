<template>
  <div class="home-main">
    <!-- 未报名已关注 -->
    <div class="home-type" v-if="pageStatus == 1 || pageStatus == 0">
      <bnav :dpm-b="820"  :dcm-a="8001"></bnav>
      <a href="https://kefu.easemob.com/webim/im.html?configId=f56195f3-2ff6-412b-983e-0231f5586efb" class="home-service" :class="{bottom:bottomNavToggle}"
        @click="clickFun($event)" :monitor-log="getMonitor('0.0.0.0', '820.8.0')"></a>
      <!-- <div class="home-tab clearfix" id="hometab">
        <div class="item" @click="clickFun($event,tabActiveToggle,true)" :monitor-log="getMonitor('0.0.0.0', '820.1.1')">
          <span :class="{ active: tabActive}">简介</span>
        </div>
        <div class="item" @click="clickFun($event,tabActiveToggle,false)" :monitor-log="getMonitor('0.0.0.0', '820.1.2')">
          <span :class="{ active: !tabActive}">课程</span>
        </div>
      </div> -->
      <!-- <div class="home-bottom" @click="clickFun($event,tabActiveToggle,false)" :class="{bottom:bottomNavToggle}" v-show="tabActive"
        :monitor-log="getMonitor('0.0.0.0', '820.4.0')">去选课程</div> -->
      
      <div class="coupon-box clearfix" v-show="selectCourseObj.preferPrice">
        <div class="fl coupon-text">{{selectCourseObj.couponUsedDesc}}</div>
        <div class="fr coupon-money"><span class="ft22">￥</span>{{selectCourseObj.couponPrice}}</div>
      </div>

      <div class="home-btn" :class="{bottom:bottomNavToggle}" v-show="tabActive&&readList.length>0&&payBtnShow" >
          <div v-if="selectCourseObj.preferPrice">
            <p class="text-daily">券后￥{{selectCourseObj.preferPrice}}</p>
            <p class="text-origin">￥{{selectCourseObj.costPrice}}</p>
          </div>
          <div v-else>
            <p class="text-day">每天仅需<span>{{selectCourseObj.priceDay}}</span>元</p>
            <p class="text-del">原价：{{selectCourseObj.costPrice}}</p> 
          </div>
        
        <div  class="btn-daily coupon" v-if="selectCourseObj.preferPrice" @click="clickFun($event,orderPay)" :monitor-log="getMonitor('0.0.0.0', '819.1.0')">
          <div class="word">立即购买</div>
          <div class="favour">每天仅需{{selectCourseObj.dailyPrice}}</div>
        </div>
        <span v-else @click="clickFun($event,orderPay)" class="btn-pay" :monitor-log="getMonitor('0.0.0.0', '819.1.0')"><span class="text-red">¥ {{selectCourseObj.presentPrice}}</span>立即购买</span> 
      </div>

      <div id="maincontent" class="home-detail" ref="homemain" v-show="tabActive">
        <div class="home-content" :monitor-log="getMonitor('0.0.0.0', '820.2.0')">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_15.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_02.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_03.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_04.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_05.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_06.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_07.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_08.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_09.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_10.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_11.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_12.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_13.jpg" alt="">
          <img src="http://yun.dui88.com/youfen/images/detail20180614_14.jpg" alt="">
        </div>
        <div class="home-review" v-show="reviewList.length> 0">
          <h2>学员感想</h2>
          <div class="item" v-for="(item,index) in reviewList" :key="index">
            <img :src="item.userImgUrl" alt="" class="item-header">
            <div class="item-name">{{item.userNickname}}</div>
            <div class="item-periods">{{item.readName}}第{{item.readStageNum}}期学员</div>
            <div class="item-content" ref="cheight" :id="'content' + index" :class="{show:item.show == 1}">{{item.content}}</div>
            <div v-show="item.show == 1" @click="unfoldToggle(2,index)" class="item-toggle">展开</div>
            <div v-show="item.show == 2" @click="unfoldToggle(1,index)" class="item-toggle">收起</div>
            <div class="item-book">
              <div class="book-bg">
                <img class="book-img" :src="item.courseVerticalCover" alt="" v-if="item.courseVerticalCover">
                <img class="book-img" src="http://yun.dui88.com/youfen/images/read_course_none.png" alt="" v-else>
              </div>
              <div class="book-name otw">《{{item.courseTitle}}》</div>
              <div class="book-author otw" v-if="item.courseAuthor">{{item.courseAuthor}} 著</div>
            </div>
            <div class="item-bottom">
              <p @click="clickFun($event,setCommentPraise,item)"  :monitor-log="getMonitor('8002.'+ item.courseId +'.0.0', '820.3.2-'+index)">
                <span class="fr" v-show="item.praiseCount>0">{{item.praiseCount}}</span>
                <i class="iconfont icon-dianzan fr" v-show="!item.userPraise"></i>
                <i class="iconfont icon-heart fr" :style="{color:'red'}" v-show="item.userPraise"></i>
              </p>
              <i class="iconfont icon-share fr" :monitor-log="getMonitor('8002.'+ item.courseId +'.0.0', '820.3.1-'+index)" @click.native="clickFun($event,shareFun,item)"></i>
             <!--  <router-link :to="{ path: '/poster',query:{commentId:item.id,lastClock:0,isClock:1}}" tag="a" class="iconfont icon-share fr"
                v-if="userId == item.userId" ></router-link>
              <router-link :to="{ path: '/poster',query:{commentId:item.id,lastClock:0,isClock:0}}" tag="a" class="iconfont icon-share fr"
                v-if="userId != item.userId" :monitor-log="getMonitor('8002.'+ item.courseId +'.0.0', '820.3.1-'+index)" @click.native="clickFun($event)"></router-link> -->
            </div>
          </div>
        </div>
      </div>
      <div class="home-course" v-show="!tabActive" :class="{bottom:bottomNavToggle}">
        <div class="item" v-for="(item,index) in readList" :key="index" :class="{active: selectCourseId == item.readId,none: item.purchased}"
          @click="clickFun($event,selectCourse,item)" v-show="readList.length > 0"  :monitor-log="getMonitor('8001.' + item.readId + '.0.0', '820.5.'+index)">
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
        <div v-show="!readList.length" class="course-none">
          <img src="https://yun.duiba.com.cn/yoofans/images/201805/read/index.png" alt="">
          <p>暂无可购买的</p>
        </div>
      </div>
    </div>
    <!-- 报名未关注 -->
    <div class="home-wechat" v-if="pageStatus == 2">
      <bnav :dpm-b="822" :dcm-a="8001"></bnav>
      <p class="text-a">
        <i class="iconfont"></i>您已成功报名</p>
      <p class="text-b">长按识别二维码</p>
      <p class="text-c">关注公众号，去等待开课</p>
      <img src="http://yun.dui88.com/youfen/images/read_ewm3.png" alt="" class="text-ewm" @click="clickFun($event)"  :monitor-log="getMonitor('0.0.0.0', '822.1.0')">
    </div>
    <!-- 报名未开课 -->
    <div class="home-nonevent" v-if="pageStatus == 3">
      <bnav :dpm-b="821" :dcm-a="8001"></bnav>
      <div class="nonevent-box">
        <p class="text-a">您已成功报名</p>
        <p class="text-b">「 {{courseDetail.title}} 」</p>
        <p class="text-c">{{courseDetail.beginDate}}（{{courseDetail.beginDateWeek}}）开学，倒计时{{courseDetail.days}}天</p>
      </div>
      <p class="text-d">长按识别二维码添加老师微信</p>
      <p class="text-e">因添加学员较多，老师会在3个工作日内通过，请耐心等待~</p>
      <div class="ewm-bg">
        <img :src="courseDetail.teacherWxQrcodeUrl" alt="" @click="clickFun($event)" :monitor-log="getMonitor('0.0.0.0', '821.1.0')">
      </div>
      <p class="text-g">微信添加老师后，你的专属老师会在课程</br>开始前邀请你进入对应班级群</p>
    </div>
    <!-- 已关注已开课 -->
    <div class="home-already" v-if="pageStatus == 4" ref="homealready">
      <bnav :dpm-b="830" :dcm-a="8001"></bnav>
      <AudioBar  :monitorlog="getMonitor('0.0.0.0', '830.2.0')" />
      <h2>今日学习
        <span> | 第{{todayBookDetail.days}}/{{todayBookDetail.totalDays}}天</span>
      </h2>
      <div class="already-book">
        <img :src="todayBookDetail.courseUrl" alt="" class="book-img" v-if="todayBookDetail.courseUrl">
        <img src="http://yun.dui88.com/youfen/images/read_course_none.png" alt="" class="book-img" v-else>
        <div class="book-name otw">《{{todayBookDetail.courseTitle}}》</div>
        <div class="book-msg">{{todayBookDetail.courseSubTitle}}</div>
        <div class="book-btn" @click="clickFun($event,playAudio,todayBookDetail)" :monitor-log="getMonitor('8001.'+ todayBookDetail.readId +'.0.'+ todayBookDetail.courseId, '830.3.0')" >播放
          <i class="iconfont icon-bofang"></i>
        </div>
      </div>
      <h2>我的书架
        <span> |
          <router-link :to="{ path: '/index/card?isclock=0', }" tag="a"> 缺卡{{todayBookDetail.lackClockDays}}天 ></router-link>
        </span>
      </h2>
      <div class="already-list clearfix">
        <div class="item" v-for="(item,index) in historyBookList" :key="index"  @click="clickFun($event,playAudio,item)"  :monitor-log="getMonitor('8001.'+item.readId+ '.0.'+item.courseId, '830.1.'+index)">
          <div class="item-box">
            <img :src="item.verticalCover" alt="" class="item-img" v-if="item.verticalCover">
            <img src="http://yun.dui88.com/youfen/images/read_course_none.png
            " alt="" class="item-img" v-else>
            <div class="item-lock" v-if="item.lockStatus">
              <i class="iconfont icon-lock"></i>
            </div>
          </div>
          <div class="item-name">《{{item.title}}》</div>
        </div>
      </div>
      <div v-show="noneValueAlert" class="already-no">内容还没有解锁喔！</div>
    </div>
    <div class="home-pop" v-show="payCancelToggle">
      <div class="pop-content">
        <h2>还有疑问?</br>联系老师进一步了解</h2>
        <img src="http://yun.dui88.com/youfen/images/read_headimg01.png" alt="">
        <div class="text-name">小雪老师</div>
        <div class="text-msg">智慧与美貌并存的读书达人</div>
        <a class="btn" href="javascript:void(0)" @click="clickFun($event,hrefFun)" :monitor-log="getMonitor('0.0.0.0', '820.9.0')">跟她聊聊</a>
      </div>
      <div class="pop-bg"></div>
      <i class="pop-close iconfont icon-close" @click="payCancelToggle = false;"></i>
    </div>

    <!--弹框模块-->
    <div class="frame" v-if="CouponDialog">
      <div class="coupon-mask"></div>
      <div class="frame-box">
        <div class="delete column-center" @click="closeCouponDialog()">
          <i class="iconfont icon-close delete-icon"></i>
        </div>
        <div :class="frameTitleClass">
          <div class="frame-user" v-if="distributorName"><img :src="distributorHeadImgurl"></div>
          <div class="frame-title" v-html="titleText"></div>
          <div class="frame-detail clearfix">
            <div class="fl">
              <div class="frame-prize"><span class="word">{{awards.couponPrice/100}}</span>元</div>
            </div>
            <div class="fl">
              <div class="frame-fr-title">{{awards.couponTemplateTitle}}</div>
              <div class="frame-fr-service">{{awards.useScopeTypeDesc}}</div>
              <div class="frame-fr-time">{{awards.validityDate}}</div>
            </div>
          </div>
          <div class="frame-btn" @click="closeCouponDialog()">立即使用</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AudioBar from '../../components/basic/Audio_Bar';
  import bnav from '../../components/basic/Nav';
  import play from '../../api/play';
  import store from '../../vuex/store';
  import {
    mapState
  } from 'vuex';

  const testUrl = window.location.hostname == 'localhost' ? '/api' : '';

  const API = {
    orderSubmit: testUrl + '/order/submit',
    paySubmit: testUrl + '/pay/submit',
    distributionBinding: testUrl + '/distribution/binding',
    changeLoginDays: testUrl + '/user/stat/changeLoginDays',
    changeReadStatus: testUrl + '/user/stat/changeReadStatus',
    readDetail: testUrl + '/user/read/detail',
    commentTop: testUrl + '/comment/top',
    commentPraise: testUrl + '/comment/praise',
    readList: testUrl + '/read/readList',
    courseDetailByDate: testUrl + '/readBookCourse/courseDetailByDate',
    bookList: testUrl + '/readBook/bookList',
    courseList: testUrl + '/readBookCourse/courseList',
    userState: testUrl + '/user/read/state',

    getCoupon: testUrl + '/activity/getActivity',
    getOptimal: testUrl + '/coupon/info/optimal',
    getSelectCoupon: testUrl + "/coupon/getSelectedCoupon"

  };


  export default {
    components: {
      AudioBar,
      bnav
    },
    // mixins: [access],
    data() {
      return {
        reviewList: [],
        readList: [],
        tabActive: true,
        bookName: '',
        alertToggle: false,
        readId: '',
        userId: '',

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
        payBtnShow: true,
        noneValueAlert: false,

        //优惠券弹框
        CouponDialog: false,
        resultCode: null,
        awards:[],
        distributorName: '',
        distributorHeadImgurl: '',
        titleText:'',
        frameTitleClass:'',
        couponCourseId:'', // 优惠券对应的第一个课程Id
        selectCourseArray:[],
        couponId:''
      };
    },
    computed: {
      ...mapState(['bottomNavToggle', 'bottomNavType', 'videoToggle'])
    },
    filters: {},
    created() {
      this.getProjectile()
    },
    async mounted() {
      let self = this;
      // dcd存入cookie
      if (self.$route.query.dcd) {
          this.setCookie('dcd',self.$route.query.dcd,2)
        }
      // 如果是支付流程直接支付
      if (window.location.href.indexOf('from') != -1) {
        location.replace('/reading.html#/index/home?' + window.location.href.split('?')[2])
      }
      let refreshCookie = true;

      // 防止cookie丢失
      if (window.location.href.indexOf('afterLogin') == -1 && window.location.href.indexOf('activityId') == -1) {
        let res = await this.$http.get('/baseLogin', {
          params: {
            dbredirect: '/' + window.location.href.split('/').slice(3).join('/')
          }
        })
        if (res.data.success && res.data.data) {
          refreshCookie = false;
          location.replace(res.data.data);
        }
      }

      if (refreshCookie) {
        this.setTitle('一修读书')
        if (self.$route.query.dcd) {
          self.getDcd(self.$route.query.dcd || self.getCookie('dcd'))
        }
        if (self.$route.query.courseId) {
          self.tabActive = false;
          self.buy(self.$route.query.courseId, 4)
        }

        // 获取用户信息
        let userState = await self.getUsetState();
        self.wxShare(userState.data.userId);
        self.userId = userState.data.userId;
        self.readId = userState.data.readId;
        if (userState.data) {
          if (
            userState.data.readState == -1
          ) {
            console.log('用户未购买未授权')
            self.pageStatus = 0;
            self.getCommentTop();
            self.getReadList(self.$route.query.readId);
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
            self.pageStatus = 1;
            self.getCommentTop();
            self.getReadList(self.$route.query.readId);
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
            self.getReadDetail();
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
            self.getReadList(self.$route.query.readId);
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
      }
      
      // 曝光
      self.$nextTick(function () {
        setTimeout(() => {
          // 滚动
          if (self.$refs.homemain) self.$refs.homemain.addEventListener('scroll', self.dispatchScroll, false);
          if (self.$refs.homealready) self.$refs.homealready.addEventListener('scroll', self.dispatchScroll, false);
          // 埋点
          window.monitor && window.monitor.showLog(self);
        }, 100)
      })
    },
    methods: {
      shareFun(item){
        if(item.posterType == "H5"){

          this.$router.push({name:'share',query:{commentId:item.id,lastClock:0,isClock:1}})
        }else{
          if(this.userId == item.userId){
          this.$router.push({name:'poster',query:{commentId:item.id,lastClock:0,isClock:1}})

          }else{
          this.$router.push({name:'poster',query:{commentId:item.id,lastClock:0,isClock:0}})

          }
        }
      },
      hrefFun(){
        window.location.href = 'https://kefu.easemob.com/webim/im.html?configId=1738cfa5-7e3c-4fe2-9302-0997c4e3bd9f'
      },
      setCookie(cname,cvalue,exhours){   
        var d = new Date();
        d.setTime(d.getTime()+(exhours*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
      },
      getCookie(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
          var c = ca[i].trim();
          if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
      },
      // 触发滚动
      dispatchScroll () {
        window.monitor && window.monitor.showLog(this);
      },
      // 获取monitor
      getMonitor(dcm,dpm) {
        // item tabindex dpmc
        return JSON.stringify({
          'dcm': dcm,
          'dpm': '157.' + dpm,
        });
      },
      // 展开收起
      unfoldToggle(n, index) {
        let self = this;
        this.reviewList[index].show = n
        this.$set(self.reviewList, index, self.reviewList[index])
      },

      // 支付
      async buy(itemId, itemType, couponId) {
        console.log('拉起支付')
        const orderId = await this.placeOrder({
          itemId,
          itemType,
          couponId
        });
        if (!orderId) {
          return false;
        }
        const payment = await this.wxPrePay({
          orderId
        });
        this.wxPay(payment);
      },

      // 下单
      async placeOrder({
        itemId,
        itemType,
        couponId
      }) {
        console.log('下单')
        const url = API.orderSubmit;
        const res = await this.$http.post(url, {
          itemId,
          itemType,
          couponId,
          dcd: this.$route.query.dcd || this.getCookie('dcd') || '',
        });
        if (!res.data.success) {
          location.href = '/reading.html#/index/home';
          return false;
        }
        return res.data.data;
      },

      // 预支付
      async wxPrePay({
        orderId
      }) {
        console.log('预支付')
        const payType = 'WECHATREADH5APAY';
        const url = API.paySubmit;
        const res = await this.$http.post(url, {
          orderId,
          payType
        });
        return res.data.data;
      },

      // 支付
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
            async function (res) {
              if (res.err_msg == "get_brand_wcpay_request:ok") {

                // 给url+时间戳
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
                setInterval(async function () {
                  let userState = await self.getUsetState();
                  if (userState.data.readState > 0) {
                    window.location.href = url_add_hash(window.location.href)
                  }
                }, 1000)
              } else {
                self.payCancelToggle = true;
                window.monitor && window.monitor.showLog(this);
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


      // 课程详情切换
      tabActiveToggle(e) {
        let self = this;
        this.$refs.homemain.scrollTop = 0
        this.tabActive = e;
        setTimeout(() => {
          // 埋点
          window.monitor && window.monitor.showLog(self);
        }, 100);
      },
      // ded
      getDcd(dcd) {
        let self = this;
        let params = {};
        params = {
          dcd: dcd,
        }
        const url = API.distributionBinding;
        this.$http.get(url, {
          params
        }).then((res) => {

        });
      },
      changeLoginDays() {
        let self = this;
        let params = {};
        const url = API.changeLoginDays;
        this.$http.get(url, {
          params
        }).then((res) => {

        });
      },
      changeReadStatus() {
        let self = this;
        let params = {};
        params = {}
        const url = API.changeReadStatus;
        this.$http.get(url, {
          params
        }).then((res) => {

        });
      },
      // 开始支付
      orderPay() {
        this.buy(this.selectCourseId, 4, this.couponId)
      },
      // 开始播放
      playAudio(item) {
        if (item.lockStatus) {
          this.noneValueAlert = true;
          setTimeout(() => {
            this.noneValueAlert = false;
          }, 2000)
          return false;
        }
        play.audioInit(this.readId, item.courseId, true, this)
      },
      // 选择课程
      selectCourse(item) {
        if (this.selectCourseId != item.readId && !item.purchased) {
          this.selectCourseId = item.readId;
          this.couponId = item.couponId ? item.couponId : ''
          this.selectCourseObj = item;
        }
      },
      // 阅读详情
      getReadDetail() {
        let self = this;
        let params = {};
        const url = API.readDetail;
        this.$http.get(url, {
          params
        }).then((res) => {
          self.courseDetail = res.data.data
        });
      },
      // 获取用户信息
      async getUsetState() {
        let self = this;
        let params = {};
        // const url = API.userState;
        const url = API.userState;
        const res = await this.$http.get(url, {
          params
        });

        return res.data;
      },
      // 首页评论
      getCommentTop() {
        let self = this;
        let params = {};
        const url = API.commentTop;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.reviewList = res.data.data.content;

          function countLines(ele) {
            var styles = window.getComputedStyle(ele, null);
            var lh = parseInt(styles.lineHeight, 10);
            var h = parseInt(styles.height, 10);
            var lc = Math.round(h / lh);
            console.log('line count:', lc, 'line-height:', lh, 'height:', h);
            return lc;
          }
          if (this.reviewList.length > 0) {
            this.$mount()
            this.reviewList.forEach((item, index) => {
              let dom = document.getElementById('content' + index)
              if (countLines(dom) > 3) {
                item['show'] = 1
              }
            })
          }
        });
      },
      // 点赞
      setCommentPraise(item) {
        if (this.pageStatus == 0) {
          return false;
        }
        let self = this;
        let params = {};
        params = {
          status: item.userPraise ? 0 : 1,
          commentId: item.id
        }
        const url = API.commentPraise;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.getCommentTop();
        });
      },
      // 获取阅读计划
      getReadList(id) {
        let self = this;
        let params = {};
        params = {
          readId: id?id:'',
        }
        const url = API.readList;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.readList = res.data.data;
          if (res.data.data.length > 0) {
            if (res.data.data[0].purchased) {
              this.payBtnShow = false;
            } else {

              // 根据传的id 判断是否定位到课程,定位到实际优惠券的课程
              let planId = this.$route.query.planId
              let couponId = this.$route.query.couponId
              let activityId = this.$route.query.activityId

              // 如果传过来的planId不存在，并且优惠券定向Id不存在则选择列表中的第一个
              this.selectCourseId = res.data.data[0].readId
                // 获取定位到第一个优惠券的id,
              if(res.data.data[0].couponId){
                //如果活动id不存在，则返回的优惠券id替换全局id
                if(!activityId){
                  this.couponId = res.data.data[0].couponId
                }
              }
              this.selectCourseObj = res.data.data[0];

              if(planId && couponId){
                this.couponId = couponId
                this.selectCourseId = planId
                this.getSelectById(planId, couponId) 
              }
            }
          }
          // if (res.data.data.length > 0) {
          //   if (res.data.data[0].purchased) {
          //     this.payBtnShow = false;
          //   } else {
          //     this.selectCourseId = res.data.data[0].readId
          //     this.selectCourseObj = res.data.data[0];
          //   }
          // }

        });
      },
      // 获取阅读详情
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
        const url = API.courseDetailByDate;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.todayBookDetail = res.data.data;
        });
      },
      // 获取书list
      getBookList() {
        let self = this
        let params = {};
        params = {
          readId: this.readId,
        }
        const url = API.bookList;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.historyBookList = res.data.data;
        });
      },
      // 获取详情list
      getDetailList(item) {
        if (item.lockStatus) {
          this.noneValueAlert = true;
          setTimeout(() => {
            this.noneValueAlert = false;
          }, 2000)
          return false;
        }
        let self = this;
        let params = {};
        params = {
          readId: this.readId,
          bookId: item.id,
        }
        const url = API.courseList;
        this.$http.get(url, {
          params
        }).then((res) => {
          this.courseList = res.data.data;
          this.bookName = item.title;
          this.alertToggle = true;
        });
      },

      // 获取优惠券弹框
      async getProjectile() {
        const url = API.getCoupon;
        let activityId
        let distributorId
        // activityId = this.$route.query.activityId ? this.$route.query.activityId: ''
        if(this.$route.query.activityId){
          console.log(activityId)
          activityId = this.$route.query.activityId 
        }else{
          return
        }
        distributorId = this.$route.query.distributorId ? this.$route.query.distributorId:''
        const res = await this.$http.post(url, {activityId,distributorId},{ emulateJSON: true });
        console.log(res)
        //this.$http.post(url, ,{ emulateJSON: true }).then((res) => {
            let objs = res.data
            if (objs.success) {
              let resp = objs.data
              if(objs.data){
                if(resp.awards.length <= 0){
                  return
                }
                this.awards = resp.awards[0]
                this.resultCode = resp.resultCode
                this.distributorHeadImgurl = resp.distributorHeadImgurl
                this.distributorName = resp.distributorName

                //resultCode为0 已参与活动(awards有数据则未使用)
                if(resp.resultCode == 0){
                  this.frameTitleClass = "frame-line3"
                  this.titleText = "您有一张优惠券可以使用哦"
                  this.CouponDialog = true
                }
                // resultCode为1 券发放成功
                if(resp.resultCode == 1){
                  if(resp.distributorName){
                    this.frameTitleClass = resp.distributorName.length > 6?'frame-line2':'frame-line1'
                    this.titleText = resp.distributorName + "送你一张优惠券"
                    this.CouponDialog = true
                  }else{
                    this.titleText = "恭喜您，捡到一张优惠券"
                    this.frameTitleClass = "frame-line3"
                    this.CouponDialog = true
                  }
                }
                // 优惠券关联的课程Id

                this.couponCourseId = resp.awards[0].items[0].itemId;

                this.couponId = resp.awards[0].couponId
              }
            } else {
              console.log("获取数据失败")
            } 
        //}); 
      },

      // 关闭优惠券弹框
      closeCouponDialog() {
        console.log("关闭弹框")
        // 如果优惠券匹配的课程id是当前页展示的id，则替换原来的价格，否则则关闭弹框
        if(this.couponCourseId == this.selectCourseId){
          this.selectCourseId = this.couponCourseId
          this.getSelectById(this.couponCourseId ,this.couponId)
        }
        this.CouponDialog = false
      },
      // 根据ID获取实际的价格，替换原来的列表中的价格
      getSelectById(readId,couponId) {
        const url = API.getSelectCoupon;
        let params={
          readId : readId,
          couponId: couponId
        }
        this.$http.get(url, {params}).then((res) => {
          let objs = res.data
          if (objs.success) {
            let resp = objs.data
            if(this.readList.length > 0){
              this.readList.forEach(item=>{
                if(item.readId == readId){
                  item.couponId = objs.data.couponId
                  item.preferPrice = objs.data.preferPrice
                  item.couponUsedDesc = objs.data.couponUsedDesc
                  item.dailyPrice = objs.data.dailyPrice
                  item.couponPrice= objs.data.couponPrice
                  // 改变列表中原来的最优值
                  this.selectCourseObj = item
                  this.couponId = couponId
                }
              })
            }
            this.$set(this.readList)
          } else {
            console.log("获取数据失败")
          } 
        }); 
      }

    }
  };

</script>

<style lang="less">
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
    background: #fff;
    z-index: 100;
    .home-type {
      background: #f1f1f1;
      box-sizing: border-box;
      z-index: 100;
    }
    .home-service {
      .size(100, 100);
      position: fixed;
      right: 30/@rem;
      bottom: 200/@rem;
      background: url('http://yun.dui88.com/youfen/images/read_btn1.png') no-repeat center;
      background-size: 100% 100%;
      z-index: 1000;
    }
    .home-service.bottom {
      bottom: 300/@rem;
    }
    .home-detail {
      // padding-top: 100/@rem;
      /* padding-bottom: 100/@rem; */
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
      .text-day{
        .text(26,37);
        .pos(0,14);
        width: 270/@rem;
        color: #FF4343;
        text-align: right;
        span{
          font-size: 30/@rem;
          font-weight: bold;
        }
      }
      .text-del {
        .text(24,33);
        .pos(0,50);
        width: 270/@rem;
        color: #FF4343;
        text-align: right;
        color: #777;
        text-decoration: line-through;
      }
      .text-daily{
        .text(30,37);
        .pos(0,14);
        width: 310/@rem;
        color: #FF4343;
        text-align: right;
      }
      .text-origin{
        .text(24,33);
        .pos(0,54);
        width: 310/@rem;
        color: #FF4343;
        text-align: right;
        color: #777;
        text-decoration: line-through;
      }
      .text-red {
        font-size: 40/@rem;
        margin-left: 20/@rem;
        margin-right: 6/@rem;

      }
      .btn-pay {
        .size(450,
        100);
        .text(30,
        100);
        position: absolute;
        right: 0;
        top: 0;
        background: #FF4C4C;
        color: #fff;
        text-align: center;
        box-shadow: 0px -1px 20px 0px rgba(0, 0, 0, 0.1);
        z-index: 666;
        .text-red{
          .text(44,100);
          font-weight: bold;
        }
      }
      .btn-daily {
        .size(400,
        100);
        .text(30,
        100);
        position: absolute;
        right: 0;
        top: 0;
        background: #FF4343;
        color: #fff;
        text-align: center;
        box-shadow: 0px -1px 20px 0px rgba(0, 0, 0, 0.1);
        z-index: 666;
        .text-red{
          .text(44,100);
          font-weight: bold;
        }
        &.origin{
          .size(360,100);
          .text(40,100);
        }
        &.coupon{
          .size(400,100);
        }
        .word{
          height: 60/@rem;
          line-height: 70/@rem;
          font-size: 40/@rem;
        }
        .favour{
          height: 40/@rem;
          line-height: 35/@rem;
          font-size: 20/@rem;
        }
      }
    }
    .home-bottom.bottom {
      bottom: 100/@rem;
    }
    .home-btn.bottom {
      bottom: 100/@rem;
    }
    .home-content {
      border-bottom: 20/@rem solid #f0f0f0;
      img {
        display: block;
        width: 100%;
      }
    }
    .home-review {
      background: #fff;
      padding-bottom: 310/@rem;
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
          .text(30,
          42);
          color: #333;
          font-weight: bold;
        }
        .item-periods {
          /* .pos(118, 82); */
          .text(24,
          33);
          color: #666;
          margin-top: 4/@rem;
          margin-bottom: 26/@rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
        }
        .item-content {
          /* .pos(118, 130); */
          max-height: 9999px;
          font-size: 32/@rem;
          line-height: 42/@rem;
          color: #333;
        }
        .item-content.show {
          height: 126/@rem;
          overflow: hidden;
        }
        .item-toggle {
          max-height: 9999px;
          font-size: 28/@rem;
          line-height: 42/@rem;
          color: #4A669D;
          margin-top: 9/@rem;
        }
        .item-book {
          .size(580,
          148);
          /* .pos(118, 318); */
          position: relative;
          background: #eee;
          border-radius: 4/@rem;
          margin-top: 36/@rem;
          .book-bg {}
          .book-img {
            .pos(22,
            15);
            .size(80,
            108);
            border: 5/@rem solid #fff;
          }
          .book-name {
            .pos(0,
            25);
            .text(28,
            42);
            color: #555;
            width: 100%;
            padding-left: 121/@rem;
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
          width: 580/@rem;
          .text(26,
          37);
          margin-top: 25/@rem;
          color: #949494;
          box-sizing: border-box;
          vertical-align: middle;
          .iconfont {
            display: block;
            height: 37/@rem;
            width: 37/@rem;
            line-height: 37/@rem;
            font-size: 28/@rem;
            margin-right: 8/@rem;
            text-align: center;
          }
          .icon-share {
            margin-right: 54/@rem;
            color: #949494;
          }
          span {
            .text(26,
            37);
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
    .home-course.bottom {
      padding-bottom: 200/@rem;
    }
    .home-course {
      background: #f1f1f1;
      padding-top: 160/@rem;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      height: 100%;
      padding-bottom: 100/@rem;
      box-sizing: border-box;
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
      .course-none {
        height: 100%;
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        img {
          .pos(220,
          153);
          .size(310,
          310);
        }
        p {
          .text(32,
          45);
          .pos(0,
          492);
          text-align: center;
          color: #888;
          width: 100%;
        }
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
            background: url('http://yun.dui88.com/read_yz.png') no-repeat center;
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 596/@rem;
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
            max-height: 9999px;
            font-size: 28/@rem  !important;
          }
        }
      }

      .active {
        transform: scale(1.1);
        box-shadow: 0/@rem -2/@rem 14/@rem 5/@rem rgba(0, 0, 0, 0.2);
        /* border: 2/@rem solid #FF4C4C; */
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
      z-index: 100;
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
      .text-ewm {
        .size(688,
        688);
        margin: 40/@rem auto;
        display: block;
      }
    }
    .home-nonevent {
      z-index: 100;
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
          height: 630/@rem;
          width: 540/@rem;
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
      padding-bottom: 100/@rem;
      width: 100%;
      height: 100%;
      overflow: scroll;
      position: relative;
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
      z-index: 100;

      .already-no {
        .text(32,
        90);
        .size(420,
        90);
        position: fixed;
        top: 600/@rem;
        left: 165/@rem;
        background: rgba(0, 0, 0, 0.66);
        border-radius: 10/@rem;
        color: #fff;
        text-align: center;
        z-index: 10000;
      }
      h2 {
        .text(50,
        70);
        margin-top: 40/@rem;
        margin-bottom: 30/@rem;
        span {
          font-size: 26/@rem
        }

        a {
          color: #38558F;
        }
      }
      .already-book {
        background: #eee;
        height: 300/@rem;
        border-radius: 20/@rem;
        position: relative;
        width: 678/@rem;
        .book-img {
          .pos(30,
          30);
          .size(180,
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
          padding-left: 232/@rem;
          padding-right: 32/@rem;
          box-sizing: border-box;
          width: 100%;
          font-weight: bold;
        }
        .book-msg {
          .pos(243,
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
          .pos(243,
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
          margin-right: 55/@rem;
          overflow: hidden;
          position: relative;
          width: 180/@rem;
          .item-box {
            position: relative;
            border-radius: 6/@rem;
            overflow: hidden;
          }
          .item-img {
            .size(180,
            240);
            display: block;
          }
          .item-name {
            font-size: 24/@rem;
            line-height: 32/@rem;
            color: #333;
            margin-top: 20/@rem;
            margin-bottom: 34/@rem;
            font-weight: bold;
            height: 64/@rem;
            overflow: hidden;
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
            font-size: 36/@rem;
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
          bottom: 0/@rem;
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
          bottom: 0/@rem;
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

// 弹框
.coupon-mask {
  width: 750/@rem;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  top: 0;
  left: 0;
}
.frame-box{
  width: 640/@rem;
  position: fixed;
  z-index: 1001;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  .delete{
    position: absolute;
    width: 56/@rem;
    height: 56/@rem;
    position: absolute;
    right:0;
    top:0;
    background:rgba(0,0,0,0.5);
    border-radius: 50%;
  }
  .delete-icon{
    color: #fff;
    font-size: 19/@rem;
  }
  .frame-line1{
    height: 605/@rem;
    width: 100%;
    background-size: 100%;
    margin-top: 95/@rem;
    background-image: url('https://yun.dui88.com/yoofans/images/201806/coupon/coupon/frame-line1.png');
    position:relative;
    background-repeat:no-repeat; 
  }
  .frame-line2{
    height: 742/@rem;
    width: 100%;
    background-size: 100%;
    margin-top: 95/@rem;
    background-image: url('https://yun.dui88.com/yoofans/images/201806/coupon/coupon/line2.png');
    position:relative;
    background-repeat:no-repeat; 
  }
  .frame-line3{
    height: 605/@rem;
    width: 100%;
    background-size: 100%;
    margin-top: 50/@rem;
    background-image: url('https://yun.dui88.com/yoofans/images/201806/coupon/coupon/circle.png');
    position:relative;
    background-repeat:no-repeat; 
  }
  .frame-user{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    top: -70/@rem;
    img{   
      border-radius: 50%;
      display: block;
      width: 140/@rem;
      height: 140/@rem;
      box-shadow:0px 4/@rem 4/@rem 0 rgba(0,0,0,0.33);
    }
  }
  .frame-title{
    padding-top: 84/@rem;
    font-size: 38/@rem;
    color: #fff;
    line-height: 53/@rem;
    text-align: center;
    margin:0 auto;
    width: 517/@rem;
  }
  .frame-detail{
    width: 562/@rem;
    margin:100/@rem auto 0;
    height: 170/@rem;
    background-size: 100%;
    background-image: url('https://yun.duiba.com.cn/yoofans/images/201806/box.png');
    background-repeat:no-repeat;
    .frame-prize{
      width: 173/@rem;
      line-height: 170/@rem;
      color: #FF2B38;
      font-size: 26/@rem;
      text-align: center;
      .word{
        font-size: 64/@rem;
      }
    }
    .frame-fr-title{
      margin: 23/@rem 0 0 37/@rem; 
      position: relative;
      color: #333;
      padding-left: 13/@rem;
      font-size: 28/@rem;
      overflow: hidden;
      white-space: nowrap;
      box-sizing: border-box;
      text-overflow: ellipsis;
      width: 310/@rem;
      &::before{
        content:"";
        width: 3/@rem;
        height: 22/@rem;
        position:absolute;
        top: 9/@rem;
        left: 0;
        border-radius:2px;
        background: #FF831B;
      }
    }
    .frame-fr-service{
      margin: 4/@rem 0 0 50/@rem; 
      color: #333;
      font-size: 23/@rem;
    }
    .frame-fr-time{
      margin: 24/@rem 0 0 50/@rem; 
      color: #999;
      font-size: 20/@rem;
    }
  }
  .frame-btn{
    margin: 62/@rem auto 0;
    width: 560/@rem;
    height: 86/@rem;
    line-height: 86/@rem;
    background: #FFFA1E;
    border-radius: 20/@rem;
    text-align: center;
    font-size: 40/@rem;
    color: #FF2B39;
  }

}

.coupon-box{
    position: fixed;
    width: 720/@rem;
    height: 100/@rem;
    z-index:100;
    left: 15/@rem;
    bottom: 210/@rem;
    background-size: 100% 100%;
    background-image: url("http://yun.duiba.com.cn/yoofans/images/201806/coupon-box.png");
    background-repeat: no-repeat;
  .coupon-text{
    margin-left: 272/@rem;
    color: #fff;
    margin-top: 23/@rem;
    height: 80/@rem;
    font-size:26/@rem;
    line-height: 80/@rem;
  }
  .coupon-money{
    margin-right: 30/@rem;
    color: #fff;
    width:112/@rem;
    text-align: center;
    margin-top: 23/@rem;
    height: 80/@rem;
    font-size:30/@rem;
    line-height: 80/@rem;
  }
  .ft22{
    font-size: 22/@rem;
  }
}
</style>

