<template>
  <div class="comment-main">
    <div class="book-book">
      <div class="book-img"></div>
      <div class="book-detail">
        <div class="book-title">《这是一本书就是这么有意思》</div>
        <div class="book-author">
          <span>作者</span>
          <!--<span class="book-btn">查看</span>-->
          <span class="book-btn" @click="goComment()">写想法</span>
        </div>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="comment-box">
      <textarea placeholder="写下对这本书的感想和收获吧"></textarea>
    </div>
    <div class="sub-comment">提交并打卡</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    components: {

    },
    data () {
      return {
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

