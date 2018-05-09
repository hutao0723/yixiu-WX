<template>
  <div class="cart-page">
    <div class="page-list">
      <div class="item" v-for="(item,index) in cartList" :key="index">
        <div class="item-img" v-show="item.lateralCover" :style="{backgroundImage: `url(${item.lateralCover})`}"></div>
        <div class="item-img-small" v-show="!item.lateralCover&&item.verticalCover" :style="{backgroundImage: `url(${item.verticalCover})`}"></div>
        <div class="item-img" v-show="!item.lateralCover&&!item.verticalCover" :style="{backgroundImage: `url('//yun.dui88.com/yoofans/images/201804/miniapp/details-page-top.png')`}"></div>
        <span class="item-title">{{item.title}}</span>
        <span class="item-sub" v-if="item.subTitle">{{item.subTitle}}</span>
        <span class="item-new" v-if="item.latestSubTitle">最新：{{item.latestSubTitle}}</span>
        <span class="item-now" v-if="item.currentReadTitle">在读：{{item.currentReadTitle}}</span>
        <span class="item-status" v-if="item.itemType==1">
          <span v-if="item.playbackProgress&&item.timeLength">{{item.playbackProgress == item.timeLength ? '已听完' : '已听'}}</span>
          <span class="red mr20">{{item.playbackProgress && item.timeLength ? (item.percent + '%') : '未收听'}}</span>{{item.timeLengthText}}
        </span>
        <a href="javascript:void(0)" class="item-btn">
          <i class="iconfont icon-play"></i>播放</a>
      </div>
    </div>
    <div class="page-none" v-if="cartList.length == 0">
      <img src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/zanwushuju.png" class="none-img" />
      <p class="none-text">暂无数据</p>
      <a href="javascript:void(0)" class="none-btn">去逛逛</a>
    </div>
  </div>
</template>

<script>
  import httpServer from '../../../api/api';
  export default {
    data() {
      return {
        cartList: [
          {
            "title": "篮球课程上线",
            // "subTitle": "这是关于学习篮球技巧的课程",
            "itemType": 0,
            "courseId": 80,
            "latestSubTitle": '最新再度最新再度最新再度最新再度最新再度',
            "currentReadTitle": '最新再度最新再度最新再度最新再度最新再度',
            "playbackProgress": 21,
            "timeLength": 100,
            "verticalCover": "https://yun.dui88.com/youfen/images/z6qj8zsviw.jpg"
          },
          {
            "title": "篮球课程上线",
            "subTitle": "这是关于学习篮球技巧的课程",
            "itemType": 1,
            "courseId": 80,
            "playbackProgress": 21,
            "timeLength": 100,
            "lateralCover": "https://yun.dui88.com/youfen/images/z6qj8zsviw.jpg",
            "verticalCover": "https://yun.dui88.com/youfen/images/z6qj8zsviw.jpg"
          },
        ]
      };
    },
    watch: {
      data: {
      }
    },
    mounted() {
      let params = {
        // dbredirect: 'www.baidu.com'
      }
      let res = httpServer('get','/apis/user/getUserInfo',params)
      // location.href = 'k.youfen666dev.com/loginH5?dbredirect=https://www.baidu.com'
    },
    computed: {
    },
    methods: {

    }
  };
</script>

<style lang="less" scoped>
  @import "../../../assets/style/base/util";
  @rem: 75rem;
  .page-list {
    padding: 0 30/@rem;
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
        .text(24, 40);
        text-align: center;
        border-radius: 45/@rem;
        color: #FF464A;
        border: 2px solid #FF464A;
        position: absolute;
        right: 0;
        bottom: 35/@rem;
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