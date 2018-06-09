<template>
  <div class="card-main">
    <div class="cardNotice-box" @click="hideNotice()" v-show="noticeFlag" @touchmove.prevent>
      <div class="notice-box">
        <div class="notice-title">打卡须知</div>
        <ul class="notice-content">
          <div class="notice-order">
            <span>1</span>
            <i v-for="item in [1,2,3,4,5,6,7,8,9,10,11,12]"></i>
            <span>2</span>
          </div>
          <li>点击xx页面，完成当日学习目标后，将自动弹出弹窗提醒打卡。或者在收听页面，点击“打卡“按钮进行打卡</li>
          <li>分享打卡图片至微信朋友圈，并把分享截图发送至班级群，坚持49天即可获得一修阅读定制音响</li>
        </ul>
        <div class="notice-btn" @click="hideNotice()">我知道了</div>
      </div>
    </div>


    <header>
      <div>{{readDetail.title}}第{{readDetail.stageNum}}期</div>
      <h2>第{{dayNum}}天</h2>
      <img :src="readInfo.userHeadImgUrl" alt="">
    </header>
    <div class="calendar_header">
      <div class="card-head">
        <span class="head-left" @click="noticeFlag = true "> <i class="iconfont icon-gift"></i>坚持打卡送大礼<i class="iconfont icon-right"></i> </span>
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
      <div class="book-detail-box" v-show="afterToday||isToday" >
        <div class="book-img" @click.stop="playAudio(readId,courseId)" >
          <img v-if="courseDetail.courseUrl" :src="courseDetail.courseUrl" alt="">
          <img v-else src="http://yun.dui88.com/youfen/images/read_course_none.png" alt="">
          <div class="book-audio" v-if="afterToday||isToday">
            <i class="iconfont icon-play"></i>
          </div>
          <div class="book-mark" v-else>
            <i class="iconfont icon-lock"></i>
          </div>
        </div>
        <div class="book-detail">
          <div class="book-title">《{{contentSlice(courseDetail.courseTitle)}}》</div>
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
  import AudioBar from '../../components/basic/Audio_Bar';
  import play from '../../api/play'
  export default {
    components: {
      bnav,
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

      hideNotice(){
        this.noticeFlag = false
      },
      contentSlice(str){
        if(str&&str.length>15){
          return str.slice(0,15) + '...'
        }else{
          return str
        }
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
    .cardNotice-box{
      width:100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      z-index: 999;
      position: fixed;
      top:0;
      left:0;
      color:#333;
      .notice-box{
        width:580/@rem;
        height:640/@rem;
        border-radius: 8/@rem;
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        overflow: hidden;
        background: #fff;
        .notice-title{
          font-size: 34/@rem;
          text-align: center;
          height: 94/@rem;
          line-height: 94/@rem;
          background: #FFE555;
          font-weight: bold;
        }
        .notice-content{
          padding:32/@rem 30/@rem 0 100/@rem;
          position: relative;
          background: #fff;
          li:nth-of-type(1){
            margin-bottom: 56/@rem;
          }
          li{
            color:#555555;
            font-size: 28/@rem;
            line-height: 37/@rem;
            height:163/@rem;
            letter-spacing: 1px;
          }
          .notice-order{
            position: absolute;
            left:30/@rem;
            span{
              font-size: 30/@rem;
              width:50/@rem;
              height:50/@rem;
              background: #FFE555;
              border-radius: 50%;
              display: block;
              text-align: center;
              line-height: 50/@rem;
              margin-bottom: 9/@rem;
              font-weight: bold;
            }
            i{
              width:4/@rem;
              height:4/@rem;
              background: #F7DC7B;
              border-radius: 50%;
              display: block;
              margin: 0 auto;
              margin-bottom: 9/@rem;
            }
          }
        }
        .notice-btn{
          text-align: center;
          border-top: 1px dashed #C4C4C4;
          height:90/@rem;
          line-height: 90/@rem;
          font-size: 30/@rem;
          background: #fff;
          font-weight: bold;
          position: absolute;
          width:100%;
          bottom:0;
        }
        .notice-btn:active{
          background: #E5E5E5;
        }
      }
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
        height: 37/@rem;
        background: #fff;
        .icon-gift{
          font-size: 40/@rem;
          color:#FF9252;
          margin-right: 10/@rem;

        }
        .icon-right{
          font-size: 14/@rem;
          color:#9B9B9B;
          display: inline-block;
          vertical-align: middle;
          margin-left: 13/@rem;
          margin-top: -3/@rem;
        }
        .head-right{
          float: right;
          font-size: 24/@rem;
          color:#666;
          line-height: 37/@rem;
          padding-top: 5/@rem;
          span{
            display: inline-block;
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
        margin-right: 24/@rem;
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
          .icon-play{
            font-size: 28/@rem;
            color:#fff;
            position: absolute;
            top:50%;
            left:50%;
            transform: translate(-40%,-50%);
          }
        }
        .book-mark{
          width:100%;
          height:100%;
          background:rgba(0, 0, 0, 0.7);
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
          margin-left: 14/@rem;
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
          margin-left: 12/@rem;
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

