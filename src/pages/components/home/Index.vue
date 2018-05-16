<template>
  <div class="homepage-main" ref="homepageMain">
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
import config from '../../../api/config';
import AudioBar from 'components/basic/Audio_Bar';
import SwiperBar from 'components/layout/swiper_bar';
import TitleBar from 'components/layout/title_bar';
import GoodsBox from 'components/layout/goods_box';
import BlankBar from 'components/layout/blank_bar';
import loading from 'components/layout/Loading';
import { mapState } from 'vuex';
export default {
  components: {
    AudioBar,
    TitleBar,
    SwiperBar,
    BlankBar,
    GoodsBox,
    loading
  },
  data () {
    return {
      params:'',
      components: [],
      mainScrollTop: 0
    };
  },
  computed: {
    ...mapState({})
  },
  async mounted () {
    await this.renderTemplatePage();
  },
  methods: {
     /**
     * 渲染页面
     */
    async renderTemplatePage() {
      const layout = await config.layout();
      let page = [];
      let self = this;
      Promise.all(JSON.parse(layout.componentSections).map(function(item, i){
        return new Promise(function(resolve, reject){
           resolve(config.component(item.componentType, item.componentId))
        }).then(res => page[i] = res )
      })).then(function(data){
        let processData = config.processPage(layout, page)
        self.params = processData.params;
        self.components = processData.components;
        self.components.forEach(item=>{
          if(item.componentType == 'GOODSBOX'){
            item['navActive'] = 0;
          }
        })
        // self.loaded();
        console.log(self.components,`[template] render template page success`)
        // 同步事件
      setTimeout(() => {
        // 滚动
        self.$refs.homepageMain.addEventListener('scroll', self.dispatchScroll, false);
        // 埋点
        window.monitor && window.monitor.showLog(self);
      }, 100);
      })
    },
    // 触发滚动
    dispatchScroll () {
      this.mainScrollTop = this.$refs.homepageMain.scrollTop;
      console.log(this.$refs.homepageMain.scrollTop)
      window.monitor && window.monitor.showLog(this);
    },
  },
  beforeDestroy () {
    this.$refs.homepageMain.removeEventListener('scroll', this.dispatchScroll, false);
  }
};
</script>

<style lang="less">
@import '../../../less/tool.less';
.homepage-main {
  padding-bottom: 135/@rem;
  height: 100%;
  overflow-y: auto;
  .fontSize(24);
  .icon-nav{
    height: 480/@rem;
    border: 1px solid #ccc;
  }
}
</style>
