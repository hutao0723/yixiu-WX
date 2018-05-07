<template>
  <div class="o-iconnav clearfix">
    <ul>
      <li v-for="(item, index) in iconlist" :index="index">
        <router-link :to="{ path: item.router }" class="title">
          <i class="iconfont icon" v-html="item.icon"></i>
          <p>{{item.title}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        iconlist: [
          {
            title: '未提交',
            icon: '&#xe62b;',
            router: '/store/orderall/unsubmit'
          },
          {
            title: '已提交',
            icon: '&#xe65c;',
            router: '/store/orderall/submited'
          },
          {
            title: '待发货',
            icon: '&#xe60e;',
            router: '/store/orderall/undelivery'
          },
          {
            title: '已发货',
            icon: '&#xe623;',
            router: '/store/orderall/deliveried'
          }
        ]
      };
    },
    methods: {
    }
  };
</script>
<style lang="less">
  @import url('../../assets/style/base/tool.less');
  .o-iconnav{
    background-color: #fff;
    padding-bottom: 20/@rem;
    ul{
      li {
        padding-top: 24/@rem;
        float: left;
        .iconfont{
          .fontSize(38);
          color: #fd8839;
          line-height: 1;
        }
        a{
          display: inline-block;
          width: 184/@rem;
          text-align: center;
          margin: 0 auto;
        }
        .title{
          line-height: 46/@rem;
          color: #333;
          .fontSize(22);
        }
      }
    }
  }
</style>
