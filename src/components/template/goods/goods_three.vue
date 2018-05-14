<template>
  <div class="column goods-grid-three-box" @click="routeToCourse(goods)">
    <div class="icon-fetch column-center" v-if="!goods.price || goods.checkPower || goods.watchable" @click.stop="routeByIconAction(goods)">
      <i class="iconfont icon-bofang"></i>
    </div>
    <!--图片-->
    <div class="goods-container">
      <img class="goods-image" :src="goods.verticalCover || goods.lateralCover || 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-book-cover.png'"/>
    </div>
    <div class="main-box column-around pt20">
      <span class="sm strong line2 h74 bold">{{goods.title}}</span>
      <span class="nm warm line1" v-if="goods.price && !goods.checkPower">{{'¥ ' + goods.price}}</span>
      <span class="sm warm line1" v-if="goods.price && goods.checkPower">已购买</span>
      <span class="sm warm line1" v-if="!goods.price">免费</span>
    </div>
  </div>
</template>

<script>
  import router from '../../../mixins/router';
  export default {
    props: {
      goods: {}
    },
    methods: {},
    mixins: [router]
  }
</script>

<style lang="less">
  @import "../../../less/variable";
  .goods-grid-three-box{
    @size: 198/@rem;
    position: relative;
    background-color: white;
    width: @size;
    padding-top: 34/@rem;

    .icon-fetch{
      width: 60/@rem;
      height: 60/@rem;
      position: absolute;
      background: white;
      border-radius: 50%;
      top: 228/@rem;
      left: 126/@rem;
      .iconfont{
        color: #FF464A;
        font-size: @text-sm;
      };
    }
    .goods-container{
      width: 100%;
      height: 266/@rem;
      overflow: hidden;
      border-radius: 10/@rem;
    }
    .goods-image{
      width: 100%;
      height: 266/@rem;
    }
    .main-box{
      width: 100%;
      height: 138/@rem;
      &.pt20{
        padding-top: 20/@rem;
        box-sizing: border-box;
      }
      .h74{
        height:74/@rem;
      }
      .left-bar{
        width: 130/@rem;
        height: 80/@rem;
      }
      .bold{
        font-weight: bold;
      }
      .right-bar{
        width: 130/@rem;
        height: 80/@rem;
      }
    }
  }
</style>
