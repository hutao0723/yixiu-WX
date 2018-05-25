<template>
  <div class="activity-main" ref="activityMain">
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
  import AudioBar from '../components/basic/Audio_Bar';
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
      AudioBar,
      TitleBar,
      SwiperBar,
      BlankBar,
      GoodsBox
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
    },
    computed: {
      ...mapState({})
    },
    async mounted() {
      this.renderTemplatePage();
    },
    methods: {
      /**
       * 渲染页面
       */
      async renderTemplatePage() {
        const layout = await config.layoutAc(this.$route.params.id);
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
          self.setTitle('一修读书')
          const msg = {
            title: processData.params.navigation.pageTitle || '一修读书', // 分享标题
            desc: processData.params.shareConfig.shareDescribe || '在这里发现更好的自己', // 分享描述
            link: 'http://k.youfen666dev.com/knowledge.html#/home/index?jumpType=activity&jumpId=' + self.$route.params.id,
            imgUrl: processData.params.shareConfig.sharePictureUrl?'https:' + processData.params.shareConfig.sharePictureUrl: 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/knowledge.jpg', // 分享图标
          }

          self.wxShare(msg)
        })
      },
      // 触发滚动
    dispatchScroll () {
      this.mainScrollTop = this.$refs.activityMain.scrollTop;
      // console.log(this.$refs.homeMain.scrollTop)
      window.monitor && window.monitor.showLog(this);
    }
    },
    mixins: [access]
  };

</script>

<style lang="less">
  @import '../less/tool.less';
  .activity-main {
    width: 750/@rem;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  // z-index: 9;
  background: #fff;
    .fontSize(24);
    .icon-nav {
      height: 480/@rem;
      border: 1px solid #ccc;
    }
  }

</style>

