<template>
  <div class="audio-list">
    <div v-for="item in list">
      <div class="audio-item row-between" @click="playAudio">
        <div class="row-center" :class="!(audio.courseId === item.courseId) ? 'icon-paused' : 'icon-play'">
          <img class="wave-icon" src="../../../images/audio.svg" v-if="!(audio.courseId === item.courseId)" />
          <i class="iconfont icon-bofang" v-else></i>
        </div>
        <div class="content-bar column-between">
          <span class="lg line1" :class="!(audio.courseId === item.courseId) ? 'strong' : 'soft'">{{item.title}}</span>
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
import store from '../../../vuex/store';
import order from '../../../api/order';
import play from '../../../api/play';
export default {
  computed: {
    ...mapState(['audio'])
  },
  data () {
    return {
      list:[]
    };
  },
  async mounted () {
    if (!this.audio.columnId) {
        // 单课程列表
        let objs = await order.getCourseDetail(this.audio.courseId);
        this.list = [objs]
      } else {
        let objs = await order.getColumnList(this.audio.columnId);
        this.list = objs.filter((item) => {
          return item.powerLevel == 1 || item.freeTime > 0;
        });
      }
      this.list.forEach((item) => {
        item.duration = play.fmtTime(+item.timeLength);
        let percent = Math.floor((+item.playbackProgress ? +item.playbackProgress : 0) / +item.timeLength * 100);
        item.percent = (percent > 100 ? 100 : percent) + "%";
      })
      console.log(this.list)
  },
  methods: {
    playAudio(item) {
        store.getters.getAudioElement.setAttribute('src', store.getters.getAudioInfo.src);
        store.getters.getAudioElement.setAttribute('title', store.getters.getAudioInfo.title);
        store.commit('play');
      }
    }
  };
</script>
<style lang="less">
  @import '../../../less/variable';
  @import '../../../less/tool.less';
  .audio-list {
    width: 690/@rem;
    padding: 0 30/@rem;
    border-top: 1px solid rgba(216, 216, 216, 1);
    .audio-item {
      width: 690/@rem;
      height: 142/@rem;
      border-bottom: @border;
      .icon-play {
        width: 54/@rem;
        height: 54/@rem;
        background: @color-soft;
        border-radius: 50%;
        .wave-icon {
          width: 45/@rem
        }
        .iconfont {
          color: white;
          .fontSize(22);
        }
        ;
      }
      .icon-paused {
        width: 54/@rem;
        height: 54/@rem;
        background: rgba(170, 170, 170, 1);
        box-shadow: 0px 2px 4px 0px rgba(214, 214, 214, 0.5);
        border-radius: 50%;
        .iconfont {
          color: white;
          .fontSize(22);
        }
        ;
      }
      .content-bar {
        width: 626/@rem;
        height: 92/@rem;
        padding-left: 20/@rem;
        box-sizing: border-box;
        text.onplay {
          color: #fff
        }
        .info-bar {
          width: 100%;
        }
        .duration {
          width: 200/@rem;
          .iconfont {
            color: @color-weak;
            .fontSize(24);
          }
        }
        .already {
          width: 200/@rem;
          text-align: right;
        }
      }
    }
  }
</style>