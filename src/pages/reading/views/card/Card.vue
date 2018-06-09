<template>
  <div class="card-main">
    <cardNotice class="hideNoticeStyle" :class="{showNoticeStyle:noticeFlag}" :noticeFlag="noticeFlag" @changFlag="changeFlag"></cardNotice>
    <header>
      <div>{{readDetail.title}}第{{readDetail.stageNum}}期</div>
      <h2>第{{dayNum}}天</h2>
      <img :src="readInfo.userHeadImgUrl" alt="">
    </header>
    <div class="calendar_header">
      <div class="card-head">
        <span class="head-left" @click="noticeFlag = true "> <i class="iconfont icon-gift"></i> 坚持打卡送大礼 ></span>
        <div class="head-right">
          <span><i></i> 已打卡</span>
          <span><i></i>未打卡</span>
        </div>
      </div>
      <div class="week-box">
        <span v-for="week in weeks" class="week">{{week}}</span>
      </div>
    </div>
    <div class="calendar-box" >
      <calendar-template  :calendarDate='c_date' @getDate="getDate" ></calendar-template>
    </div>
    <div class="book-book" >
      <div class="book-detail-box" v-show="afterToday||isToday">
        <div class="book-img" @click.stop="playAudio(readId,courseId)" >
          <img v-if="courseDetail.courseUrl" :src="courseDetail.courseUrl" alt="">
          <img v-else src="http://yun.dui88.com/youfen/images/read_course_none.png" alt="">
          <div class="book-audio" v-if="afterToday||isToday"></div>
          <div class="book-mark" v-else>
            <i class="iconfont icon-lock"></i>
          </div>
        </div>
        <div class="book-detail">
          <div class="book-title">{{courseDetail.courseTitle}}罗密欧与朱丽叶</div>
          <div class="book-author">
            <div v-show="courseDetail.author">
              <span>{{courseDetail.author}}<span class="audio-right">著</span></span>
            </div>
          </div>
          <div class="book-btn">
              <span  v-show="courseDetail.clockState&&courseDetail.commentState" @click.stop="goPoster()">查看</span>
              <span  v-show="courseDetail.clockState&&!courseDetail.commentState" @click.stop="goComment()">写想法</span>
              <span  v-show="!courseDetail.clockState" @click.stop="goComment()">去打卡</span>
          </div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <div class="card_bottom_text">轻松阅读，日有所得</div>
    <AudioBar></AudioBar>
    <bnav></bnav>

  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import bnav from '../../components/basic/Nav';
  import calendarTemplate from '../../components/layout/calendarTemplate';
  import cardNotice from '../../components/layout/card-notice';
  import AudioBar from '../../components/basic/Audio_Bar';
  import play from '../../api/play'
  export default {
    components: {
      bnav,
      cardNotice,
      calendarTemplate,
      AudioBar
    },
    data () {
      return {
        readId:'', //阅读Id
        courseId:'', //课程Id
        commentId:'',//观点id
        readInfo:'',//阅读状态
        readDetail:'',
        dayNum:'',
        courseDetail:'',//课程详情
        noticeFlag:false,
        // 自定义星期名称
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        c_date:[],
        lastClock:0,
        afterToday:false,
        isToday:false,
      };
    },
    computed: {
      ...mapState({})
    },
    created() {
      this.getReadDetail();
    },
    updated(){

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
      playAudio(readId,courseId){
        if(this.afterToday||this.isToday){
          play.audioInit(readId,courseId,true)
          // 跳转到播放页
          this.$router.push("/audio/index/1");
        }

      },
      //获取阅读状态
      getReadStatus(){
        this.$http.get('/user/read/state').then(res =>{
          let resp = res.data;
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
          }

        })
      },
      getDate(msg){
        let _this = this
        if(msg.isRange){
          _this.afterToday = msg.afterToday;
          _this.isToday = msg.isToday;
          if(msg.afterToday||msg.isToday){
            _this.getCourseDetail(msg.date)
          }
          if(msg.dayNum){
            _this.dayNum = msg.dayNum;
          }
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
          }

        })
      },

      //打卡课程详情
      getCourseDetail(date){
        let _this = this;
        _this.$http.get('/readBookCourse/courseDetailByDate?readId='+_this.readId+'&date='+date).then(res=>{
          let resp = res.data;
          if(resp.success){
            _this.courseDetail = resp.data;
            if( _this.courseDetail.commentId){
              _this.commentId =  _this.courseDetail.commentId
            }
          }
        })
      },
      goComment(){
        this.$router.push({name:'comment',params:{readId:this.readId,courseId:this.courseId}})
      },
      goPoster(){
        this.$router.push({name:'poster',query:{commentId:this.commentId,lastClock:0,isClock:1}})
      }
    }
  };
