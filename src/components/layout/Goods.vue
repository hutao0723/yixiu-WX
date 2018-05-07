<template>
  <div class="g-goods clearfix" >
    <router-link class="item" v-for="(item, index) in goods" :key="index" :to="{ path: '/goodsDetail/' + item.goodsId}">
      <div class="img">
        <img class="big" v-lazy="item.profileImage.length ? item.profileImage[0] : '//yun.dui88.com/loading.gif'">
      </div>
      <div class="info">
        <div class="name">{{item.goodsName}}</div>
        <div class="name">{{item.goodsId}}</div>
        <div class="brief">{{item.brand}}</div>
        <div class="price">{{item.price}}<span>起</span></div>
      </div>
    </router-link>
    <span class="nodata" v-if="!goods.length">无匹配的数据</span>
  </div>
</template>
<script>
  export default {
    props: {
      goods: {
        default: ''
      }
    },
    data () {
      return {
      };
    },
    methods: {
    }
  };
</script>
<style lang="less">
@import '../../assets/style/base/tool.less';
  .g-goods{
    padding: 8/@rem 0 8/@rem 10/@rem;
    background-color: #fff;
    .item{
      background-color: #f5f5f5;
      margin-right: 10/@rem;
      margin-bottom: 10/@rem;
      display: block;
      width: 360/@rem;
      float: left;
      .img{
        background: #fff;
        width: 360/@rem;
        height: 360/@rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        padding: 20/@rem 30/@rem;
        line-height: 32/@rem;
        .name{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .brief{
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .fontSize(24);
        }
      }
      .price {
        .fontSize(26);
        color: #ea625b;
        height: 32/@rem;
        line-height: 32/@rem;
        position: relative;
        display: inline-block
      }
    }
    .nodata{
      display: inline-block;
      width: 100%;
      margin: 20/@rem auto;
      text-align: center;
    }
  }
</style>
