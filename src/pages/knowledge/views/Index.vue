<template>
  <div class="index-main">
    <router-view></router-view>
    <bnav></bnav>
  </div>
</template>

<script>
// import store from '../vuex/store'
import bnav from '../components/basic/Nav';
export default {
  components: {
    bnav
  },
  data () {
    return {
      info: {}
    }
  },
  methods: {
  },
  mounted() {
    const msg = {
            title: '一修读书', // 分享标题
            desc: '在这里发现更好的自己', // 分享描述
            link: 'http://k.youfen666dev.com/knowledge.html#/index/home', // 分享链接 默认以当前链接
            imgUrl: 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/knowledge.jpg', // 分享图标
          }

          this.wxShare(msg)
  },
};
</script>

<style lang="less">
@import "../less/icon";
@import "../less/base";
@import "../less/animate";
.index-main{
  background:rgba(244,244,244,1);
  height: 100%;
}
// --- 基础样式gobal_loading 加载动画 --- //
/* router-fade */
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .2s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>
