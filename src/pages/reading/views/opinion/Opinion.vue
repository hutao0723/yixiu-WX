<template>
  <div class="opinion-main" ref="optionMain">
    <bnav :dpm-b="823" :dcm-a="8002"></bnav>
    <div class="home-review">
      <div class="item" v-for="(item,index) in reviewList" :key="index">
        <img :src="item.userImgUrl" alt="" class="item-header">
        <div class="item-name">{{item.userNickname}}</div>
        <div class="item-periods">{{item.readName}}第{{item.readStageNum}}期学员</div>
        <div class="item-content" ref="cheight" :id="'content' + index" :class="{show:item.show == 1}">{{item.content}}</div>
        <div v-show="item.show == 1" @click="unfoldToggle(2,index)" class="item-toggle">展开</div>
        <div v-show="item.show == 2" @click="unfoldToggle(1,index)" class="item-toggle">收起</div>
        <div class="item-book">
          <div class="book-bg">
            <img class="book-img" :src="item.courseVerticalCover" alt="" v-if="item.courseVerticalCover">
            <img class="book-img" src="http://yun.dui88.com/youfen/images/read_course_none.png" alt="" v-if="!item.courseVerticalCover">
          </div>
          <div class="book-name otw">《{{item.courseTitle}}》</div>
          <div class="book-author otw" v-if="item.courseAuthor">{{item.courseAuthor}} 著</div>
        </div>
        <div class="item-bottom">
          <p @click="clickFun($event,setCommentPraise,{item:item,index:index})" :monitor-log="getMonitor('8002.' + item.courseId + '.0.0', '823.3.2-'+index)">
            <span class="fr" v-show="item.praiseCount>0">{{item.praiseCount}}</span>
            <i class="iconfont icon-dianzan fr" v-show="!item.userPraise"></i>
            <i class="iconfont icon-heart fr" :style="{color:'red'}" v-show="item.userPraise"></i>
          </p>
          <i class="iconfont icon-share fr" :monitor-log="getMonitor('8002.'+ item.courseId +'.0.0', '820.3.1-'+index)" @click="clickFun($event,shareFun,item)"></i>
          <span class="fl">{{item.releaseTime | timeTransition}}</span>
        </div>
      </div>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="100"></div>
    <AudioBar :monitorlog="getMonitor('0.0.0.0', '823.1.0')" />
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import AudioBar from '../../components/basic/Audio_Bar';
  import bnav from '../../components/basic/Nav';

  const testUrl = window.location.hostname == 'localhost' ? '/api' : '';
  const API = {
    commentPage: testUrl + '/comment/page',
    commentPraise: testUrl + '/comment/praise',
    userState: testUrl + '/user/read/state',
  };

  export default {
    components: {},
    data() {
      return {
        reviewList: [],
        pageNum: 1,
        pageSize: 20,
        busy: true,
        userId: '',
        lastData: '',
      };
    },
    components: {
      AudioBar,
      bnav
    },
    computed: {
      ...mapState({})
    },
    filters: {
      // 时长
      timeTransition: function (value) {
        let nowDate = new Date()
        let nowDateNum = nowDate.getTime()
        // 获取现在的时间戳

        value = value.replace(new RegExp(/-/gm), "/");
        let valueDate = new Date(value)
        let valueDateNum = valueDate.getTime()

        // 获取当时的时间戳
        let key = parseInt(nowDateNum) - parseInt(valueDateNum)
        let keya = parseInt(nowDateNum - valueDateNum)



        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        let yesterday = new Date(today);
        let yesterdayNum = yesterday.getTime()
        let yest = parseInt(valueDateNum) - parseInt(yesterdayNum);

        let text = '';

        if (key > 0 && key < 60 * 1000) {
          text = '刚刚'
        }

        if (key >= 60 * 1000 && key < 60 * 60 * 1000) {
          text = Math.floor(key / (60 * 1000)) + '分钟前'
        }

        if (key >= 60 * 60 * 1000 && key < 2 * 60 * 60 * 1000) {
          text = '1小时前'
        }

        if (key >= 2 * 60 * 60 * 1000 && key < yest) {
          text = (valueDate.getHours() < 10 ? '0' + valueDate.getHours() : valueDate.getHours()) + ':' + (valueDate.getMinutes() <
            10 ? '0' + valueDate.getMinutes() : valueDate.getMinutes())
        }

        if (key >= yest) {
          text = (valueDate.getMonth() + 1) + '月' + (valueDate.getDate()) + '日'
        }

        return text
      },
    },
    created() {},
    async mounted() {
      let self = this;
      this.getCommentTop();
      let userState = await this.getUsetState();
      this.userId = userState.data.userId;
      self.$nextTick(function () {
        setTimeout(() => {
          // 滚动
          self.$refs.optionMain.addEventListener('scroll', self.dispatchScroll, false);
          // 埋点
          window.monitor && window.monitor.showLog(self);
        }, 100)
      })
    },
    methods: {
      shareFun(item){

        if(item.posterType == "H5"){
           if(this.userId == item.userId){
                this.$router.push({name:'share',query:{commentId:item.id,lastClock:0,isClock:1}})

            }else{
                this.$router.push({name:'share',query:{commentId:item.id,lastClock:0,isClock:0}})

            }
        }else{
          if(this.userId == item.userId){
            this.$router.push({name:'poster',query:{commentId:item.id,lastClock:0,isClock:1}})

          }else{
            this.$router.push({name:'poster',query:{commentId:item.id,lastClock:0,isClock:0}})

          }
        }
      },
      // 获取monitor
      getMonitor(dcm, dpm) {
        // item tabindex dpmc
        return JSON.stringify({
          'dcm': dcm,
          'dpm': '157.' + dpm,
        });
      },
      // 触发滚动
      dispatchScroll() {
        window.monitor && window.monitor.showLog(this);
      },
      // 获取用户信息
      async getUsetState() {
        let self = this;
        let params = {};
        const url = API.userState;
        const res = await this.$http.get(url, {
          params
        });

        return res.data;
      },
      // 展开收起
      unfoldToggle(n, index) {
        let self = this;
        this.reviewList[index].show = n
        this.$set(self.reviewList, index, self.reviewList[index])
      },

      loadMore() {
        console.log(11)
        this.busy = true;
        this.pageNum++;
        this.getCommentTop()
      },
      // 获取详情
      getCommentTop(cb) {
        let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          last: this.lastData,
        }
        this.$http.get(API.commentPage, {
          params
        }).then((res) => {
          let obj = res.data.data.content;
          this.lastData = res.data.data.last;

          if (obj && obj.length) {
            if (cb) {
              this.reviewList = obj;
            } else {
              this.busy = false;
              if (!this.reviewList.length) {
                this.reviewList = obj;
              } else {
                this.reviewList = this.reviewList.concat(obj);
              };
            }
            function countLines(ele) {
              var styles = window.getComputedStyle(ele, null);
              var lh = parseInt(styles.lineHeight, 10);
              var h = parseInt(styles.height, 10);
              var lc = Math.round(h / lh);
              console.log('line count:', lc, 'line-height:', lh, 'height:', h);
              return lc;
            }
            this.$mount()
            this.reviewList.forEach((item, index) => {
              let dom = document.getElementById('content' + index)
              if (countLines(dom) > 3) {
                item['show'] = 1
              }
            })
          } else {
            this.busy = true
          };
        })
      },
      setCommentPraise(obj) {
        let self = this;
        let params = {};
        params = {
          status: obj.item.userPraise ? 0 : 1,
          commentId: obj.item.id
        }
        const url = API.commentPraise;
        this.$http.get(url, {
          params
        }).then((res) => {
          let item = this.reviewList[obj.index]
          item.userPraise =! item.userPraise
          item.praiseCount = item.userPraise?item.praiseCount+1:item.praiseCount-1
          this.$set(this.reviewList,obj.index,item)
        });
      },
    }
  };
