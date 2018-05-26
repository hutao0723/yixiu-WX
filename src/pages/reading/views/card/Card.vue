<template>
  <div class="card-main">
    <cardNotice class="hideNoticeStyle" :class="{showNoticeStyle:noticeFlag}" :noticeFlag="noticeFlag" @changFlag="changeFlag"></cardNotice>
    <header>
      <div>100天魔鬼训练营第3期</div>
      <h2>第3天</h2>
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
      <calendar ></calendar>
    </div>
    <div class="book-book">
      <div class="book-img"></div>
      <div class="book-detail">
        <div class="book-title">《这是一本书就是这么有意思》</div>
        <div class="book-author">
          <span>作者</span>
          <!--<span class="book-btn">查看</span>-->
          <span class="book-btn" @click="goComment()">写想法</span>
          <!--<span class="book-btn" >去打卡</span>-->
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
  import calendar from '../../components/layout/calendar.vue';
  import cardNotice from '../../components/layout/card-notice';
  export default {
    components: {
      bnav,
      calendar,
      cardNotice,
    },
    data () {
      return {
        noticeFlag:false,
        // 自定义星期名称
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
      };
    },
    computed: {
      ...mapState({})
    },
    created() {

    },
    mounted () {

    },
    methods: {
      changeFlag(msg){
        this.noticeFlag = msg;
      },
      //打卡日历
      getClockCalendar(){
        let _this = this;
        _this.$http.get('/user/read/clockCalendar? readId='+12).then(res=>{
          let resp = res.data;
          console.log(resp)
        })
      },
      //打卡状态，评论状态
      getClockState(){
        let _this = this;
        _this.$http.get('/user/read/clockState? readId='+12 +'&&courseId='+1).then(res=>{
          let resp = res.data;
          console.log(resp)
        })
      },
      //获取缺卡天数
      getLackClock(){
        let _this = this;
        _this.$http.get('/user/read/lackClock? readId='+12).then(res=>{
          let resp = res.data;
          console.log(resp)
        })
      },
      goComment(){
        //发表想法
        this.$router.push('/comment')
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
        background: pink;
        float: left;
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

