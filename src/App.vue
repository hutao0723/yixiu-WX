<template>
  <div id="app">
    <audio id="myaudio" ref="audio" @timeupdate="musicTimeUpdate" @canplay="musicCanPlay" @playing="musicOnPlaying" @ended="musicEnded" @waiting="musicOnWaiting" @pause="musicOnPause" @loadstart="loadStart"></audio>
    <div class="center-main">
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
      <bnav></bnav>
    </div>
    
  </div>
</template>

<script>
import bnav from 'components/layout/Nav';
import store from './vuex/store'
export default {
  data () {
    return {
      info: {}
    }
  },
  methods: {
    // 音频播放结束事件
    musicEnded () {
      store.dispatch('play_Ended')
      // 歌词初始化
      musicLrcIndex = 0
      store.commit({
        type: 'setLyricIndex',
        index: 0
      })
    },
    // 音乐播放时间更新事件
    musicTimeUpdate () {
      store.dispatch({
        type: 'set_CurrentTime',
        time: Math.floor(this.$refs.audio.currentTime)
      })

      let currentTime = Math.floor(this.$refs.audio.currentTime)
    },
    // 可以播放事件
    musicCanPlay () {

      store.dispatch({
        type: 'set_MusicDuration',
        duration: Math.floor(this.$refs.audio.duration)
      })
      store.commit({
        type: 'setMusicLoadStart',
        isloadstart: false
      })
    },
    // 音乐处于播放状态
    musicOnPlaying () {
      store.commit('play')
    },
    // 音乐处于watting状态
    musicOnWaiting () {

      alert('音乐加载中')
    },
    // 音乐处于暂停状态
    musicOnPause () {
      store.commit('pause')
    },
    // 音乐加载
    loadStart () {

      store.commit({
        type: 'setMusicLoadStart',
        isloadstart: true
      })
    }
  },
  mounted() {

    store.dispatch('set_AudioElement', this.$refs.audio);
    this.$refs.audio.setAttribute('src', store.getters.getAudioInfo.url);
    alert(this.$refs.audio.src)
     document.addEventListener('touchstart', function() {
        store.commit('play')
    })
    
  },
  components: { bnav }
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
