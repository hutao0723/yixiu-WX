<template>
  <div class="swiper-bar">
    <Swipe class="index_banner my-swipe" :auto="5000" v-if="param.tabs.length" :showIndicators="param.tabs && param.tabs.length > 1">
      <Swipe-item v-for="(item, index) in param.tabs" class="slide" :class="'slide' + index">
        <a href="javascript:;" @click="routeByBlockAction(item)">
          <img v-lazy="item.pictureUrl || 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/front-page-swiper.png'" >
        </a>
      </Swipe-item>
    </Swipe>
  </div>
</template>
<script>
  import router from '../../mixins/router';
  import { Swipe, SwipeItem } from '../swipe';
  export default {
    components: {
      Swipe,
      SwipeItem
    },
    props: {
      param: Object
    },
    methods: {
    },
    mixins: [router]
  };
</script>
<style lang="less">
@import url('../../assets/style/base/tool.less');
  .swiper-bar{
    height: 280/@rem;
    border-radius:10/@rem;
  }
</style>
