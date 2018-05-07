<template>
  <div class="shopcar">
    <div class="fl total">
      <p>共<span class="price">{{piece}}</span>件</p>
      <p><span class="price">{{'￥' + price}}</span><span>元</span></p>
    </div>
    <div class="fl handle">加入购物车</div>
  </div>
</template>
<script>
  export default {
    props: {
      piece: {
        type: Number,
        default: 0
      },
      price: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
      };
    }
  };
</script>
<style lang="less">
  @import url('../../assets/style/base/tool.less');
  .shopcar{
    position: fixed;
    bottom: 110/@rem;
    left: 0;
    right: 0;
    z-index: 99;
    box-shadow: 0 3px 14px 2px rgba(0,0,0,.12);
    background-color: #fff;
    height: 80/@rem;
    .total{
      width: 33%;
      padding-top: 10/@rem;
      p{
       text-align: center;
       line-height: 28/@rem;
      }
      span{
        display: inline-block;
      }
      .price{
        color: #ff6700;
      }
    }
    .handle{
      width: 67%;
      background-color: #ff6700;
      line-height: 80/@rem;
      text-align: center;
      color: #fff;
      .fontSize(34);
    }
  }
</style>
