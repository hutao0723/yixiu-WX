<template>
  <div id="app">
    <audio id="myaudio" ref="audio" @timeupdate="musicTimeUpdate" @canplay="musicCanPlay" @playing="musicOnPlaying" @ended="musicEnded" @waiting="musicOnWaiting" @pause="musicOnPause" @loadstart="loadStart"></audio>
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
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
    },
    // 音乐播放时间更新事件
    musicTimeUpdate () {
      store.dispatch({
        type: 'set_CurrentTime',
        time: Math.floor(this.$refs.audio.currentTime)
      })
      if (!store.getters.getAudioInfo.powerLevel && Math.floor(this.$refs.audio.currentTime) == store.getters.getAudioInfo.watchable) {
        store.commit('pause');
        store.commit('setMusicTryEnd');
      }
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
      // if (this.$refs.audio.currentTime === 0) this.$refs.audio.currentTime = store.getters.getAudioInfo.playbackProgress;
    },
    // 音乐处于播放状态
    musicOnPlaying () {
      store.commit('play')
    },
    // 音乐处于watting状态
    musicOnWaiting () {
      
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
    store.commit('setPlaying')
  },
  beforeDestroy () {
    // store.commit('pause')
  }
};
</script>

<style lang="less">
@import "./less/icon";
@import "./less/base";
@import "./less/animate";

// --- 基础样式gobal_loading 加载动画 --- //
/* router-fade */
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .2s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>
