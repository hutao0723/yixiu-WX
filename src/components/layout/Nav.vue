<template>
  <div class="bottom-nav">
    <ul>
      <li v-for="(item, index) in navlist">
        <router-link :to="item.router">
          <p>
            <i class="iconfont" v-html="item.icon"></i>
          </p>
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
        navlist: [
          {
            title: '首页',
            icon: '&#xe626;',
            router: '/home/index'
          },
          {
            title: '已购',
            icon: '&#xe61a;',
            router: '/cart'
          },
          {
            title: '我的',
            icon: '&#xe689;',
            router: '/user'
          }
        ]
      };
    }
  };
</script>
<style lang="less">
  @import url('../../assets/style/base/tool.less');
  .bottom-nav{
    position: fixed;
    z-index: 100;
    bottom: -1px;
    right: 0;
    left: 0;
    height: 60/@rem;
    padding: 25/@rem 0;
    background-color: #f5f5f5;
    box-shadow: 0 -5/@rem 5/@rem 0 rgba(150, 150, 150, 0.1);
    .fontSize(24);
    ul {
      li{
        width: 33%;
        display: inline-block;
        text-align: center;
        p{
          line-height: 34/@rem;
        }
        i{
          .fontSize(40);
        }
        .router-link-active{
          color: #ff6700;
        }
      }
    }
  }
</style>
