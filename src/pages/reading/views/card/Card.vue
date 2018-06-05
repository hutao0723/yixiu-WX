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
    <div class="book-book" @click.stop="playAudio(readId,courseId)">
      <div class="book-img">
        <img :src="courseDetail.courseUrl" alt="">
        <div class="book-audio" v-if="afterToday||isToday"></div>
        <div class="book-mark" v-else>
          <i class="iconfont icon-lock"></i>
        </div>
      </div>
      <div class="book-detail">
        <div class="book-title">{{courseDetail.courseTitle}}</div>
        <div class="book-author">
          <span>{{courseDetail.author}}</span>
          <span class="book-btn" v-if="afterToday||isToday">
              <span  v-if="courseDetail.clockState==1&&courseDetail.commentState==1" @click.stop="goPoster()">查看</span>
              <span  v-if="courseDetail.clockState==1&&courseDetail.commentState==0" @click.stop="goComment()">写想法</span>
              <span  v-if="courseDetail.clockState==0" @click.stop="goComment()">去打卡</span>
          </span>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="card_bottom_text">听得见的知识 看得见的成长</div>
    <bnav></bnav>
    <AudioBar></AudioBar>
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
        this.$http.get('/api/user/read/state').then(res =>{
          let resp = res.data;
          if(resp.success){
            this.readInfo = resp.data;
            this.readId = resp.data.readId;
          }
        })
      },
      //获取最新课程详情
      getReadDetail(){
        this.$http.get('/api/user/read/detail').then(res=>{
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
        _this.$http.get('/api/user/read/clockCalendar?readId='+this.readId).then(res=>{
          let resp = res.data;
          if(resp.success){
            _this.c_date = resp.data;
          }

        })
      },

      //打卡课程详情
      getCourseDetail(date){
        let _this = this;
        _this.$http.get('/api/readBookCourse/courseDetailByDate?readId='+_this.readId+'&date='+date).then(res=>{
          let resp = res.data;
          if(resp.success){
            _this.courseDetail = resp.data;
            if(!_this.courseDetail.courseUrl){
              _this.courseDetail.courseUrl = 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-book-cover.png'
            }
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
        this.$router.push('/poster/'+this.commentId+'/0/1')
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
    .calendar_header{
      height:136/@rem;
      background:#fff;
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
        position:relative;
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
    .card_bottom_text{
      text-align:center;
      font-size:26/@rem;
      color:#C1C1C1;
      height:95/@rem;
      line-height:95/@rem;
    }
  }
</style>

