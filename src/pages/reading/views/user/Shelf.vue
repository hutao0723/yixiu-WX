<template>
  <div class="main" ref="shelfmain">
    <div class="shelf-main">
      <div v-if="!noData">
        <div v-for="(item, index) in swipeList">
          <SwiperBar :param.sync="item" @newSwiperIndex="getBookList"/>
        </div>
        <div class="clearfix">
          <div class="book-table" v-for="(item, index) in bookList"  @click="clickFun($event)" :monitor-log="getMonitor('8001.'+item.readId+'.0.'+item.courseId, '827.1.'+index)">
            <div @click="playAudio(item.readId,item.courseId)">
              <div class="book-cover">
                <img :src="item.verticalCover || frontImgUrl">
              </div>
              <div class="book-name line2">《{{item.title}}》</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="no-book">
          <div class="book-container">
            <img src="https://yun.dui88.com/yoofans/images/201805/read/shelf.png">
          </div>
          <div class="book-word">正式毕业后，可在往期书架中继续看书~</div>
        </div>
      </div>

      <!-- <div class="already-alert" v-show="alertToggle">
        <div class="alert-top">
          <h3>《{{bookName}}》</h3>
          <div class="clearfix book-box" >
            <div class="item" v-for="(item,index) in dayNumList" :key="index" @click.stop="playAudio(item.readId,item.courseId)">{{index+1}}</div>
          </div>
        </div>
        <div class="alert-btn" @click="alertToggle = false;">取消</div>
        <div class="alert-bg" @click="alertToggle = false;"></div>
      </div> -->
    </div>
     
     <AudioBar :monitorlog="getMonitor('0.0.0.0', '827.2.0')"/>
  </div>

</template>

<script>
import { mapState } from 'vuex';

import SwiperBar from '../../components/layout/swiper_bar';
import play from '../../api/play'
import user from '../../api/user';
import AudioBar from '../../components/basic/Audio_Bar';

export default {
  components: {
    SwiperBar,AudioBar
  },
  data () {
    return {
      data: {},

      noData: false,

      alertToggle: false,

      bookUrl: "",
      bookName: "",
      swipeList: [],
      bookList: [],
      dayNumList: [],

      frontImgUrl: "http://yun.dui88.com/youfen/images/read_course_none.png",

      readId: null,
      pageNum: 1,
      pageSize: 12,

      busy: true
    }
  },
  computed: {
    ...mapState({})
  },
  created() {
    },
  async mounted () {
    this.setTitle('一修读书');
    await this.getSwipeInfo();
    let self = this;
    self.$nextTick(function () {
      setTimeout(() => {
        window.monitor && window.monitor.showLog(self);
        if (self.$refs.shelfmain) self.$refs.shelfmain.addEventListener('scroll', self.dispatchScroll, false);
      }, 100)
    })
  },
  methods: {
    getMonitor(dcm,dpm) {
      // item tabindex dpmc
      return JSON.stringify({
        'dcm': dcm,
        'dpm': '157.' + dpm,
      });
    },
    // 触发滚动
    dispatchScroll () {
      window.monitor && window.monitor.showLog(this);
    },
    playAudio(readId,courseId){
      play.audioInit(readId,courseId,true,this)
    },
    async getSwipeInfo() {
      let objs = await user.getSwipeList();
      if (objs.success) {
        if (objs.data.content && objs.data.content.length) {
          this.noData = false;
        }else{
          this.noData = true;
        }
        this.swipeList = [objs.data.content]

      } else {
        console.log("获取数据失败")
      }
    },
    // 获取书籍列表
    getBookList (readId){
      if(this.readId != readId){
        this.bookList = []
      }
      this.readId = readId
      const url = `/readBook/bookList`;
      let params = {}
        params = {
          readId: this.readId
        }
        this.$http.get(url, {
          params
        }).then((res) => {
          let objs = res.data
          let obj = objs.data
          console.log(obj)
          if (objs.success) {
            if (obj && obj.length > 0) {
                this.bookList = obj;
            } 
          } else {
            this.busy = true
            console.log("获取数据失败")
          }

        });
        let self = this;
        self.$nextTick(function () {
          setTimeout(() => {
            window.monitor && window.monitor.showLog(self);
          }, 100)
        })
    }
    // // 获取弹框列表
    // async getdayNumInfo (bookId,readId,title) {
    //   let objs = await user.getdayNum(bookId,readId);
    //   if (objs.success) {
    //     this.bookName = title
    //     this.dayNumList = objs.data
    //     this.alertToggle = true
    //   } else {
    //     console.log("获取数据失败")
    //   }
    // }

  }
}
</script>

<style lang="less">
@import '../../less/variable';
@import '../../less/base';
@import '../../less/icon';
@import '../../less/util';
.main{
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
}

.shelf-main{
  padding-top: 30/@rem;
}
.book-table{
  margin: 40/@rem 0 0 62/@rem ;
  width: 170/@rem;
  float: left;
  .book-cover{
    margin-bottom: 20/@rem;
    img{
      width: 180/@rem;
      height: 240/@rem;
      display: block;
      border-radius: 5/@rem;
    }
  }

  &:nth-child(3n-2){
    margin-left: 50/@rem;
  }
  .book-name{
    height: 66/@rem;
    .fontSize(24);
    color: @color-strong;
    line-height: 33/@rem;
    font-weight: bold;
  }
}
.no-book{
  .book-container{
    img{
      width: 310/@rem;
      height: 310/@rem;
      display: block;
      margin: 100/@rem auto 50/@rem;
    }
  }
  .book-word{
    text-align: center;
    .fontSize(32);
    color: #888;
  }
}
.already-alert {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  .alert-bg {
    position: fixed;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }
  .alert-top {
    padding: 26/@rem 35/@rem;
    background: #f5f5f8;
    position: absolute;
    left: 0;
    bottom: 88/@rem;
    z-index: 9999;
    .book-box{
      width: 680/@rem;
    }
    h3 {
      .text(34, 40);
      text-align: center;
      margin-bottom: 60/@rem;
      font-weight: normal;
    }
    .item {
      .size(140, 64);
      .text(40, 64);
      text-align: center;
      color: #444;
      background: #FFE555;
      border-radius: 10/@rem;
      margin-right: 40/@rem;
      margin-bottom: 30/@rem;
      float: left;
    }
    .none {
      background: #E6E6E6;
      color: #bababa;
    }
    .item:nth-child(4n) {
      margin-right: 0;
    }
  }

  .alert-btn {
    .text(30, 88);
    position: absolute;
    z-index: 9999;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    color: #888;
    background: #fff;
  }
}

</style>

