<template>
  <div class="cart-main" ref="cartMain">
    <div class="page-list" v-show="!noData">
      <div class="item" v-for="(item,index) in cartList" :key="index" @click="routeToCourse(item)" :monitor-log="getMonitor()">
        <div class="item-img" v-show="item.lateralCover" :style="{backgroundImage: `url(${item.lateralCover})`}"></div>
        <div class="item-img-small" v-show="!item.lateralCover&&item.verticalCover" :style="{backgroundImage: `url(${item.verticalCover})`}"></div>
        <div class="item-img" v-show="!item.lateralCover&&!item.verticalCover" :style="{backgroundImage: `url('https://yun.dui88.com/yoofans/images/201804/miniapp/details-page-top.png')`}"></div>
        <span class="item-title">{{item.title}}</span>
        <span class="item-sub" v-if="item.subTitle">{{item.subTitle}}</span>
        <span class="item-new" v-if="item.latestSubTitle">最新：{{item.latestSubTitle}}</span>
        <span class="item-now" v-if="item.currentReadTitle">在读：{{item.currentReadTitle}}</span>
        <span class="item-status" v-if="item.itemType==1">
          <span v-if="item.playbackProgress&&item.timeLength">{{item.playbackProgress == item.timeLength ? '已听完' : '已听'}}</span>
          <span class="red mr20">{{item.playbackProgress && item.timeLength ? (item.percent + '%') : '未收听'}}</span>{{item.timeLengthText}}
        </span>
        <a href="javascript:void(0)" class="item-btn" @click.stop="playClick(item.columnId, item.courseId, false)">
          <i class="iconfont icon-bofang2"></i>播放</a>
      </div>
    </div>
    <div class="page-none" v-show="noData">
      <img src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/zanwushuju.png" class="none-img" />
      <p class="none-text">暂无数据</p>
      <a href="javascript:void(0)" class="none-btn" @click="goHome">去逛逛</a>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0" ></div>
  </div>
</template>

<script>
  import order from '../api/order';
  import router from '../mixins/router';
  import access from '../mixins/accessHandler';
  
  export default {
    data() {
      return {
        cartList: [],
        noData: false,
        pageNum: 1,
        pageSize: 20,
        busy: true
      };
    },
    watch: {
      data: {}
    },
    async mounted() {
      await this.getList();
      this.setTitle('已购');
    },
    computed: {},
    methods: {
      // 获取详情
      async getList() {
        let params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        let obj = await order.getCartList(params)
        if (obj && obj.length) {
          this.busy = false;
          obj.forEach(item => {
            item['timeLengthText'] = this.secondToDate(item.timeLength);
            let percent = Math.floor((+item.playbackProgress ? +item.playbackProgress : 0) / +item.timeLength * 100);
            item['percent'] = percent > 100 ? 100 : percent;
            item.checkPower = true;
          });
          if (!this.cartList.length) {
            this.cartList = obj;
          } else {
            this.cartList = this.cartList.concat(obj);
            console.log(this.cartList)
          };
        } else {
          this.busy = true
        };
        if (!this.cartList.length) this.noData = true;
      },
      loadMore () {
        this.busy = true;
        this.pageNum ++;
        this.getList();
      },
      secondToDate(result) {
        if (result == null || result == undefined) return ''
        let m = Math.floor((result / 60 % 60));
        let s = Math.floor((result % 60));
        return result = m + "分" + s + "秒";
      },
      getMonitor () {
        return JSON.stringify({'dcm': 'cart','dpm': '1.1.1','url': '1111'});
      },
      goHome () {
        this.$router.push('index/home')
      },
      // 触发滚动
      dispatchScroll () {
        this.mainScrollTop = this.$refs.cartMain.scrollTop;
        // console.log(this.$refs.homeMain.scrollTop)
        window.monitor && window.monitor.showLog(this);
      }
    },
    components: {
    },
    mixins: [router, access]
  };

</script>

<style lang="less" scoped>
  @import "../assets/style/base/util";
  @rem: 75rem;
  .cart-main{
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
  .page-list {
    padding: 0 30/@rem;
    padding-bottom: 100/@rem;
    .item {
      border-bottom: 1/@rem solid #D8D8D8;
      position: relative;
      height: 216/@rem;
      .item-img {
        .size(214, 156);
        .pos(0, 30);
        background-size: 100% auto;
        background-repeat: no-repeat;
        border-radius: 5rpx;
        overflow: hidden;
      }
      .item-img-small {
        .pos(42, 30);
        .size(116, 156);
      }

      .item-title {
        .pos(235, 34);
        .text(26, 37);
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 450/@rem;
        font-weight: bold;
      }
      .item-sub {
        .pos(235, 77);
        .text(24, 33);
        color: #787878;
      }
      .item-new {
        .pos(235, 90);
        .text(24, 33);
        color: #787878;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 336/@rem;
      }
      .item-now {
        .pos(235, 126);
        .text(24, 33);
        color: #787878;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 336/@rem;
      }
      .item-status {
        .pos(235, 151);
        .text(22, 30);
        color: #999;
      }
      .red {
        color: #FF464A;
      }
      .item-btn {
        .size(100, 40);
        .text(28, 40);
        text-align: center;
        border-radius: 45/@rem;
        color: #FF464A;
        border: 2px solid #FF464A;
        position: absolute;
        right: 0;
        bottom: 35/@rem;
      }
      .iconfont{
          font-size: 28/@rem;
        }
    }
  }

  .page-none {
    .none-img {
      .pos(248, 147);
      .size(258, 283);
    }
    .none-text {
      .text(32, 45);
      .pos(0, 483);
      text-align: center;
      width: 100%;
      color: #787878;
    }
    .none-btn {
      .size(200, 58);
      .pos(275, 611);
      .text(30, 58);
      color: #ff464a;
      border: 2/@rem solid #ff464a;
      text-align: center;
      border-radius: 45/@rem;
    }
  }

</style>

