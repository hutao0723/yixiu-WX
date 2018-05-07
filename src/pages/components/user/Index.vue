<template>
  <div class="store-main">
    我的
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      data: {}
    };
  },
  watch: {},
  mounted () {
    // this.getAllStocks();
  },
  methods: {
    // 查询订单信息
  }
};
</script>

<style lang="less">
@import '../../../less/tool.less';
.store-main {
  .my_header_v4{
    position: relative;
    height: 169/@rem;
    margin: 0 auto;
    background: #d34201 url(//gw.alicdn.com/tfscom/TB10.51HFXXXXXqXpXXYx6l2pXX-750-235.jpg_q90) no-repeat top center;
    background-size: cover;
    color: #fff;
  }
  .label-act{
    height: 80/@rem;
    line-height: 80/@rem;
    padding-left: 24/@rem;
    display: -webkit-box;
    display: box;
    .navItem{
      display: -webkit-box;
      display: box;
      width: 100%;
      color: #333;
      font-weight: normal;
      .iconfont{
        &.icon{
          width: 36/@rem;
          height: 36/@rem;
          .fontSize(30);
          margin-right: 14/@rem;
          color: #fd8839;
          padding: 5/@rem 3/@rem;
        }
        &.right{
          padding: 0 7/@rem;
          color: #aaa;
          position: absolute;
          border-bottom: 1px solid #e7e7e7;
        }
      }
      .h1{
        .fontSize(24);
        width: 635/@rem;
        border-bottom: 1px solid #e7e7e7;
      }
      .sub{
        // .fontSize(20);
        position: absolute;
        right: 50/@rem;
      }
    }
    &:last-child{
      border-bottom: 0;
    }
  }
  .line{
    content: '';
    display: block;
    height: 17/@rem;
    background: #f8f8f8;
  }
  .other{
    margin-top: 20/@rem;
  }
}
</style>
