<template>
  <div class="swiper-bar">
    <Swipe class="index_banner my-swipe" :auto="5000" v-if="param.tabs.length">
      <Swipe-item v-for="(item, index) in param.tabs" class="slide" :class="'slide' + index">
        <a href="javascript:;" @click="routeByBlockAction(item)">
          <img :src="item.pictureUrl + '?x-oss-process=image/quality,Q_60' || 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/front-page-swiper.png'" >
        </a>
      </Swipe-item>
    </Swipe>
  </div>
</template>
<script>
  import router from '../../mixins/router';
  import { Swipe, SwipeItem } from 'components/swipe';
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
    width: 690/@rem;
    margin: 0 auto;
    border-radius:10/@rem;
    box-shadow:0 10/@rem 10/@rem 0 rgba(235,235,235,0.6);
  }
</style>
