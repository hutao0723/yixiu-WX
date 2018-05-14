<template>
  <div class="swiper-bar" v-if="banner && banner.length">
    <Swipe class="index_banner my-swipe" :auto="5000" v-if="banner.length">
      <Swipe-item v-for="(item, index) in banner" class="slide" :class="'slide' + index">
        <a :href="item.url || 'javascript:;'"
        @click="clickBanner({'item': item, 'index': index})">
          <img :src="item.imgUrl + '?x-oss-process=image/quality,Q_60'" >
        </a>
      </Swipe-item>
    </Swipe>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'components/swipe';
  export default {
    components: {
      Swipe,
      SwipeItem
    },
    data () {
      return {
        banner: [
          {
            imgUrl: '//yun.duiba.com.cn/maila/images/jx3ipguwlg.jpg',
            url: ''
          },
          {
            imgUrl: '//yun.duiba.com.cn/maila/images/jx3ipguwlg.jpg',
            url: ''
          }
        ]
      };
    },
    methods: {
      clickBanner () {
        // console.log(111);
      },
      getBannerData () {
        let self = this;
        this.$http.post('/banner/list', {}).then((res) => {
          if (res && res.data && res.data.success && res.data.list) {
            var list = res.data.list;
            if (list && list.length) {
            }
            self.banner = res.data.list;
          } else {
            // @TODO 商品数据为空
          }
        }, () => {
          // @TODO 网络错误
        });
      }
    }
  };
</script>
<style lang="less">
@import url('../../assets/style/base/tool.less');
  .swiper-bar{
    height: 280/@rem;
    border-radius:10/@rem;
  }
</style>
