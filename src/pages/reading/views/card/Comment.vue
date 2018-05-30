<template>
  <div class="comment-main">
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
      <textarea placeholder="写下对这本书的感想和收获吧" v-model="content"></textarea>
    </div>
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
        content:''
      };
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
      getCourseId(){
        this.courseId = this.$route.params.courseId;
        this.readId = this.$route.params.readId;
        console.log(this.courseId,this.readId)
        this.$http.get('/api/readBookCourse/courseDetail?readId='+this.readId +'&courseId='+this.courseId).then(res=>{
          let resp = res.data;
          if(resp.success){
            this.courseDetail = resp.data;
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
            console.log(resp.data)
            let commentId = resp.data.commentId;
            let lastClock = resp.data.lastClock;
          }
        })
      },
    }
  };
</script>

<style lang="less">
  @import '../../less/variable';
  .comment-main {
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
      padding:32/@rem 30/@rem 0 30/@rem;
      textarea{
        width:100%;
        outline: none;
        border:0;
        font-size: 28/@rem;
        height:364/@rem;
        line-height: 40/@rem;
      }
    }
    .sub-comment{
      font-size: 30/@rem;
      height:90/@rem;
      line-height: 90/@rem;
      background: #FFE555;
      text-align: center;
      color:#333333;
      position: fixed;
      width:100%;
      bottom:0;
    }
  }
</style>

