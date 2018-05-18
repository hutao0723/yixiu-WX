<template>
  <div class="index-main">
    <router-view></router-view>
    <bnav></bnav>
  </div>
</template>

<script>
// import store from '../vuex/store'
import bnav from 'components/basic/Nav';
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
  },
  beforeDestroy () {
    // store.commit('pause')
  }
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
