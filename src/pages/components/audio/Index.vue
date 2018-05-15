<template>
  <div class="home-page">
    <div class="audio-page">
      <div class=" banner">
        <img class="course-img" :src="audio.verticalCover" v-if="audio.verticalCover && ! audio.lateralCover"/>
        <img class="course-img-lateral" :src="audio.lateralCover" v-if="audio.lateralCover"/>
        <img class="course-img-lateral" src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-column-cover.png" v-if="!audio.lateralCover && !audio.verticalCover"/>
        <span class="xl strong line1 detail-word">{{audio.title}}</span>
      </div>
      <div class="controler column-between">
        <div class="slider-bar">
          <!--播放器进度条-->
          <range  ball-width="30" :canDrag="audio.powerLevel"/>
          <div class="row-between timer">
            <span class="xs week row-center">{{current}}</span>
            <span class="xs week row-center">{{duration}}</span>
          </div>
        </div>
        <div class="row-between control-bar">
          <button type="primary" class="btn-switch" @click="audioPrev">
            <i class="iconfont icon-shangyiqu" :style="{color: `${!audio.isPrev ? '#FF9E9A' : '#FF5349'}`}"></i>
          </button>
          <button type="primary" class="btn-play" @click="togglePlay">
            <i class="iconfont" :class="playing ? 'icon-bofangqi-zanting' : 'icon-bofang'"></i>
          </button>
          <button type="primary" class="btn-switch" @click="audioNext">
            <i class="iconfont icon-xiayiqu" :style="{color: `${!audio.isNext ? '#FF9E9A' : '#FF5349'}`}"></i>
          </button>
        </div>
        <div class="column-between bottom" :class="!audio.powerLevel ? 'h214' : 'h120'" :style ="{borderTop: `${!audio.powerLevel ? 'none' : '1px solid #E5E5E5'}`}">
          <div class="buy-bar row-around" :class="audio.musicTryEnd ? 'buy-bar-after' : 'buy-bar-before'" v-if="!audio.powerLevel">
            <span class="remind nm " v-if="!audio.musicTryEnd && audio.columnId">试听免费课程，购买后收听完整专栏</span>
            <span class="remind nm " v-if="!audio.musicTryEnd && !audio.columnId">免费试听前{{audio.watchable}}秒，购买后收听完整版</span>
            <span class="remind nm " v-if="audio.musicTryEnd">试听结束，购买后收听完整版</span>
            <button type="primary" class="btn-fetch row-center" @tap="goPay">
              直接购买
            </button>
          </div>
          <div class="row-around table" style="">
            <button type="primary" class="column-around btn-bottom" @click="routeToCourse(audio)">
              <i class="iconfont icon-detail"></i>
              <span class="xxs weak">详情</span>
            </button>
            <button type="primary" class="column-around btn-bottom" @click="onShareAppMessage()">
              <i class="iconfont icon-share1"></i>
              <span class="xxs weak">分享</span>
            </button>
            <button type="primary"  class="column-around btn-bottom" @click="routeToAudioList()">
              <i class="iconfont icon-list"></i>
              <span class="xxs weak">播放列表</span>
            </button>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import router from '../../../mixins/router';
import store from '../../../vuex/store';
import play from '../../../api/play';
import { mapState } from 'vuex'
import range from 'components/basic/range'
export default {
  data () {
    return {
    };
  },
  computed: {
    ...mapState(['audio','playing','currentTime','musicDuration']),
    current() {
      return this.timerFomart(this.currentTime)
    },
    duration() {
      return this.timerFomart(this.musicDuration)
    }
  },
  mounted () {

  },
  methods: {
    audioPrev () {
      if (this.audio.isPrev) play.startAudio(this.audio.columnId, this.audio.courseId, 'prev')
    },
    togglePlay() {
      if (!this.audio.musicTryEnd) {
        store.commit('togglePlay');
      }
    },
    audioNext (){
      if (this.audio.isNext) play.startAudio(this.audio.columnId, this.audio.courseId, 'next')
    },
    goPay(){},
    onShareAppMessage(){},
    timerFomart (time) {
      if (isNaN(time)) return '00:00';
      let mm = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60);
      let ss = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60);
      return mm + ':' + ss;
    }
  },
  components:{ range },
  mixins: [router]
};
</script>
<style lang="less">
@import '../../../less/variable';
 .audio-page{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: white;
    width: 690/@rem;
    height: 100%;
    padding: 0 30/@rem;
    .banner{
      width: 100%;
      height: 54%;
      position: relative;
      padding: 1/@rem;
      box-sizing: border-box;
      border:none;
      .course-img{
        width: 360/@rem;
        height: 468/@rem;
        display: block;
        margin: 40/@rem auto 0;
        box-shadow: -5/@rem 0/@rem 10/@rem 4/@rem rgba(225,225,225,0.5);
        border-radius: 10/@rem;
      }
      .course-img-lateral{
        width: 494/@rem;
        height: 360/@rem;
        margin: 136/@rem auto 0;
        display: block;
        border-radius: 10/@rem;
        box-shadow: -5/@rem 0/@rem 10/@rem 4/@rem rgba(225,225,225,0.5);
      }
      .detail-word{
        position: absolute;
        text-align: center;
        display: block;
        bottom: 45/@rem;
      }
    }
    .controler{
      height: 46%;
    }
    .slider-bar{
      width: 690/@rem;
    }
    .control-bar{
      width: 414/@rem;
      .btn-switch{
        width: 46/@rem;
        background: white;
        border:none;
        .iconfont{
          font-size: 46/@rem;
        }
      }
      .btn-play{
        display: block;
        width:130/@rem;
        height:130/@rem; 
        line-height: 130/@rem;
        border: 0;
        border-color: transparent;
        background:linear-gradient(90deg,rgba(254,61,52,1),rgba(255,101,77,1));
        border-radius: 50%;
        .iconfont{
          font-size: 46/@rem;
          color: #fff;
        }
      }
    }
    .bottom{
      width: 750/@rem;
      @colorbefore: #FF3E44;
      @colorafter: #FF5F4E;
      &.h214{
        height:214/@rem;
      }
      &.h120{
        height:120/@rem;
      }
      .buy-bar{
        width: 750/@rem;
        height: 94/@rem;
        .btn-fetch{
          width:150/@rem;
          height:56/@rem; 
          border-radius: 45/@rem; 
          font-size: @text-sm;
          border: 1/@rem solid #ff464a;
        }
      }
      .buy-bar-before{
        background: #FFF2EB;
        .remind{
          color: @colorbefore;
        }
        .btn-fetch{
          background:white;
          color: @colorbefore;
          border:1px solid #ff464a;
        }
      }
      .buy-bar-after{
        background: @colorafter;
        .remind{
          color: white;
        }
        .btn-fetch{
          background:#FFD900;
          color: #FF4000;
        }
      }
      .table{
        width: 100%;
        height: 120/@rem;
        .btn-bottom{
          width: 200/@rem;
          height: 120/@rem;
          background: white;
          border: none;
          .iconfont{
            width: 36/@rem;
            height: 36/@rem;
            font-size: 36/@rem;
            color: #666666;
          }
        }
      }
    }
  }
</style>
