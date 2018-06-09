<template>
  <div class="audio-main">
    <div class="audio-page">
      <div class=" banner">
        <img class="course-img" :src="readAudio.verticalCover ? readAudio.verticalCover : 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-column-cover.png'" />
        <span class="xl black line1 detail-word">{{readAudio.courseTitle}}</span>
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
          <button type="primary" class="column-around btn-bottom" @click="routeToArticle">
            <i class="iconfont icon-page"></i>
            <span class="xxs primary">文稿</span>
          </button>
          <button type="primary" class="btn-switch" @click="audioPrev">
            <i class="iconfont icon-prev" :style="{color: `${readAudio.isPrev ? '#343434' : '#919191'}`}"></i>
          </button>
          <button type="primary" class="btn-play " :class="readLoadStart ? 'rotation' : ''" @click="togglePlay">
            <i class="iconfont icon-musicload" v-if="readLoadStart"></i>
            <i class="iconfont" :class="readPlaying ? 'icon-pause' : 'icon-play'" v-else></i>
          </button>
          <button type="primary" class="btn-switch" @click="audioNext">
            <i class="iconfont icon-next" :style="{color: `${readAudio.isNext ? '#343434' : '#919191'}`}"></i>
          </button>
          <button type="primary"  class="column-around btn-bottom" @click="routeToList">
            <i class="iconfont icon-list"></i>
            <span class="xxs primary">播放列表</span>
          </button>
        </div>
      </div>
      <div class="bottom" @click="goComment" v-if="readAudio.curRead">
         {{text}}
      </div>
    </div> 
    <div class="card-modal" v-if="showCardModal" >
      <div class="pop-mask"></div>
      <div class="modalbar">
        <div class="btn-yes column-center">
            <i class="iconfont icon-yes"></i>
        </div>
        <div class="btn-close column-center" @click="hideModal">
            <i class="iconfont icon-close"></i>
        </div>
        <p class="des">你已完成今日课程，趁热打铁来打卡吧！</p>
        <p class="info">今日已打卡<span class="warm">{{clockCount}}</span>人</p>
        <div class="btn-card" @click="goComment">打卡</div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../vuex/store';
import play from '../../api/play';
import { mapState } from 'vuex'
import range from '../../components/basic/Range'
import access from '../../mixins/accessHandler';

