<template>
  <div class="home-main" ref="homeMain">
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
    <div style="height: 2rem"></div>
  </div>
</template>

<script>
  import config from '../api/config';
  import SwiperBar from '../components/layout/swiper_bar';
  import TitleBar from '../components/layout/title_bar';
  import GoodsBox from '../components/layout/goods_box';
  import BlankBar from '../components/layout/blank_bar';
  import access from '../mixins/accessHandler';
  import {
    mapState
  } from 'vuex';
  export default {
    components: {
      TitleBar,
      SwiperBar,
      BlankBar,
      GoodsBox
    },
    data() {
      return {
        params: '',
        components: [],
        mainScrollTop: 0
      };
    },
    computed: {
      ...mapState({})
    },
    created() {},
    mounted() {
      this.renderTemplatePage();
    },
    methods: {
      /**
       * 渲染页面
       */
      async renderTemplatePage() {
        const layout = await config.layout();
        let page = [];
        let self = this;
        Promise.all(JSON.parse(layout.componentSections).map(function (item, i) {
          return new Promise(function (resolve, reject) {
            resolve(config.component(item.componentType, item.componentId))
          }).then(res => page[i] = res)
        })).then(function (data) {
          let processData = config.processPage(layout, page)
          self.params = processData.params;
          self.components = processData.components;
          self.components.forEach(item => {
            if (item.componentType == 'GOODSBOX') {
              item['navActive'] = 0;
            }
          })
          self.setTitle(self.params.navigation.pageTitle)
          console.log(processData.params)
          const msg = {
            title: processData.params.navigation.pageTitle || '一修读书', // 分享标题
            desc: processData.params.shareConfig.shareDescribe || '在这里发现更好的自己', // 分享描述
            link: 'http://k.youfen666.com/knowledge.html#/index/home', // 分享链接 默认以当前链接
            imgUrl: processData.params.shareConfig.sharePictureUrl?'https:' + processData.params.shareConfig.sharePictureUrl: 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/knowledge.jpg', // 分享图标
          }

          self.wxShare(msg)
        })
      },
      // 触发滚动
      dispatchScroll() {
        this.mainScrollTop = this.$refs.homeMain.scrollTop;
        // console.log(this.$refs.homeMain.scrollTop)
        window.monitor && window.monitor.showLog(this);
      }
    },
    beforeDestroy() {
      this.$refs.homeMain.removeEventListener('scroll', this.dispatchScroll, false);
    },
    mixins: [access]
  };

</script>

<style lang="less">
  @import '../less/tool.less';
  .home-main {
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
    .fontSize(24);
    .icon-nav {
      height: 480/@rem;
      border: 1px solid #ccc;
    }
  }

</style>

