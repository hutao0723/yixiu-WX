<template>
  <div class="opinion-main">
    <div class="home-review">
      <div class="item" v-for="(item,index) in reviewList" :key="index">
        <img :src="item.userImgUrl" alt="" class="item-header">
        <div class="item-name">{{item.userNickname}}</div>
        <div class="item-periods">{{item.readName}}第{{item.readStageNum}}学员</div>
        <div class="item-content">{{item.readName}}</div>
        <div class="item-book">
          <div class="book-bg">
            <img class="book-img" :src="item.courseUrl" alt="">
          </div>

          <div class="book-name otw">{{item.courseTitle}}</div>
          <div class="book-author otw">{{item.courseAuthor}} 著</div>
        </div>
        <div class="item-bottom">
          <span @click="getCommentPraise(item)">
            <i class="iconfont icon-heart fr" :style="{color:item.userPraise?'red':'#000'}"></i>
            <span class="fr">{{item.praiseCount}}</span>
          </span>
          <!-- <router-link :to="{ path: '/poster/' + item.id}" tag="a" class="iconfont icon-share fr"></router-link> -->
          <span>{{item.releaseTime| timeTransition}}</span>
        </div>
      </div>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="0"></div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  export default {
    components: {},
    data() {
      return {
        reviewList: [],
        pageNum: 1,
        pageSize: 20,

        busy: true
      };
    },
    computed: {
      ...mapState({})
    },
    filters: {
      // 时长
      timeTransition: function (value) {
        let nowDate = new Date()
        let nowDateNum = nowDate.getTime()
        let valueDate = new Date(value)
        let valueDateNum = valueDate.getTime()
        let key = nowDateNum - valueDateNum

        let today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);

        let yesterday = new Date(today);
        let yesterdayNum = yesterday.getTime()
        let yes = valueDateNum - yesterdayNum;

        let Y, M, D, h, m, s;
        Y = valueDate.getFullYear() + '-';
        M = (valueDate.getMonth() + 1 < 10 ? '0' + (valueDate.getMonth() + 1) : valueDate.getMonth() + 1) + '-';
        D = (valueDate.getDate() < 10 ? '0' + valueDate.getDate() : valueDate.getDate()) + ' ';
        h = (valueDate.getHours() < 10 ? '0' + valueDate.getHours() : valueDate.getHours()) + ':';
        m = (valueDate.getMinutes() < 10 ? '0' + valueDate.getMinutes() : valueDate.getMinutes());
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

        if (key >= 2 * 60 * 60 * 1000 && key < yes) {
          text = h + m
        }

        if (key >= yes) {
          text = M + D
        }
        return text
      },
    },
    created() {},
    mounted() {
      this.getCommentTop();
    },
    methods: {
      loadMore() {
        this.busy = true;
        this.pageNum++;
        this.getCommentTop()
      },
      getCommentTop() {
        let self = this;
        let params = {};
        params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,

        }
        const url = `/api/comment/page`;
        this.$http.get(url, {
          params
        }).then((res) => {
          if (res.data.data.content && res.data.data.content.length > 0) {
            this.busy = false;
            if (!this.reviewList) {
                this.reviewList = res.data.data.content;
              } else {
                this.reviewList = this.reviewList.concat(res.data.data.content);
              };
          } else {
            this.busy = true;
          }

        });
      },
      getCommentPraise(item) {
        let self = this;
        let params = {};
        params = {
          status: item.userPraise ? 0 : 1,
          commentId: item.id
        }
        const url = `/api/comment/praise`;
        this.$http.get(url, {
          params
        }).then((res) => {
          item.userPraise = item.userPraise? 0:1
          item.praiseCount = !item.userPraise?item.praiseCount-1:item.praiseCount+1
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
    padding-top: 20/@rem; // z-index: 9;
    background: #fff;
    font-size: 24/@rem;
    .icon-nav {
      height: 480/@rem;
      border: 1px solid #ccc;
    }
    .home-review {
      padding-bottom: 120/@rem;
      h2 {
        .text(40, 120);
        color: #333;
        text-align: center;
      }
      .item {
        position: relative;
        /* height: 560/@rem; */
        padding: 36/@rem 36/@rem 30/@rem 118/@rem;
        .item-header {
          .size(64, 64);
          .pos(30, 40);
          border-radius: 50%;
          overflow: hidden;
          background: #000;
        }
        .item-name {
          /* .pos(118, 36); */
          .text(30, 42);
          color: #333;
        }
        .item-periods {
          /* .pos(118, 82); */
          .text(24, 33);
          color: #666;
          margin-top: 4/@rem;
          margin-bottom: 14/@rem;
        }
        .item-content {
          /* .pos(118, 130); */
          font-size: 30/@rem;
          line-height: 42/@rem;
          color: #666;
        }
        .item-book {
          .size(596, 148);
          /* .pos(118, 318); */
          position: relative;
          background: #eee;
          border-radius: 4/@rem;
          margin-top: 20/@rem;
          margin-bottom: 35/@rem;
          .book-bg {}
          .book-img {
            .pos(30, 13);
            .size(80, 112);
            border: 5/@rem solid #fff;
          }
          .book-name {
            .pos(0, 25);
            .text(30, 42);
            color: #555;
            width: 100%;
            padding-left: 134/@rem;
            padding-right: 10/@rem;
            box-sizing: border-box;

          }
          .book-author {
            .pos(0, 75);
            .text(26, 37);
            color: #666;
            width: 100%;
            padding-left: 134/@rem;
            padding-right: 10/@rem;
            box-sizing: border-box;
          }
        }
        .item-bottom {
          .size(22, 30);
          /* position: absolute; */
          /* bottom: 30/@rem; */
          /* left: 0; */
          width: 100%;
          box-sizing: border-box;
          .iconfont {
            line-height: 30/@rem;
            font-size: 24/@rem;
            padding: 0 10/@rem
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
        width: 596/@rem;
        box-sizing: border-box;
      }

    }
  }

</style>