export default {
  data () {
    return {
      clockCount: ''
    };
  },
  computed: {
    ...mapState(['readAudio','readPlaying','readCurrentTime','readDuration','showCardModal','readLoadStart']),
    current() {
      return this.timerFomart(this.readCurrentTime)
    },
    duration() {
      return this.timerFomart(this.readDuration)
    },
    text() {
      if (!this.readAudio.clockState) {
          return '去打卡'
      } else {
        if (!this.readAudio.commentState) {
          return '写想法'
        } else {
          return '查看'
        }
      }
    }
  },
  async mounted () {
    let readAudio = this.readAudio;
    let freshAudio = await play.getReadDetail(readAudio.readId, readAudio.courseId);
    Object.assign(readAudio, freshAudio);
    readAudio.src = await play.getAudioUrl(store.getters.getAudioInfo.readId, store.getters.getAudioInfo.courseId);
    store.commit({ type: 'setAudio', readAudio: readAudio });
    if (!store.getters.getAudioElement.getAttribute('src')){
      store.getters.getAudioElement.setAttribute('src', store.getters.getAudioInfo.src);
      store.getters.getAudioElement.setAttribute('title', store.getters.getAudioInfo.title); 
    }
    // 获取打卡人数
    this.clockCount = await play.getClockCount(this.readAudio.readId, this.readAudio.courseId);
  },
  methods: {
    audioPrev () {
      if (this.readAudio.isPrev) play.audioPrev()
    },  
    togglePlay() {
      store.commit('togglePlay');
    },
    audioNext (){
      if (this.readAudio.isNext) play.audioNext()
    },
    routeToArticle () {
      this.$router.push('/audio/article/' + this.readAudio.courseId);
    },
    routeToList () {
      this.$router.push('/audio/list');
    },
    hideModal () {
      store.commit('resetShowCardModal')
    },
    goComment () {
      store.commit('resetShowCardModal');
      if (this.text == '查看') {
        this.$router.push({name:'poster',query:{commentId:this.readAudio.commentId,lastClock:0,isClock:1}})
      } else {
        this.$router.push(`/comment/${this.readAudio.readId}/${this.readAudio.courseId}`);
      }
    },
    timerFomart (time) {
      if (isNaN(time)) return '00:00';
      let mm = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60);
      let ss = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60);
      return mm + ':' + ss;
    }
  },
  components:{ range },
  mixins: [access]
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
      height: 60%;
      position: relative;
      padding: 1/@rem;
      box-sizing: border-box;
      border:none;
      .course-img{
        width: 246/@rem;
        height: 330/@rem;
        display: block;
        margin: 142/@rem auto 0;
        box-shadow: -5/@rem 0/@rem 10/@rem 4/@rem rgba(225,225,225,0.5);
        border-radius: 10/@rem;
      }
      // .course-img-lateral{
      //   width: 494/@rem;
      //   height: 360/@rem;
      //   margin: 136/@rem auto 0;
      //   display: block;
      //   border-radius: 10/@rem;
      //   box-shadow: -5/@rem 0/@rem 10/@rem 4/@rem rgba(225,225,225,0.5);
      // }
      .detail-word{
        margin-top: 52/@rem;;
        text-align: center;
        display: block;
        // bottom: 45/@rem;
        font-weight: bold;
      }
    }
    .controler{
      height: 20%;
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
      @-webkit-keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
        }
      @keyframes rotation{
        from {-webkit-transform: rotate(0deg);}
        to {-webkit-transform: rotate(360deg);}
        }

      .rotation{
      animation: rotation 1s linear infinite;
      -moz-animation: rotation 1s linear infinite;
      -webkit-animation: rotation 1s linear infinite;
      -o-animation: rotation 1s linear infinite;
      }

    }
    .bottom{
      width:300/@rem;
      height: 70/@rem;
      margin: 18% auto;
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
  .pop-mask{
    width: 750/@rem;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.6);
    z-index: 1000;
    top: 0;
    left: 0;
  }
  .modalbar{
    width: 590/@rem;
    height: 448/@rem; 
    background:rgba(255,251,251,1);
    border-radius: 20/@rem; 
    position: fixed;
    z-index: 1001;
    box-sizing: border-box;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    .btn-yes{
      width: 160/@rem;
      height: 160/@rem;
      position: absolute;
      top: -80/@rem;
      left: 50%;
      transform: translate(-50%,0);
      background: #FF4C4C;
      border-radius: 50%;
    }
    .btn-close{
      width: 50/@rem;
      height: 50/@rem;
      position: absolute;
      right: 15/@rem;
      top: -75/@rem;
      background:rgba(0,0,0,0.3);
      border-radius: 50%;
    }
    .icon-yes{
      color: #fff;
      font-size: 74/@rem;
    }
    .icon-close{
      color: #fff;
      font-size: 19/@rem;
    }
    .des{
      width:390/@rem;
      height:84/@rem;
      margin: 145/@rem auto 0;
      text-align: center;
      font-size:30/@rem;
      font-family:PingFangSC-Medium;
      color:rgba(51,51,51,1);
      line-height:42/@rem;
    }
    .info{
      width:188/@rem;
      height:33/@rem;
      margin: 66/@rem auto 16/@rem;
      text-align: center;;
      font-size:24/@rem;
      font-family:PingFangSC-Medium;
      color:rgba(51,51,51,1);
      line-height:33/@rem;
    }
    .btn-card{
      width: 460/@rem;
      height: 68/@rem;
      line-height: 68/@rem;
      margin: 0 auto;
      background: #FFDB43;
      border-radius: 10/@rem; 
      text-align: center;
      color: @color-strong;
      font-size: 30/@rem;
      font-weight: bold;
    }
  }
</style>
