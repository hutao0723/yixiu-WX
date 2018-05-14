<template>
  <div class="homepage-main">
    <!-- <goods v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="40" :goods='goodsAll'></goods> -->
    <!-- <loading :loading="busy" class="loading"></loading> -->
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
import SwiperBar from 'components/template/swiper_bar';
import TitleBar from 'components/template/title_bar';
import GoodsBox from 'components/template/goods_box';
import BlankBar from 'components/template/blank_bar';
import goods from 'components/layout/Goods';
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
      data: {},
      init: false,
      notice: false,
      animation: false,
      params:'',
      components: []
    };
  },
  computed: {
    ...mapState({
      // goodsAll: state => state.goodsAll
    })
  },
  async mounted () {
    await this.renderTemplatePage();
  },
  watch: {
    'busy': function (val) {
      if (val) {

      }
    }
  },
  methods: {
     /**
     * 渲染页面
     */
    async renderTemplatePage() {
      console.log('渲染页面的方法')
      const layout = (await config.layout()).body.data;
      let page = [];
      let that = this;
      Promise.all(JSON.parse(layout.componentSections).map(function(item, i){
        return new Promise(function(resolve, reject){
           resolve(config.component(item.componentType, item.componentId))
        }).then(res => page[i] = res.body.data )
      })).then(function(data){
        let processData = config.processPage(layout, page)
        that.params = processData.params;
        that.components = processData.components;
        that.components.forEach(item=>{
          if(item.componentType == 'GOODSBOX'){
            item['navActive'] = 0;
          }
          console.log('通过这个步骤渲染页面')
        })
        // that.loaded();
        console.log(that.components)
        console.info(`[template] render template page success`);
      })
    },
    loadMore: function () {
      this.busy = true;
      this.params.pageNow = this.params.pageNow += 1;
      this.getAllGoods();
    }
  }
};
</script>

<style lang="less">
@import '../../../less/tool.less';
.homepage-main {
  padding-bottom: 135/@rem;
  .fontSize(24);
  .icon-nav{
    height: 480/@rem;
    border: 1px solid #ccc;
  }
}
</style>
