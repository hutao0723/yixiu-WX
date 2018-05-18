<template>
  <div class="column-between goods-grid-two-box" @click="routeToCourse(goods)" :monitor-log="getMonitor()">
    <div class="icon-fetch">
      <span class="xxs white" v-if="!goods.price">{{goods.playTimes + '人已听'}}</span>
      <span class="xxs white" v-else>{{goods.buyTimes + '人已购'}}</span>
    </div>
    <!--图片-->
    <div class="goods-container">
      <img class="goods-image" v-lazy="goods.lateralCover || goods.verticalCover || 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-column-cover.png'" />
    </div>
    <div class="main-box column-between">
      <span class="sm primary line2 title">{{goods.title}}</span>
      <div class="bottom row-between">
        <span class="nm warm line1 w200"  v-if="goods.price && !goods.checkPower">{{'¥ ' + goods.price}}</span>
        <span class="sm warm line1 w200"  v-if="goods.price && goods.checkPower">已购买</span>
        <span class="sm warm line1 w200"  v-if="!goods.price">免费</span>
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
</template>

<script>
  import router from '../../../mixins/router';
  export default {
    props: {
      goods: Object
    },
    methods: {
      getMonitor () {
        return JSON.stringify({'dcm': 'goods_two','dpm': '1.1.1','url': '1111'});
      }
    },
    mixins: [router]
  }
</script>

<style lang="less">
  @import "../../../less/variable";
  .goods-grid-two-box{
    @size: 320/@rem;
    position: relative;
    background-color: white;
    width: @size;
    height: 364/@rem;
    padding-top: 34/@rem;
    .icon-fetch{
      width: 314/@rem;
      height: 45/@rem;
      position: absolute;
      background:linear-gradient(180deg,rgba(255,255,255,0),rgba(0,0,0,0.64));
      border-radius: 10/@rem;
      top: 213/@rem;
      left: 0;
      padding:0 0 4/@rem 6/@rem;
      line-height: 58/@rem;
      .iconfont{
        color: white;
        font-size: @text-xxs;
      };
    }
    .goods-container{
      width: 100%;
      height: 230/@rem;
      border-radius:10/@rem;
      overflow: hidden;
    }
    .goods-image{
      width: 100%;
      height: 230/@rem;
    }
    .main-box{
      width: 100%;
      margin-top: 16/@rem;
      .title{
        height: 76/@rem;
      }
      .w200{
        width: 200/@rem;
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
      .btn-icon{
        display: block;
        width:110/@rem;
        height:45/@rem; 
        line-height:40/@rem; 
        color:rgba(255,70,74,1);
        text-align: center;
        background:white;
        border-radius: 45/@rem; 
        font-size: @text-nm;
        border: 1/@rem solid #FF464A;
        .iconfont{
          font-size: @text-nm;
        }
      }
    }
  }
</style>
