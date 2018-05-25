<template>
  <div class="home-main" ref="homeMain">

    <div class="home-tab clearfix">
      <div class="item">
        <span class="active">简介</span>
      </div>
      <div class="item">
        <span>课程</span>
      </div>
    </div>
    <div class="home-content"></div>
    <div class="home-review">
      <h2>学员观点</h2>
      <div class="item" v-for="(item,index) in reviewList" :key="index">
        <img :src="item.headerImg" alt="" class="item-header">
        <div class="item-name">{{item.name}}</div>
        <div class="item-periods">{{item.periods}}</div>
        <div class="item-content">{{item.content}}</div>
        <div class="item-book">
          <img class="book-img" :src="item.bookImg" alt="">
          <div class="book-name">《{{item.bookName}}》</div>
          <div class="book-author">作者{{item.author}}</div>
        </div>
        <div class="item-praise">
          <i></i>
        </div>
        <div class="item-transmit">
          <i></i>
        </div>
      </div>
    </div>
    <AudioBar/>
  </div>
</template>

<script>
  import AudioBar from '../../components/basic/Audio_Bar';
  import {
    mapState
  } from 'vuex';
  export default {
    components: {
      AudioBar
    },
    data() {
      return {
        reviewList: [{
          headerImg: '',
          name: '木南岸那',
          periods: '魔鬼训练营第3期',
          content: '张老师讲的太好了阿斯顿撒张老师讲的太好了阿斯顿撒张老师讲的太好了阿斯顿撒张老师讲的太好了阿斯顿撒张老师讲的太好了阿斯顿撒张老师讲的太好了阿斯顿撒',
          bookImg: '',
          bookName: '遇见傻逼 ',
          author: '的sa',
          praiseNumber: '23',
        }]
      };
    },
    computed: {
      ...mapState({})
    },
    created() {},
    mounted() {},
    methods: {}
  };

</script>

<style lang="less">
  @import '../../less/variable';
  @import '../../less/util';

  .home-main {
    width: 750/@rem;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background: #fff;
    font-size: 24/@rem;
    .icon-nav {
      height: 480/@rem;
      border: 1px solid #ccc;
    }
    .home-tab {
      .item {
        width: 50%;
        float: left;
        text-align: center;
        span {
          .size(126, 102);
          .text(44, 102);
          display: inline-block;
          text-align: center;
          color: #bbb;
        }
        .active {
          color: #333;
          border-bottom: 6/@rem solid #333;
        }
      }
    }
    .home-review {
      h2 {
        .text(40, 120);
        color: #333;
        text-align: center;
      }
      .item{
        position: relative;
        height: 560/@rem;
        .item-header{
          .size(64,64);
          .pos(30,40);
          border-radius: 50%;
          overflow: hidden;
        }
        .item-name{
          .pos(118,36);
          .text(30,42);
          color: #333;
          padding-right: 62/@rem;
        }
        .item-periods{
          .pos(118,82);
          .text(24,33);
          color: #666;
          padding-right: 62/@rem;
        }
        .item-content{
          .pos(118,130);
          font-size: 30/@rem;
          line-height: 42/@rem;
          color: #666;
          padding-right: 62/@rem;
        }
        .item-book{
          .size(596,148);
          .pos(118,318);
          position: relative;
          background: #eee;
          border-radius: 4/@rem;
          .book-img{
            .pos(30,13);
            .size(80,112);
            border: 5/@rem solid #fff;
          }
          .book-name{
            .pos(120,25);
            .text(30,42);
            color: #555;
          }
          .book-author{
            .pos(134,75);
            .text(26,37);
            color: #666;
          }
        }
      }
      
    }
  }

</style>