</script>

<style lang="less" scoped>
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
    background: #F4F4F4;
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
      height:158/@rem;
      border:1px solid #E5E5E5;
      position: relative;
      background: #fff;
      padding-left:27/@rem;
      div{
        padding:29/@rem 0 4/@rem 0;
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
    .calendar_header:after{
      content: '';
      width:92%;
      height:1px;
      background: #E5E5E5;
      position: absolute;
      bottom:0;
      left:50%;
      margin-left: -46%;
    }
    .calendar_header{
      height:136/@rem;
      background:#fff;
      position: relative;
      .card-head{
        font-size: 26/@rem;
        padding:25/@rem 0 25/@rem 29/@rem;
        line-height: 37/@rem;
        background: #fff;
        .icon-gift{
          font-size: 40/@rem;
          color:#FF9252;
        }
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
      .week-box{
        background: #fff;
        span{
          width:14.2857%;
          display: inline-block;
          text-align: center;
          color:#666;
          font-size: 26/@rem;
          line-height: 37/@rem;
        }
      }
    }


    .calendar-box{
      margin-bottom: 18/@rem;
      height:440/@rem;
      overflow: auto;
      background:#fff;
      -webkit-overflow-scrolling: touch
    }
    .book-book{
      height:255/@rem;
      background: #fff;
      position: relative;
      .book-detail-box{
        padding:42/@rem 0 49/@rem 36/@rem;
      }
      .book-img{
        width:120/@rem;
        height:160/@rem;
        margin-right: 39/@rem;
        float: left;
        overflow:hidden;
        position:relative;
        border-radius: 4/@rem;
        .book-audio{
          position:absolute;
          width:64/@rem;
          height:64/@rem;
          background:rgba(52, 52, 52, 0.79);
          border-radius:50%;
          top:50%;
          left:50%;
          margin-top:-32/@rem;
          margin-left:-32/@rem;
        }
        .book-audio:after{
          content:'';
          width:0;
          height:0;
          border-top: 14/@rem solid transparent;
          border-left:23/@rem solid #fff;
          border-bottom:14/@rem solid transparent;
          position:absolute;
          left: 50%;
          top: 50%;
          transform: translate(-35%,-50%);
        }
        .book-mark{
          width:100%;
          height:100%;
          background:rgba(0, 0, 0, 0.6);
          position:absolute;
          top:0;
          left:0;
          .icon-lock {
            font-size: 30/@rem;
            color: #fff;
            position:absolute;
            left: 50%;
            top: 50%;
            transform: translate(-35%,-50%);
          }
        }
        img{
          width:100%;
          height:100%;
          display:inline-block;
        }
      }
      .book-detail{
        float: left;
        width:76%;
        .book-title{
          font-size: 30/@rem;
          line-height: 42/@rem;
          margin-bottom: 12/@rem;
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .book-author{
          height:40/@rem;
          font-size: 26/@rem;
          line-height: 37/@rem;
          color:#666;
          margin-bottom: 13/@rem;
          .audio-right{
            margin-left: 16/@rem;
          }
        }
        .book-btn span{
          display: inline-block;
          font-size: 26/@rem;
          background: #FFE555;
          width:130/@rem;
          text-align: center;
          height:54/@rem;
          line-height: 54/@rem;
          border-radius: 25/@rem;
          color:#333;
        }
      }
    }
    .card_bottom_text{
      text-align:center;
      font-size:26/@rem;
      color:#C1C1C1;
      height:95/@rem;
      line-height:95/@rem;
      padding-bottom: 100/@rem;
    }
  }
</style>

