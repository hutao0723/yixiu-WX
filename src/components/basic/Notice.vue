<template>
  <div class="notice-bar">
    <div class="pop-mask"></div>
    <div class="no-choice">
      <img src="https://yun.dui88.com/yoofans/images/201804/miniapp/no-choice.png" class="cry-icon" />
      <div class="tac word">你还未选择任何音频课程</div>
      <div class="tac word">请先选择后在点击收听</div>
      <button class="know">我知道了</button>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data: {}
      };
    }
  };
</script>
<style lang="less">
  @import url('../../assets/style/base/tool.less');
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
    &.show{
      animation: moveup 1s forwards;
      -moz-animation: moveup 1s forwards; 
      -webkit-animation: moveup 1s forwards;
      -o-animation: moveup 1s forwards;
      bottom: 80/@rem;
    }
    &.hide{
      animation: movedown 1s forwards;
      -moz-animation: movedown 1s forwards; 
      -webkit-animation: movedown 1s forwards;
      -o-animation: movedown 1s forwards;
      bottom:-5400/@rem;
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
      bottom:80/@rem; 
    }   
    }

  @keyframes movedown{
    from { 
      bottom:80/@rem; 
    }
    to { 
      bottom:-540/@rem;
    }   
  }
</style>
