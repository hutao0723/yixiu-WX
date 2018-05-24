<template>
  <div class="audio-main">
    <div class="audio-page">
      <div class=" banner">
        <img class="course-img" :src="audio.verticalCover" v-if="audio.verticalCover && ! audio.lateralCover"/>
        <img class="course-img-lateral" :src="audio.lateralCover" v-if="audio.lateralCover"/>
        <img class="course-img-lateral" src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-column-cover.png" v-if="!audio.lateralCover && !audio.verticalCover"/>
        <span class="xl black line1 detail-word">{{audio.title}}</span>
      </div>
      <div class="controler column-between">
        <div class="slider-bar">
          <!--播放器进度条-->
          <range />
          <div class="row-between timer">
            <span class="xs week row-center">{{current}}</span>
            <span class="xs week row-center">{{duration}}</span>
          </div>
        </div>
        <div class="row-between control-bar">
          <button type="primary" class="column-around btn-bottom" @click="routeToCourse(audio)">
            <i class="iconfont icon-detail"></i>
            <span class="xxs primary">文稿</span>
          </button>
          <button type="primary" class="btn-switch" @click="audioPrev">
            <i class="iconfont icon-shangyiqu" :style="{color: `${!audio.isPrev ? '#343434' : '#919191'}`}"></i>
          </button>
          <button type="primary" class="btn-play" @click="togglePlay">
            <i class="iconfont" :class="playing ? 'icon-bofangqi-zanting' : 'icon-bofang'" ></i>
          </button>
          <button type="primary" class="btn-switch" @click="audioNext">
            <i class="iconfont icon-xiayiqu" :style="{color: `${!audio.isNext ? '#343434' : '#919191'}`}"></i>
          </button>
          <button type="primary"  class="column-around btn-bottom" @click="routeToAudioList()">
            <i class="iconfont icon-list"></i>
            <span class="xxs primary">播放列表</span>
          </button>
        </div>
        <div class="bottom">
           写想法
        </div>
      </div>
    </div> 
    
  </div>
</template>

<script>
import router from '../../mixins/router';
import store from '../../vuex/store';
import play from '../../api/play';
import order from '../../api/order';
import { mapState } from 'vuex'
import range from '../../components/basic/Range'
import Share from '../../components/basic/Share';
import access from '../../mixins/accessHandler';

export default {
  data () {
    return {
      shareToggle: false,
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
    if (!store.getters.getAudioElement.getAttribute('src')) {
      store.getters.getAudioElement.setAttribute('src', store.getters.getAudioInfo.src);
      store.getters.getAudioElement.setAttribute('title', store.getters.getAudioInfo.title);
    }
  },
  methods: {
    // 获取monitor
    getMonitor(dpm) {
      return JSON.stringify({
        'dcm': '8001.',
        'dpm': dpm,
      });
    },
    success(){
      this.shareToggle = false;
    },
    audioPrev () {
      play.startAudio(this.audio.columnId, this.audio.courseId, 'prev')
    },  
    togglePlay() {
      if (!this.audio.musicTryEnd) {
        store.commit('togglePlay');
      }
    },
    audioNext (){
      play.startAudio(this.audio.columnId, this.audio.courseId, 'next')
    },
    goPay(){
        order.buy(this.audio.columnId?this.audio.columnId:this.audio.courseId, this.audio.columnId?2:1)
      
    },
    timerFomart (time) {
      if (isNaN(time)) return '00:00';
      let mm = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60);
      let ss = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60);
      return mm + ':' + ss;
    }
  },
  components:{ range,Share },
  mixins: [router, access]
};
</script>
<style lang="less">
@import '../../less/variable';
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
      height: 62%;
      position: relative;
      padding: 1/@rem;
      box-sizing: border-box;
      border:none;
      .course-img{
        width: 240/@rem;
        height: 336/@rem;
        display: block;
        margin: 142/@rem auto 0;
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
        margin-top: 52/@rem;;
        text-align: center;
        display: block;
        // bottom: 45/@rem;
        font-weight: bold;
      }
    }
    .controler{
      height: 38%;
    }
    .slider-bar{
      width: 690/@rem;
    }
    .control-bar{
      width: 690/@rem;
      .btn-switch{
        width: 38/@rem;
        background: white;
        border:none;
        .iconfont{
          font-size: 38/@rem;
        }
      }
      .btn-bottom{
          width: 88/@rem;
          height: 120/@rem;
          background: white;
          border: none;
          .iconfont{
            width: 36/@rem;
            height: 40/@rem;
            font-size: 40/@rem;
            color: @color-black;
          }
        }
      .btn-play{
        display: block;
        width:120/@rem;
        height:120/@rem; 
        line-height: 120/@rem;
        border: 0;
        border-color: transparent;
        background:@color-black;
        border-radius: 50%;
        .iconfont{
          font-size: 44/@rem;
          color: #fff;
        }
      }
    }
    .bottom{
      width:300/@rem;
      height: 70/@rem;
      line-height: 70/@rem;
      text-align: center;
      margin-bottom: 70/@rem;
      background:rgba(255,229,85,1);
      border-radius: 42/@rem ; 
      font-size:28/@rem;
      font-family:'PingFang-SC-Bold';
      color: #000;
      font-weight: bold;
    }
  }
</style>
