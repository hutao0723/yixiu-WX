<template>
  <div class="bottom-nav">
    <ul>
      <li v-for="(item, index) in navlist">
        <router-link :to="item.router">
          <p>
            <i class="iconfont" :class="item.icon"></i>
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
            icon: 'icon-shouye',
            router: '/index/home'
          },
          {
            title: '已购',
            icon: 'icon-yigou1',
            router: '/index/cart'
          },
          {
            title: '我的',
            icon: 'icon-wode',
            router: '/index/user'
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
    height: 70/@rem;
    padding: 14/@rem 0;
    background-color: #FFFFFF;
    box-shadow: 0 -5/@rem 5/@rem 0 rgba(150, 150, 150, 0.1);
    .fontSize(22);
    ul {
      li{
        width: 33%;
        display: inline-block;
        text-align: center;
        p{
          line-height: 34/@rem;
        }
        i{
          .fontSize(32);
        }
        .router-link-active{
          color: #FF3E44;
        }
      }
    }
  }
</style>
