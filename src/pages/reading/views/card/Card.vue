<template>
  <div class="card-main">
    <cardNotice class="hideNoticeStyle" :class="{showNoticeStyle:noticeFlag}" :noticeFlag="noticeFlag" @changFlag="changeFlag"></cardNotice>
    <header>
      <div>{{readDetail.title}}第{{readDetail.stageNum}}期</div>
      <h2>第{{dayNum}}天</h2>
      <img :src="readInfo.userHeadImgUrl" alt="">
    </header>
    <div class="card-head">
      <span class="head-left" @click="noticeFlag = true ">坚持打卡送大礼 ></span>
      <div class="head-right">
        <span><i></i> 已打卡</span>
        <span><i></i>未打卡</span>
      </div>
    </div>
    <div class="week-box">
      <span v-for="week in weeks" class="week">{{week}}</span>
    </div>
    <div class="calendar-box">
      <!--<calendar ></calendar>-->
      <calendar-template :calendarDate='c_date' @getDate="getDate"></calendar-template>
    </div>
    <div class="book-book">
      <div class="book-img">
        <img :src="courseDetail.courseUrl" alt="">
      </div>
      <div class="book-detail">
        <div class="book-title">{{courseDetail.courseTitle}}</div>
        <div class="book-author">
          <span>{{courseDetail.author}}</span>
          <span class="book-btn" v-if="courseDetail.clockState==1&&courseDetail.commentState==1">查看</span>
          <span class="book-btn" v-if="courseDetail.clockState==1&&courseDetail.commentState==0" @click="goComment()">写想法</span>
          <span class="book-btn" v-if="courseDetail.clockState==0" @click="goComment()">去打卡</span>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
    <bnav></bnav>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import bnav from '../../components/basic/Nav';
  // import calendar from '../../components/layout/calendar.vue';
  import calendarTemplate from '../../components/layout/calendarTemplate';
  import cardNotice from '../../components/layout/card-notice';
  export default {
    components: {
      bnav,
      // calendar,
      cardNotice,
      calendarTemplate
    },
    data () {
      return {
        readId:'', //阅读Id
        courseId:'', //课程Id
        readInfo:'',//阅读状态
        readDetail:'',
        dayNum:'4',
        courseDetail:'',//课程详情
        noticeFlag:false,
        // 自定义星期名称
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        c_date:[],
      };
    },
    computed: {
      ...mapState({})
    },
    created() {
      this.getReadDetail();
    },
    mounted () {
      this.getReadStatus()
    },
   watch:{
     readId(){
       this.getClockCalendar()
     }
   },
    methods: {
      changeFlag(msg){
        this.noticeFlag = msg;
      },
      //获取阅读状态
      getReadStatus(){
        this.$http.get('/user/read/state').then(res =>{
          let resp = res.data;
          console.log(resp)
          if(resp.success){
            this.readInfo = resp.data;
            this.readId = resp.data.readId;
          }
        })
      },
      //获取最新课程详情
      getReadDetail(){
        this.$http.get('/user/read/detail').then(res=>{
          let resp = res.data;
          if(resp.success){
            this.readDetail = resp.data;
            console.log(this.readDetail)
          }

        })
      },
      getDate(msg){
        let _this = this
        if(msg.isRange){
          console.log('执行子组件时间')
          if(msg.dayNum){
            _this.dayNum = msg.dayNum;
          }
          _this.getCourseDetail(msg.date)
          _this.courseId = msg.courseId;
        }

      },
      //打卡日历
      getClockCalendar(){
        let _this = this;
        _this.$http.get('/user/read/clockCalendar?readId='+this.readId).then(res=>{
          let resp = res.data;
          if(resp.success){
            _this.c_date = resp.data;
            console.log(_this.c_date)
          }

        })
      },
      //获取缺卡天数
      getLackClock(){
        let _this = this;
        _this.$http.get('/user/read/lackClock? readId='+12).then(res=>{
          let resp = res.data;
        })
      },
      //打卡课程详情
      getCourseDetail(date){
        let _this = this;
        _this.$http.get('/readBookCourse/courseDetailByDate?readId='+_this.readId+'&date='+date).then(res=>{
          let resp = res.data;
          if(resp.success){
            _this.courseDetail = resp.data;
           // _this.courseDetail.clockDate =  date;
          }
        })
      },
      goComment(){
        this.$router.push({name:'comment',params:{readId:this.readId,courseId:this.courseId}})
      }
    }
  };
</script>

<style lang="less">
  @import '../../less/variable';
  .card-main {
    width: 750/@rem;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    // z-index: 9;
    background: #f4f4f4;
    font-size: 24/@rem;
    color:#333;
    .hideNoticeStyle{
      opacity: 0;
      z-index: -1;
      transition:all .3s ease ;
      -webkit-transition:all .3s ease ;
    }
    .showNoticeStyle{
      opacity:1;
      z-index:999;
      transition:all .3s ease ;
      -webkit-transition:all .3s ease ;
    }
    header{
      padding:27/@rem 0 13/@rem 27/@rem;
      border:1px solid #E5E5E5;
      position: relative;
      background: #fff;
      div{
        font-size: 30/@rem;
        line-height: 42/@rem;
      }
      h2{
        font-size: 50/@rem;
        line-height: 70/@rem;
      }
      img{
        position: absolute;
        width:88/@rem;
        height:88/@rem;
        border-radius: 50%;
        top:50%;
        margin-top:-44/@rem;
        right:54/@rem;
      }
    }
    .week-box{
      background: #fff;
      span{
        width:14.2857%;
        display: inline-block;
        text-align: center;
        color:#666;
        font-size: 26/@rem;
        line-height: 37/@rem;
        padding-bottom: 30/@rem;
      }
    }
    .card-head{
      font-size: 26/@rem;
      padding:25/@rem 0 26/@rem 30/@rem;
      line-height: 37/@rem;
      background: #fff;
      .head-right{
        float: right;
        font-size: 24/@rem;
        color:#666;
        line-height: 33/@rem;
        span{
          margin-right: 35/@rem;
        }
        span:nth-of-type(2) i{
          background: #E8E8E8;
        }
        i{
          width:20/@rem;
          height:20/@rem;
          background: #9688FF;
          border-radius: 50%;
          display: inline-block;
          margin-right: 10/@rem;
        }
      }
    }
    .calendar-box{
      margin-bottom: 18/@rem;
      height:430/@rem;
      overflow: auto;
    }
    .book-book{
      padding:42/@rem 30/@rem 49/@rem 36/@rem;
      background: #fff;
      position: relative;
      .book-img{
        width:122/@rem;
        height:165/@rem;
        margin-right: 18/@rem;
        float: left;
        overflow:hidden;
        img{
          width:100%;
          height:100%;
          display:inline-block;
        }
      }
      .book-detail{
        padding-top: 10/@rem;
        .book-title{
          font-size: 30/@rem;
          line-height: 42/@rem;
          margin-bottom: 45/@rem;
        }
        .book-author{
          font-size: 26/@rem;
          line-height: 37/@rem;
          color:#666;
          padding-left: 17/@rem;
          .book-btn{
            background: #FFE555;
            padding:8/@rem 39/@rem;
            border-radius: 25/@rem;
            position: absolute;
            right:30/@rem;
          }
        }
      }
    }
  }
</style>

