<template>
  <div class="comment-main" ref="comment">
    <div class="book-book">
      <div class="book-img">
        <img v-if="courseDetail.courseUrl" :src="courseDetail.courseUrl" alt="">
        <img v-else src="http://yun.dui88.com/youfen/images/read_course_none.png" alt="">
      </div>
      <div class="book-detail">
        <div class="book-title">《{{contentSlice(courseDetail.courseTitle)}}》</div>
        <div class="book-author" v-show="courseDetail.author">
          <span>{{courseDetail.author}}<span class="audio-right">著</span></span>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="comment-box">
      <textarea id="textarea"  @click="clickFun($event,getFocus)" :monitor-log="getMonitor('8001.'+readId+'.0.'+courseId,'832.1.0')" @blur="blurFocus()"  @input="contentChange()"   placeholder="写下对这本书的感想和收获吧" v-model="content">
      </textarea>
      <div class="placeDom" @click="focusDom()" v-if="!content">不读书的人，思想都会停止。没有比读书更好的娱乐、更持久的满足了。你多久没读书了？</div>
    </div>
    <span class="contentNum" id="contentNum">{{conLenght}}/1000</span>
    <div id="subBtn" @click="clickFun($event,subComment)" :monitor-log="getMonitor('8001.'+readId+'.0.'+courseId,'832.2.0')">提交并打卡</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    components: {

    },
    data () {
      return {
        courseId:'',
        readId:'',
        courseDetail:'',
        content:'',
        conLenght:0,
        textareaHover:false,
        bodyHeight:0,
        isFrist:true
      };
    },
    updated:function(){
      if(this.isFrist){
        var originalHeight = document.documentElement.clientHeight || document.body.clientHeight;
        var view = document.querySelector("#app");
        var num = document.querySelector("#contentNum");
        var contentBox = document.querySelector('.comment-box');
        window.onresize=function(){
          var  resizeHeight=document.documentElement.clientHeight || document.body.clientHeight;
          if(originalHeight-resizeHeight > 140){
            view.style.height = originalHeight + 'px';
            num.style.bottom = '50%';
            contentBox.style.height = '20%';
          }else{
            num.style.bottom = '10%';
            contentBox.style.height = '64%';
          }

        }
        this.isFrist = false
      }

    },
    computed: {
      ...mapState({})
    },
    created() {
      this.getCourseId();
      this.getContent();
    },
    mounted () {
      let self = this;
      setTimeout(() => {
        window.monitor && window.monitor.showLog(self);
      }, 100)
      this.bodyHeight = document.documentElement.clientHeight || document.body.clientHeight;
    },
    methods: {
      getMonitor(dcm,dpm) {
        // item tabindex dpmc
        return JSON.stringify({
          'dcm': dcm,
          'dpm': '157.' + dpm,
        });
      },
      isIos: function () {  //ios终端
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      },
      focusDom(){
        document.getElementById('textarea').focus();
      },
      contentSlice(str){
        if(str&&str.length>15){
          return str.slice(0,15) + '...'
        }else{
          return str
        }
      },
      getContent(){
        let courseId = this.$route.params.courseId;
        let readId = this.$route.params.readId;
        this.$http.get('/comment/getByReadAndCourse?readId='+readId +'&courseId='+courseId).then(res=>{
          let resp = res.data;
          if(resp.success){
            this.content = resp.data.content
            if(this.content){
              this.conLenght = this.content.length;
            }
          }
        })
      },
      getFocus(){
        var view = document.querySelector("#app");
        var num = document.querySelector("#contentNum");
        var contentBox = document.querySelector('.comment-box');
        view.style.height = this.bodyHeight + 'px';
        num.style.bottom = '50%';
        contentBox.style.height = '20%';
        if(this.isIos()){
          var bookHeader =  document.querySelector(".book-book");
         // num.style.bottom = '52%';
          setTimeout(function () {
            bookHeader.scrollIntoViewIfNeeded({behavior: 'smooth'})
          ,200})
        }
      },

      blurFocus(){
        var num = document.querySelector("#contentNum");
        var contentBox = document.querySelector('.comment-box');
        num.style.bottom = '10%';
        contentBox.style.height = '64%';
      },

      contentChange(){
        this.conLenght = this.content.length;
        if(this.conLenght>=1000){
          this.conLenght = 1000;
          this.content = this.content.slice(0,1000)
        }
      },

      getCourseId(){
        this.courseId = this.$route.params.courseId;
        this.readId = this.$route.params.readId;
        this.$http.get('/readBookCourse/courseDetail?readId='+this.readId +'&courseId='+this.courseId).then(res=>{
          let resp = res.data;
          if(resp.success){
            this.courseDetail = resp.data;
          }
        })
      },
      subComment(){
        let params={
          content:this.content,
          readId:this.readId,
          courseId:this.courseId,
          dayNum:this.courseDetail.days
        }
        this.$http.post('/user/read/clock',params,{emulateJSON: true}).then(res=>{
          let resp = res.data;
          if(resp.success){
            let commentId = resp.data.commentId;
            let lastClock;
            let isClock = 1;
            if(resp.data.lastClock){
              lastClock=1
            }else{
              lastClock=0
            }
            //this.$router.push('/poster/'+commentId+'/'+lastClock+'/'+isClock)
            this.$router.push({name:'poster',query:{commentId:commentId,lastClock:lastClock,isClock:isClock}})
          }
        })
      },
    }
  };
