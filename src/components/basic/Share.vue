<template>
  <div class="share" v-if="guide">
    <div class="share-mask"></div>
    <div class="share-point">
      <img src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/jiantou.png" class="arrow" />
      <img src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/fenxiang.png" class="word" />
      <img src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/zhidao.png" class="know" @click="know"/>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data: {},
        guide: true
      };
    },
    methods: {
      know (){
        this.guide = false;
        console.log("I know")
      }
    }
  };
</script>
<style lang="less">
  @import url('../../assets/style/base/tool.less');
  .share-mask{
    width: 750/@rem;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.8);
    z-index: 1000;
    top: 0;
    left: 0;
  }
  .share-point{
    img{
      z-index: 1001;
      display: block;
      position: fixed;
      &.arrow{
        width: 106/@rem;
        height: 106/@rem;
        top: 44/@rem;
        right: 79/@rem;
      }
      &.word{
        width: 464/@rem;
        height: 132/@rem;
        top: 203/@rem;
        left: 143/@rem;
      }
      &.know{
        width: 246/@rem;
        height: 100/@rem;
        top: 839/@rem;
        left: 252/@rem;
      }
    }

  }
</style>
