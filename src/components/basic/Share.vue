<template>
  <div class="share">
    <div class="share-mask"></div>
    <div class="share-point">
      <img src="https://yun.dui88.com/yoofans/images/201804/miniapp/no-choice.png" class="cry-icon" />
      <img src="https://yun.dui88.com/yoofans/images/201804/miniapp/no-choice.png" class="cry-icon" />
      <img src="https://yun.dui88.com/yoofans/images/201804/miniapp/no-choice.png" class="cry-icon" />
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data: {},
        img: ''
      };
    }
  };
</script>
<style lang="less">
  @import url('../../assets/style/base/tool.less');
  .share-mask{
    width: 750/@rem;
    height: 100%;
    position: fixed;
    background: rgba(0,0,0,0.4971);
    z-index: 1000;
    top: 0;
    left: 0;
  }
  .share-point{
    img{
      z-index:1001;
      display:block;
      position: fixed;
    }

  }
</style>
