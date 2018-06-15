<template>
  <div class="audio-list">
    <div v-for="item in readList">
      <div class="audio-item row-between" @click="playAudio(item)">
        <div class="row-center icon-on">
          <!-- <img class="wave-icon" src="../../images/audio.svg" v-if="readAudio.courseId == item.id" /> -->
          <i :class="readAudio.courseId == item.id ? 'iconfont icon-wave' : 'iconfont icon-play'"></i>
        </div>
        <div class="content-bar column-between">
          <span class="lg line1 strong title">{{item.title}}</span>
          <div class="info-bar row-between">
            <div class="duration">
              <i class="iconfont icon-clock mr10"></i>
              <span class="xs weak">{{item.duration}}</span>
            </div>
            <span class="already xs weak">{{'已收听' + item.percent}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from '../../vuex/store';
import play from '../../api/play';
export default {
  computed: {
    ...mapState(['readAudio','readList'])
  },
  data () {
    return {
    };
  },
  mounted () {
    // 更新播放列表数据
    play.getReadList(this.readAudio.readId)
  },
  methods: {
    async playAudio(item) {
      store.commit('play');
      // 获取课程详情
      let readAudio = await play.getReadDetail(item.readId, item.id);
      readAudio.index = store.getters.getReadIds.indexOf(item.id);
      readAudio.isPrev = readAudio.index == 0 ? false : true;
      readAudio.isNext = readAudio.index == (store.getters.getReadIds.length - 1) ? false : true;
      // 获取播放地址
      readAudio.src = await play.getAudioUrl(item.readId, item.id);
      // 更新vx数据
      store.commit({ type: 'setAudio', readAudio: readAudio });
      // 设置播放元素数据
      store.getters.getAudioElement.setAttribute('src', store.getters.getAudioInfo.src);
      store.getters.getAudioElement.setAttribute('title', store.getters.getAudioInfo.title); 
      // 这里，很迷，触发播放
      store.commit('play');
      document.title = store.getters.getAudioInfo.courseTitle;
      this.$router.go(-1);
    }
  }
  };
</script>
<style lang="less">
  @import '../../less/variable';
  // @import '../../less/tool.less';
  .audio-list {
    width: 690/@rem;
    padding: 0 30/@rem;
    border-top: 1px solid rgba(216, 216, 216, 1);
    .audio-item {
      width: 690/@rem;
      height: 142/@rem;
      border-bottom: @border;
      .icon-on {
        width: 54/@rem;
        height: 54/@rem;
        border: 2px solid #ababab;
        border-radius: 50%;
        .iconfont {
          color: @color-soft;
          font-size: 22/@rem;
        }
        .icon-wave {
          color: #ffc732;
        }
      }
      }
      .content-bar {
        width: 626/@rem;
        height: 92/@rem;
        padding-left: 20/@rem;
        box-sizing: border-box;
        .title{
          font-weight: bold;
        }
        .info-bar {
          width: 100%;
        }
        .duration {
          width: 200/@rem;
          .iconfont {
            color: @color-weak;
            font-size: 24/@rem;
          }
        }
        .already {
          width: 200/@rem;
          text-align: right;
        }
      }
    }
</style>