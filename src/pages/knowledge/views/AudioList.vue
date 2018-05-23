<template>
  <div class="audio-list">
    <div v-for="item in list">
      <div class="audio-item row-between" @click="playAudio(item)">
        <div class="row-center" :class="!(audio.courseId === item.id) ? 'icon-paused' : 'icon-play'">
          <img class="wave-icon" src="../images/audio.svg" v-if="audio.courseId == item.id" />
          <i class="iconfont icon-bofang" v-else></i>
        </div>
        <div class="content-bar column-between">
          <span class="lg line1" :class="!(audio.courseId === item.id) ? 'strong' : 'soft'">{{item.title}}</span>
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
import store from '../vuex/store';
import order from '../api/order';
import play from '../api/play';
import access from '../mixins/accessHandler';
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
      setTimeout(()=>{
      const msg = {
          title: this.audio.title,
          desc: this.audio.subTitle,
          link: this.audio.courseId ? 'http://k.youfen666dev.com/#/course/' + this.audio.courseId:false ||this.audio.columnId ? 'http://k.youfen666dev.com/#/column/' + this.audio.columnId:false ,
          imgUrl: this.audio.lateralCover || this.audio.verticalCover ||
            'https://yun.dui88.com/yoofans/images/201804/miniapp/details-page-top.png',
        }
        this.wxShare(msg)
    },3000)
    this.setTitle('播放列表')
  },
  methods: {
    playAudio(item) {
      play.startAudio(this.audio.columnId,item.id,'init');
      this.$router.go(-1);
    }
  },
  mixins: [access]
  };
</script>
<style lang="less">
  @import '../less/variable';
  @import '../less/tool.less';
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