</script>

<style lang="less">
  @import '../../less/variable';
  .comment-main {
    .contentNum{
      position:absolute;
      right:29/@rem;
      font-size:26/@rem;
      color:#999999;
      bottom:10%;
      transition: bottom .2s ;
      -webkit-transition: bottom .2s ;
    }
    width: 750/@rem;
    height: 100%;
    position: relative;
    overflow: hidden;
    // z-index: 9;
    background: #fff;
    font-size: 24/@rem;
    .icon-nav{
      height: 480/@rem;
      border: 1px solid #ccc;
    }
    .book-book{
      padding:32/@rem 0;
      margin:0 30/@rem;
      background: #fff;
      position: relative;
      border-bottom: 1px solid #E5E5E5;
      .book-img{
        width:120/@rem;
        height:160/@rem;
        margin-right: 24/@rem;
        float: left;
        overflow:hidden;
        border-radius: 4/@rem;
        img{
          width:100%;
          height:100%;
          display:inline-block;
        }
      }
      .book-detail{
        padding-top: 10/@rem;
        float: left;
        width:76%;
        .book-title{
          font-size: 30/@rem;
          line-height: 42/@rem;
          margin-bottom: 36/@rem;
          font-weight: bold;
          white-space: nowrap;
        }
        .book-author{
          font-size: 26/@rem;
          line-height: 37/@rem;
          margin-left: 14/@rem;
          color:#666;
          .audio-right{
            margin-left: 16/@rem;
          }
        }
      }
    }
    .comment-box{
      margin:32/@rem 30/@rem 0 30/@rem;
      position:relative;
      height: 64%;
      textarea{
        width:100%;
        height: 100%;
        outline: none;
        border:0;
        font-size: 28/@rem;
        line-height: 40/@rem;
        word-break:break-all;
        overflow: auto;
      }
      textarea::-webkit-input-placeholder{
        color:#BFBFBF;
      }
      .placeDom{
        color:#BFBFBF;
        font-size:28/@rem;
        line-height:40/@rem;
        position:absolute;
        top:95/@rem;
      }
    }

    #subBtn{
      font-size: 30/@rem;
      height:90/@rem;
      line-height: 90/@rem;
      background: #FFE555;
      text-align: center;
      color:#333333;
      position: absolute;
      width:100%;
      bottom:0;
    }
  }
</style>