</script>

<style lang="less">
  @import '../../less/variable';
  @import '../../less/util';

  .opinion-main {
    width: 750/@rem;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 20/@rem;
    background: #fff;
    font-size: 24/@rem;
    z-index: 100;
    .icon-nav {
      height: 480/@rem;
      border: 1px solid #ccc;
    }
    .home-review {
      background: #fff;
      /* padding-bottom: 240/@rem; */
      h2 {
        .text(40,
        56);
        padding-top: 45/@rem;
        color: #333;
        text-align: center;
      }
      h3 {
        .text(32,
        120);
        color: #888;
        text-align: center;
        font-weight: normal;
        .iconfont {
          .text(24,
          120);
          margin-left: 20/@rem;
          color: #888;

        }
      }
      .item {
        position: relative;
        /* height: 560/@rem; */
        padding: 36/@rem 36/@rem 30/@rem 118/@rem;
        .item-header {
          .size(64,
          64);
          .pos(30,
          40);
          border-radius: 50%;
          overflow: hidden;
          background: #000;
        }
        .item-name {
          /* .pos(118, 36); */
          .text(30,
          42);
          color: #333;
          font-weight: bold;
        }
        .item-periods {
          /* .pos(118, 82); */
          .text(24,
          33);
          color: #666;
          margin-top: 4/@rem;
          margin-bottom: 26/@rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap
        }
        .item-content {
          /* .pos(118, 130); */
          max-height: 9999px;
          font-size: 32/@rem;
          line-height: 42/@rem;
          color: #333;
          word-wrap: break-word;
        }
        .item-content.show {
          height: 126/@rem;
          overflow: hidden;
        }
        .item-toggle {
          max-height: 9999px;
          font-size: 28/@rem;
          line-height: 42/@rem;
          color: #4A669D;
          margin-top: 9/@rem;
        }
        .item-book {
          .size(580,
          148);
          /* .pos(118, 318); */
          position: relative;
          background: #eee;
          border-radius: 4/@rem;
          margin-top: 36/@rem;
          .book-bg {}
          .book-img {
            .pos(22,
            15);
            .size(80,
            108);
            border: 5/@rem solid #fff;
          }
          .book-name {
            .pos(0,
            25);
            .text(28,
            42);
            color: #555;
            width: 100%;
            padding-left: 121/@rem;
            padding-right: 10/@rem;
            box-sizing: border-box;
          }

          .book-author {
            .pos(0,
            75);
            .text(26,
            37);
            color: #666;
            width: 100%;
            padding-left: 134/@rem;
            padding-right: 10/@rem;
            box-sizing: border-box;
          }
        }
        .item-bottom {
          width: 580/@rem;
          .text(26, 37);
          margin-top: 25/@rem;
          color: #949494;
          box-sizing: border-box;
          vertical-align: middle;
          .iconfont {
            display: block;
            height: 37/@rem;
            width: 37/@rem;
            line-height: 37/@rem;
            font-size: 28/@rem;
            margin-right: 8/@rem;
            text-align: center;
          }
          .icon-share {
            margin-right: 54/@rem;
            color: #949494;
          }
          span {
            .text(26, 37);
          }
        }
      }
      .item:after {
        content: '';
        height: 1/@rem;
        background: #eee;
        margin-left: 118/@rem;
        margin-right: 36/@rem;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 580/@rem;
        box-sizing: border-box;
      }

    }
  }
</style>
