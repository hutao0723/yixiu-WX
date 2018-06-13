<template>
  <div class="audio-bar">
    <div class="audio-controler row"  @click="clickFun($event,goAudioPage)" :monitor-log="monitorlog"> 
      <div class="right-bar row-around" style="background-repeat:no-repeat;background-size:100% 100%;" 
      :style="{backgroundImage:`url(${readAudio.verticalCover || baseImg}`}" >
        <div class="icon-state column-center mask">
          <i class="iconfont icon-play" v-if="!readPlaying"></i>
          <img class="" src="../../images/audio.svg" v-else/>
        </div>
      </div>
    </div>
    <div class="notice-bar">
      <div class="pop-mask" v-if="notice"></div>
      <div class="no-choice" :class="{showin:animation && notice, hideout:animation && !notice}">
        <img src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/no-choice.png" class="cry-icon" />
        <div class="tac word">你还未选择任何音频课程</div>
        <div class="tac word">请先选择后在点击收听</div>
        <button class="know" @click="hideNotice">我知道了</button>
      </div>
    </div>
  </div>
</template>
<script>
import store from '../../vuex/store';
import { mapState } from 'vuex';
  export default {
    props : {
      bottom: {
        default: false
      },
      monitorlog: {
        default: ''
      }
    },
    data () {
      return {
        baseImg: '//yun.dui88.com/yoofans/images/201806/yixiulogo.png',
        audioData: {
          current: 0,
          duration: 0,
          paused: true
        },
        notice: false,
        animation: false

      };
    },
    computed: {
      ...mapState(['readAudio','readPlaying','videoToggle'])
    },
    methods: {
      goAudioPage: function() {
        if (!this.readAudio.src) {
          this.notice = true;
          this.animation = true;
        } else {
          this.notice = false;
          this.animation = false;
          document.title = store.getters.getAudioInfo.courseTitle;
          this.$router.push(`/audio/index`);
        }
      },
      hideNotice: function(){
        this.notice = false;
        this.animation = false;
      }
    }
  };
</script>
<style lang="less">
@import url('../../less/variable.less');
.audio-controler{
  @size: 90/@rem;
  position: fixed;
  right: 40/@rem;
  bottom: 130/@rem;
  z-index: 20;
  &.bt130{
    bottom: 130/@rem;
  }
  &.bt40{
    bottom: 40/@rem;
  }
  .right-bar{
    width: @size;
    height: @size;
    border-radius: 50%;
    box-shadow: 0px 8/@rem 10/@rem 0/@rem rgba(204,204,204,0.5);
    .icon-state{
      width: 86/@rem;
      height: 86/@rem;
      border-radius: 50%;
      border: 4/@rem solid @color-white;
      &.mask{
        background:rgba(0,0,0,0.5);
      }
      .iconfont{
        color: @color-white;
        font-size: 40/@rem;
      }
      .icon-play{
        color: #fff;
      }
    }
  }
}
  .pop-mask{
    width: 750/@rem;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.4971);
    z-index: 1000;
    top: 0;
    left: 0;
  }
  .no-choice{
    width:750/@rem;
    height:540/@rem; 
    background:rgba(255,251,251,1);
    border-radius: 18/@rem 18/@rem 0 0; 
    position: fixed;
    bottom: -540/@rem;
    z-index: 1001;
    left:0;
    &.showin{
      animation: moveup 1s forwards;
      -moz-animation: moveup 1s forwards; 
      -webkit-animation: moveup 1s forwards;
      -o-animation: moveup 1s forwards;
    }
    &.hideout{
      animation: movedown 1s forwards;
      -moz-animation: movedown 1s forwards; 
      -webkit-animation: movedown 1s forwards;
      -o-animation: movedown 1s forwards;
    }
    .cry-icon{
      display:block;
      margin: 81/@rem auto 26/@rem;
      width: 150/@rem;
      height: 146/@rem;
      border-radius: 50%; 
    }
    .tac{
      text-align: center;
    }
    .word{
      font-size: 30/@rem;
      line-height: 42/@rem;
      color: rgba(136,136,136,1);
      }
    .know{
      width: 640/@rem;
      height: 80/@rem; 
      border-radius: 6/@rem;
      margin: 74/@rem auto 0;
      background:inherit;
      line-height: 80/@rem;
      color:rgba(136,136,136,1);
      display:block;
      border: 1/@rem solid #979797;
    }
  }
  @keyframes moveup{
    from { 
      bottom:-540/@rem; 
    }
    to {
      bottom:0/@rem; 
    }   
    }

  @keyframes movedown{
    from { 
      bottom:0/@rem; 
    }
    to { 
      bottom:-540/@rem;
    }   
  }
</style>
