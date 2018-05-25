<template>
  <div class="home-main" ref="homeMain">

    <div class="home-tab">
      <div class="item">
        <span>简介</span>
      </div>
      <div class="item">
        <span>课程</span>
      </div>
    </div>
    <div class="home-content"></div>
    <div class="home-review">
      <h2>学员观点</h2>
      <div class="item" v-for="(item,index) in reviewList" :key="index">
        <img :src="item.headerImg" alt="" class="book-header">
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
    padding-top: 20/@rem; // z-index: 9;
    background: #fff;
    font-size: 24/@rem;
    .icon-nav {
      height: 480/@rem;
      border: 1px solid #ccc;
    }
    .home-tab{
      .item{
        width: 50%;
        float: left;
        span{
          .size(126,102)
          .text()
        }
      }
    }
  }

</style>

