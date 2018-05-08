<template>
  <div class="homepage-main">
    <swiper></swiper>
    <!-- <goods v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="40" :goods='goodsAll'></goods> -->
    <!-- <loading :loading="busy" class="loading"></loading> -->
  </div>
</template>

<script>
import config from '../../../api/config';
import swiper from 'components/template/swiper';
import goods from 'components/layout/Goods';
import loading from 'components/layout/Loading';
import { mapState } from 'vuex';
export default {
  components: {
    swiper,
    goods,
    loading
  },
  data () {
    return {
      data: {},
      mock: '',
      transform: '',
      busy: false,
      params: {
        brandName: '',
        gradeName: '',
        pageNow: 1,
        pageCount: 20
      },
      goodsAll: ''
    };
  },
  computed: {
    ...mapState({
      // goodsAll: state => state.goodsAll
    })
  },
  mounted () {
    this.getAllGoods();
  },
  watch: {
    'busy': function (val) {
      if (val) {

      }
    }
  },
  methods: {
    getAllGoods () {
      // this.$http.get('/datainter/dataFillServlet?tradeType=35', {params: this.params}).then(res => {
      //   res = res.body;
      //   if (res.result === 1) {
      //     this.busy = false;
      //     let data = res.data;
      //     let arr = this.goodsAll || [];
      //     arr.push(...data);
      //     this.goodsAll = arr;
      //     // this.$store.dispatch('setGoodsAll', data);
      //   }
      // }, (res) => {
      // });
      config.layout()
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
