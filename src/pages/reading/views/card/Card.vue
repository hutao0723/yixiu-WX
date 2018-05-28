<template>
  <div class="card-main">
    <cardNotice class="hideNoticeStyle" :class="{showNoticeStyle:noticeFlag}" :noticeFlag="noticeFlag" @changFlag="changeFlag"></cardNotice>
    <header>
      <div>100天魔鬼训练营第{{readDetail.stageNum}}期</div>
      <h2>第{{dayNum}}天</h2>
      <img src="" alt="">
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
          <span class="book-btn" v-if="courseDetail.clockState==1&&courseDetail.commentState==0" @click="goComment(courseDetail)">写想法</span>
          <span class="book-btn" v-if="courseDetail.clockState==0" @click="goComment(courseDetail)">去打卡</span>
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
        readId:28, //阅读Id
        courseId:'', //课程Id
        readDetail:'',
        dayNum:'4',
        courseDetail:{
          courseId:1,  //课程ID
          courseTitle:'偷影子的人', //课程标题 ,
          author:'萨瓦迪卡',   //作者 ,
          clockState:0,// 打卡状态: 0=未打卡,1=已打卡 ,
          commentState:0,//评论状态:0=未评论,1=已评论 ,
          courseUrl:'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=502422c7a6efce1bea2bcfcc976a94e3/b21c8701a18b87d6e7b4ca2e060828381f30fd09.jpg' ,// 课程图片
          playbackProgress:'',//课程播放进度 ,
        },//课程详情
        noticeFlag:false,
        // 自定义星期名称
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        c_date: [
          {"date":"2018-05-25","courseId":0,"clockState":true,"commentState":false,"dayNum":1},
          {"date":"2018-05-26","courseId":1,"clockState":false,"commentState":false,"dayNum":2},
          {"date":"2018-05-27","courseId":2,"clockState":true,"commentState":false,"dayNum":3},
          {"date":"2018-05-28","courseId":3,"clockState":true,"commentState":false,"dayNum":4},
          {"date":"2018-05-29","courseId":4,"clockState":false,"commentState":false,"dayNum":5},
          {"date":"2018-05-30","courseId":5,"clockState":true,"commentState":false,"dayNum":6},
          {"date":"2018-05-31","courseId":6,"clockState":true,"commentState":false,"dayNum":7},
          {"date":"2018-06-01","courseId":7,"clockState":true,"commentState":false,"dayNum":8},
          {"date":"2018-06-02","courseId":8,"clockState":true,"commentState":false,"dayNum":9},
          {"date":"2018-06-03","courseId":9,"clockState":true,"commentState":false,"dayNum":10}
        ]
      };
    },
    computed: {
      ...mapState({})
    },
    created() {

    },
    mounted () {
      //this.readId = this.$router.params.readid
      this.getReadDetail();
      this.getClockCalendar()
    },
    methods: {
      changeFlag(msg){
        this.noticeFlag = msg;
      },
      //获取最新课程详情
      getReadDetail(){
        this.$http.get('/api/user/read/detail').then(res=>{
          let resp = res.data;
          console.log(res)
          this.readDetail = res.data;
        })
      },
      getDate(msg){
        let _this = this
        console.log(msg)
        _this.dayNum = msg.dayNum;
        _this.courseId = msg.courseId;
        _this.getCourseDetail(msg.date)
      },
      //打卡日历
      getClockCalendar(){
        let _this = this;
        _this.$http.get('/api/user/read/clockCalendar?readId='+this.readId).then(res=>{
          let resp = res.data;
         // _this.c_date = res.data;
          console.log(resp)
        })
      },
      //打卡状态，评论状态
      getClockState(){
        let _this = this;
        _this.$http.get('/api/user/read/clockState? readId='+12 +'&&courseId='+1).then(res=>{
          let resp = res.data;
          console.log(resp)
        })
      },
      //获取缺卡天数
      getLackClock(){
        let _this = this;
        _this.$http.get('/api/user/read/lackClock? readId='+12).then(res=>{
          let resp = res.data;
          console.log(resp)
        })
      },
      //打卡课程详情
      getCourseDetail(date){
        let _this = this;
        _this.$http.get('/api/readBookCourse/courseDetailByDate?readId='+_this.readId+'&date='+date).then(res=>{
          let resp = res.data;
          //_this.courseDetail = res.data;
        })
      },
      goComment(data){
        let detail = JSON.stringify(data);
        //发表想法
        //this.$router.push({name:'comment',params:{data:detail}})
        this.$router.push('/comment?data='+ detail)
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
        background: pink;
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
        float: left;
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

