<template>
  <div id="app">
    <!-- <tbar></tbar> -->
    <div class="center-main">
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <bnav></bnav>
  </div>
</template>

<script>
import tbar from 'components/layout/TopBar';
import bnav from 'components/layout/Nav';
export default {
  components: { tbar, bnav }
};
</script>

<style lang="less">
@import "./less/icon";
@import "./less/base";
@import "./less/animate";

.center-main {
  width: 750/@rem;
  height: 100%;
  // padding-top: 80/@rem;
  padding-bottom: 110/@rem; 
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  padding-bottom: 0;
  // z-index: 9;
  background: #fff;
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
