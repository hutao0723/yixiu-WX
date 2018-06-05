<template>
  <div class="comment-main" ref="comment" >
    <div class="book-book">
      <div class="book-img">
        <img :src="courseDetail.courseUrl" alt="">
      </div>
      <div class="book-detail">
        <div class="book-title">{{courseDetail.courseTitle}}</div>
        <div class="book-author">
          <span>{{courseDetail.author}}</span>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="comment-box">
      <textarea id="textarea"  @click="getF()" @blur="blurF()"  @input="contentChange()"   placeholder="写下对这本书的感想和收获吧" v-model="content">
      </textarea>
      <div class="placeDom" v-if="!content">不读书的人，思想都会停止。没有比读书更好的娱乐、更持久的满足了。你多久没读书了？</div>
    </div>
    <span class="contentNum" id="contentNum">{{conLenght}}/1000</span>
    <div id="subBtn" @click="subComment()" >提交并打卡</div>
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

    },
    mounted () {

    this.bodyHeight = document.documentElement.clientHeight || document.body.clientHeight;
    },
    methods: {
      isIos: function () {  //ios终端
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      },
      getF(){
        var view = document.querySelector("#app");
        var num = document.querySelector("#contentNum");
        var contentBox = document.querySelector('.comment-box');
        view.style.height = this.bodyHeight + 'px';
        num.style.bottom = '50%';
        contentBox.style.height = '20%';
        if(this.isIos()){
          var bookHeader =  document.querySelector(".book-book");
          num.style.bottom = '52%';
          setTimeout(function () {
            bookHeader.scrollIntoViewIfNeeded({behavior: 'smooth'})
          ,200})
        }
      },

      blurF(){
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
        this.$http.get('/api/readBookCourse/courseDetail?readId='+this.readId +'&courseId='+this.courseId).then(res=>{
          let resp = res.data;
          if(resp.success){
            this.courseDetail = resp.data;
            if(!this.courseDetail.courseUrl){
              this.courseDetail.courseUrl  = 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-book-cover.png'
            }
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
        this.$http.post('/api/user/read/clock',params,{emulateJSON: true}).then(res=>{
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
            this.$router.push('/poster/'+commentId+'/'+lastClock+'/'+isClock)
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
    }
    width: 750/@rem;
    height: 100%;
    position: relative;
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
        width:122/@rem;
        height:165/@rem;
        margin-right: 18/@rem;
        float: left;
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
        }
      }
    }
    .comment-box{
      margin:32/@rem 30/@rem 0 30/@rem;
      position:relative;
      height: 20%;
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

