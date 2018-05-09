<template>
  <div>
    <div class="audio-controler row"  :class="bottom ? 'bt130' : 'bt40'" @click="goAudioPage"> 
      <div class="right-bar row-around" style="background-repeat:no-repeat;background-size:100% 100%;" 
      :style="{backgroundImage:`url(${audioData.coverImgUrl ? audioData.coverImgUrl : baseImg}`}" >
        <div class="icon-play column-center" :class="audioData.paused ? 'line' : 'mask'">
          <i class="iconfont icon-bofang" v-if="audioData.paused"></i>
          <img class="" src="../../../images/audio.svg" v-else/>
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
  export default {
    props : {
      bottom: {
        default: false
      }
    },
    data () {
      return {
        baseImg: 'https://yun.dui88.com/yoofans/images/201804/miniapp/player.png',
        audioData: {
          current: 0,
          duration: 0,
          paused: true
        },
        notice: false,
        animation: false

      };
    },
    methods: {
      goAudioPage: function() {
        if (!false) {
          // this.$emit('showNotice');
          this.notice = true
          this.animation = true
        } else {
          this.notice = false
          this.animation = false
          // this.$root.$navigate('/pages/play/audio_detail')
        }
      },
      hideNotice: function(){
        this.notice = false
      }
    }
  };
</script>
<style lang="less">
@import url('../../assets/style/base/tool.less');
@import url('../../less/variable.less');
.audio-controler{
  @size: 90/@rem;
  position: fixed;
  right: 60/@rem;
  bottom: 40/@rem;
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
    .icon-play{
      width: 87/@rem;
      height: 87/@rem;
      border-radius: 50%;
      &.mask{
        border: 3/@rem solid @color-white;
        background:rgba(0,0,0,0.4753);
      }
      &.line{
        border: 3/@rem solid #CBCBCB;
      }
      .iconfont{
        color: @color-white;
        font-size: 40/@rem;
      }
      .icon-bofang{
        color: rgba(0,0,0,0.4753)
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
      .fontSize(30);
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
