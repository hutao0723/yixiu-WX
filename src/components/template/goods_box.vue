<template>
    <!--tab栏-->
<!--   <div class="g-tabbar  category-wrapperparam.tabs.length " scroll-x scroll-with-animation scroll-left="scrollLeft"
    v-if='param.tabs && param.tabs.length > 1'>
    <div v-for="(item, index) in param.tabs">
      <div class="type-box">
        <div class="type-navbar-item index" :class={ param.navActive == index ? 'type-item-on' : ''} data-index="index" @click="swichNav">
          {{item.groupName || '-'}}
        </div>
      </div>
    </div>
  </div> -->
  <div class="goods-box">
    <!--横向单个布局-->
    <div class="row-box column" v-if="param.layout == 'ROW'">
      <RowItem v-for="(item, index) in  param.tabs[param.navActive?param.navActive:0].goods" :goods.sync="item" :index.sync="index" />
    </div>

    <!--横向广告栏布局-->
    <div class="nopic-box column" v-if="param.layout == 'NOPIC'">
      <NopicItem v-for="(item, index) in  param.tabs[param.navActive?param.navActive:0].goods" :goods.sync="item" />
    </div>

    <!--横向两个布局-->
    <div class="grid-two-box row-between" v-if="param.layout == 'GRID_2'">
      <GridTwoItem v-for="(item, index) in  param.tabs[param.navActive?param.navActive:0].goods" :goods.sync="item" />
    </div>

    <!--横向三个布局-->
    <div class="grid-three-box row-around" v-if="param.layout == 'GRID_3'">
      <GridThreeItem v-for="(item, index) in  param.tabs[param.navActive?param.navActive:0].goods" :goods.sync="item" />
    </div>
  </div>

</template>
<script>
  import RowItem from './goods/goods_row';
  import NopicItem from './goods/goods_nopic';
  import GridThreeItem from './goods/goods_three';
  import GridTwoItem from './goods/goods_two';
  export default {
    props: {
      param: Object
    },
    data () {
      return {
        currentTab: 0,
        scrollLeft: 0
      };
    },
    methods: {
      /**
     * 点击tab切换
     */
      swichNav(e) {
        this.param.navActive = e.target.dataset.index;
        this.currentTab = e.target.dataset.index;
        this.scrollLeft = this.currentTab > 3 ? (this.currentTab * 120) : 0;
      }
    },
    components: {
      RowItem: RowItem,
      NopicItem: NopicItem,
      GridTwoItem: GridTwoItem,
      GridThreeItem: GridThreeItem
    }
  }
</script>

<style lang="less">
  @import "../../less/variable";
  .goods-box {
    background-color: white;
    padding: 0 30/@rem;
    display: flex;
  }

  /*横向广告栏布局*/

  .nopic-box {
    .goods-nopic-box {
      &:last-child {
        border-bottom: @border;
        padding-bottom: 30/@rem;
      }
      &:first-child {
        padding-top: 34/@rem;
      }
    }
  }

  /*横向单个布局*/

  .row-box {
    .goods-row-box {
      &:last-child {
        border-bottom: none;
      }
    }
  }

  /*横向三个布局*/

  .grid-three-box,
  .grid-two-box {
    flex-wrap: wrap;
    width: 690/@rem;
  }

  /*横向N个滑动布局*/

  .scroll-box {
    width: 690/@rem;
    height: 352/@rem;
    white-space: nowrap;
    .goods-scroll-box:last-child {
      padding-right: 0;
    }
  }
  .pt34{
    padding-top: 34/@rem;
  }
.g-tabbar{
  white-space: nowrap;
  height: 98/@rem;
  width: 100%;
  background-color: #fff;
  position: relative;
  z-index: 20;
  overflow: hidden;
  border-bottom: 2/@rem solid #E5E5E5;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.type-box{
  line-height:94/@rem;
  padding: 0 24/@rem;
  text-align: center;
  display: inline-block;
  width: 120/@rem;
}
.type-navbar-item{
  font-size: 32/@rem!important;
  color: #666;
  border-bottom: 6/@rem solid #fff;
}
.type-item-on{
  color: rgba(255,62,68,1)!important;
  font-weight: bold;
  font-size: 36/@rem!important;
  border-bottom: 6/@rem solid #ff4a4a;
}


.category-wrapper2 {
  width: 600/@rem;
  padding-left: 150/@rem;
  .type-box {
    width: 160/@rem;
    margin-right: 140/@rem;
  }
}

.category-wrapper3 {
  width: 675/@rem;
  padding-left: 75/@rem;
  .type-box {
    width: 160/@rem;
    margin-right: 65/@rem;
  }
}

.category-wrapper4 {
  width: 720/@rem;
  padding-left: 30/@rem;
  .type-box {
    width: 160/@rem;
    margin-right: 20/@rem;
  }
}

  .category-wrapper2,
  .category-wrapper3,
  .category-wrapper4 {
    .type-box {
      padding: 0;
      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>