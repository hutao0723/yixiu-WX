<template>
  <div class="index-main">
    <keep-alive>  
    <router-view></router-view>
    </keep-alive>  
    <bnav></bnav>
    <AudioBar/>
  </div>
</template>

<script>
// import store from '../vuex/store'
import bnav from '../components/basic/Nav';
import AudioBar from '../components/basic/Audio_Bar';
export default {
  components: {
    bnav, AudioBar
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

// --- 基础样式gobal_loading 加载动画 --- //
/* router-fade */
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .2s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>
