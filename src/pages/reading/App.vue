<template>
  <div id="app">
    <audio id="myaudio" ref="audio" @timeupdate="musicTimeUpdate" @canplay="musicCanPlay" @playing="musicOnPlaying" @ended="musicEnded" @waiting="musicOnWaiting" @pause="musicOnPause" @loadstart="loadStart"></audio>
      <transition name="router-fade" mode="out-in">
        <router-view :key="key"></router-view>
      </transition>
  </div>
</template>

<script>
import store from './vuex/store'
import { mapState } from 'vuex'
import play from './api/play'
export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['readPlaying','readCurrentTime','readAudio']),
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  },
  watch: {
    readPlaying(val) {
      if (val) {
        clearInterval(this.syncReadTime)
        this.syncReadTime = setInterval(() => {
          play.syncPlaytimes();
        }, 60000)
      } else {
        clearInterval(this.syncReadTime)
      };
      if (val) {
        clearInterval(this.syncProgress)
        this.syncProgress = setInterval(() => {
          play.syncProgress(this.readAudio.readId, this.readAudio.courseId, this.readCurrentTime);
        }, 5000)
      } else {
        clearInterval(this.syncProgress)
      }
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
    },
    // 可以播放事件
    musicCanPlay () {
      store.dispatch({
        type: 'set_ReadDuration',
        duration: Math.floor(this.$refs.audio.duration)
      })
      store.commit({
        type: 'setReadLoadStart',
        isloadstart: false
      })
      if (this.$refs.audio.currentTime === 0 && store.getters.getAudioInfo.playbackProgress < store.getters.getMusicDuration) 
        {this.$refs.audio.currentTime = store.getters.getAudioInfo.playbackProgress;}
    },
    // 音乐处于播放状态
    musicOnPlaying () {
      store.commit({
        type: 'setPlaying',
        readPlaying: true
    })
    },
    // 音乐处于watting状态
    musicOnWaiting () {},
    // 音乐处于暂停状态
    musicOnPause () {
      store.commit('pause')
    },
    // 音乐加载
    loadStart () {
      store.commit({
        type: 'setReadLoadStart',
        isloadstart: true
      })
    }
  },
  mounted() {
    store.commit({ type: 'setReferer', referer: '' });  // 设置来源路径为空
    store.dispatch('set_AudioElement', this.$refs.audio);
    store.commit({
      type: 'setPlaying',
      readPlaying: false
    })
  },
  beforeDestroy () {
    // play.syncProgress(this.readAudio.readId, this.readAudio.courseId, this.readCurrentTime);
  }
};
</script>

<style lang="less">
@import "./less/base";

// --- 基础样式gobal_loading 加载动画 --- //
/* router-fade */
.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .2s;
}
.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>
