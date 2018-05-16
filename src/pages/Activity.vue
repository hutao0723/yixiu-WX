<template>
  <div class="homepage-main">
    <div class="template-box" v-for="(item, index) in components">
      <!--顶部标题-->
      <TitleBar v-if="item.componentType === 'TITLE'" :param.sync="item" />

      <!--轮播图-->
      <SwiperBar v-if="item.componentType === 'SWIPER'" :param.sync="item" />

      <!--商品组-->
      <GoodsBox v-if="item.componentType === 'GOODSBOX'" :param.sync="item" />

      <!--留白-->
      <BlankBar v-if="item.componentType == 'BLANK'" :param.sync="item" />
    </div>
    <AudioBar/>
  </div>
</template>

<script>
  import config from '../api/config';
  import AudioBar from 'components/basic/Audio_Bar';
  import SwiperBar from 'components/layout/swiper_bar';
  import TitleBar from 'components/layout/title_bar';
  import GoodsBox from 'components/layout/goods_box';
  import BlankBar from 'components/layout/blank_bar';
  import loading from 'components/layout/Loading';
  import {
    mapState
  } from 'vuex';
  export default {
    components: {
      AudioBar,
      TitleBar,
      SwiperBar,
      BlankBar,
      GoodsBox,
      loading
    },
    data() {
      return {
        data: {},
        init: false,
        notice: false,
        animation: false,
        params: '',
        components: []
      };
    },
    created() {

      const msg = {
        title: '一修读书', // 分享标题
        desc: '在这里发现更好的自己', // 分享描述
        link: location.href, // 分享链接 默认以当前链接
        imgUrl: 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/knowledge.jpg', // 分享图标
      }
      this.wxShare(msg)
    },
    computed: {
      ...mapState({})
    },
    async mounted() {
      await this.renderTemplatePage();
    },
    methods: {
      /**
       * 渲染页面
       */
      async renderTemplatePage() {
        const layout = await config.layoutAc(this.$route.params.id);
        let page = [];
        let that = this;
        Promise.all(JSON.parse(layout.componentSections).map(function (item, i) {
          return new Promise(function (resolve, reject) {
            resolve(config.component(item.componentType, item.componentId))
          }).then(res => page[i] = res)
        })).then(function (data) {
          let processData = config.processPage(layout, page)
          that.params = processData.params;
          that.components = processData.components;
          that.components.forEach(item => {
            if (item.componentType == 'GOODSBOX') {
              item['navActive'] = 0;
            }
          })
          // that.loaded();
          console.log(that.components, `[template] render template page success`)
        })
      }
    }
  };

</script>

<style lang="less">
  @import '../less/tool.less';
  .homepage-main {
    padding-bottom: 135/@rem;
    .fontSize(24);
    .icon-nav {
      height: 480/@rem;
      border: 1px solid #ccc;
    }
  }

</style>

