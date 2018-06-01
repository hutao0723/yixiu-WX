<template>
  <div class="comment-main">
    {{bfscrolltop}}
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
      <textarea @input="contentChange()" autofocus placeholder="写下对这本书的感想和收获吧" v-model="content">
      </textarea>
      <div class="placeDom" v-if="!content">不读书的人，思想都会停止。没有比读书更好的娱乐、更持久的满足了。你多久没读书了？</div>
    </div>
    <span class="contentNum">{{conLenght}}/1000</span>
    <div class="sub-comment" @click="subComment()">提交并打卡</div>
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
        bfscrolltop:''
      };
    },
    updated:function(){
      this.bfscrolltop = document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
      console.log(this.bfscrolltop)
    },
    computed: {
      ...mapState({})
    },
    created() {
      this.getCourseId()

    },
    mounted () {
    },
    methods: {
      contentChange(){
        this.conLenght = this.content.length
      },
      getCourseId(){
        this.courseId = this.$route.params.courseId;
        this.readId = this.$route.params.readId;
        console.log(this.courseId,this.readId)
        this.$http.get('/api/readBookCourse/courseDetail?readId='+this.readId +'&courseId='+this.courseId).then(res=>{
          let resp = res.data;
          if(resp.success){
            this.courseDetail = resp.data;
            if(!this.courseDetail.courseUrl){
              this.courseDetail.courseUrl  = 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-book-cover.png'
            }
          }
          console.log(resp)
        })
      },
      subComment(){
        let params={
          content:this.content,
          readId:this.readId,
          courseId:this.courseId,
          dayNum:this.courseDetail.days
        }
        console.log(params)
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
      bottom:120/@rem;
    }
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
      textarea{
        width:100%;
        outline: none;
        border:0;
        font-size: 28/@rem;
        height:364/@rem;
        line-height: 40/@rem;
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

    .sub-comment{
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

