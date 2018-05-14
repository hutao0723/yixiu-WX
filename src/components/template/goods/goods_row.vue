<template>
  <div class="row goods-row-box" @click="routeToCourse(goods)">
    <div class="por" >
      <img class="goods-image"  :mode="goods.fillType" lazy-load :src="goods.lateralCover || goods.verticalCover || 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-column-cover.png'" />
    </div>
    <div class="main-box column">
      <!--左边栏-->
      <div class="title-bar row-between">
        <div class="left-bar">
          <span class="nm strong line1 bold">{{goods.title}}</span>
          <span class="xs muted line1">{{goods.subTitle}}</span>
        </div>
        <!--右边栏-->
        <div class="right-bar column-around">
          <span class="nm warm" v-if="goods.price && !goods.checkPower">{{'¥ ' + goods.price}}</span>
          <span class="sm warm line1" v-if="goods.price && goods.checkPower">已购买</span>
          <span class="sm warm line1" v-if="!goods.price">免费</span>
          <span class="xxs weak line1 mb20">{{goods.itemType == 2 ? '共' + goods.courseNum + '节' : ''}}</span>
        </div>
      </div>
      <div class="bottom-bar row-between">
        <span class="xs muted line1" v-if="!goods.price">{{goods.playTimes + '人已听'}}</span>
        <span class="xs muted line1" v-else>{{goods.buyTimes + '人已购'}}</span>
        <button type="primary" plain hover-class="none" class="btn-icon" @click.stop="routeByIconAction(goods)" v-if="goods.price && goods.checkPower">
          <i class="iconfont icon-bofang2"></i>{{goods.fetchText}}
        </button>
        <button type="primary" plain hover-class="none" class="btn-icon" @click.stop="routeByIconAction(goods)" v-if="!goods.price">
          <i class="iconfont icon-bofang2"></i>{{goods.fetchText}}
        </button>
        <button type="primary" plain hover-class="none" class="btn-fetch" @click.stop="routeByIconAction(goods)" v-if="goods.price && !goods.checkPower">{{goods.fetchText}}</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import router from '../../../mixins/router';

  export default {
    props: {
      index: {
        type: Number,
        default: '',
        twoWay: true
      },
      goods: {
        type: Object,
        default: ''
      }
    },
    methods: {
      imgRrr() {
        console.log(this.goods)
      }
    },
    mixins: [router]
  }
</script>

<style lang="less">
  @import "../../../less/variable";
  .goods-row-box{
    background-color: white;
    border-bottom: @border;
    align-items: center;
    padding: 32/@rem 0 30/@rem 0;
    .bold{
      font-weight: bold;
    }
    .por{
      position: relative;
      height: 164/@rem;
      overflow: hidden;
      border-radius: 10/@rem;
      .poa{
       position: absolute;
      }
      .high{
        width:70/@rem;
        height: 32/@rem; 
        line-height: 32/@rem;
        background:rgba(255,0,0,0.66);
        box-shadow: 0 1/@rem 4/@rem 0 rgba(0,0,0,0.5);
        border-radius: 0 5/@rem 5/@rem 0 ; 
        left:0;
        text-align:center;
        top:7/@rem;
        color:rgba(255,255,255,1);
        font-size:16/@rem;
      }
    }
    .goods-image {
      height: 164/@rem;
      width: 225/@rem;
    }
    .main-box{
      height: 162/@rem;
      margin-left: 24/@rem;
      .title-bar{
        width: 100%;
        height: 115/@rem;
      }
      .left-bar{
        width: 328/@rem;
        height: 100%;
      }
      .right-bar{
        width: 120/@rem;
        height: 100%;
        align-items: flex-end;
        span, .btn-fetch{
          display: block;
          width:100%;
          height:42/@rem; 
          line-height: 42/@rem;
          text-align: right;
        }
      }
      .bottom-bar{
        width: 100%;
        height: 45/@rem;
        span{
          display: block;
          width:300/@rem;
          height:45/@rem; 
          line-height: 55/@rem;
          text-align: left;
        }
       .btn-fetch{
          display: block;
          width:110/@rem;
          height:45/@rem; 
          line-height: 45/@rem;
          text-align: center;
          border: 0;
          border-color: transparent;
          background:linear-gradient(90deg,rgba(255,62,68,1),rgba(255,99,77,1));
          border-radius: 45/@rem; 
          font-size: @text-nm;
        }
      }
      .btn-icon{
        display: block;
        width:110/@rem;
        height:45/@rem; 
        color:rgba(255,70,74,1);
        line-height: 40/@rem;
        text-align: center;
        background:white;
        border-radius: 45/@rem;
        border: 1/@rem solid #ff464a;
        font-size: @text-nm;
        .iconfont{
          font-size: @text-nm;
        }
      }
    }
  }
</style>
