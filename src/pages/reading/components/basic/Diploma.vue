<template>
  <div class="contact">
    <div class="pop-mask"></div>
    <div class="container">
      <div class="icon-tri share column-center">
          <i class="iconfont icon-close ear-icon"></i>
      </div>
      <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=768904644,500415380&fm=27&gp=0.jpg">
      <div class="btn" @click="know">我知道了</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      
    },
    data() {
      return {
        data: {}
      };
    },
    methods: {
      know() {
        this.$emit("success")
      }
    }
  };

</script>
<style lang="less">
@import '../../less/variable';
@import '../../less/base';
@import '../../less/icon';
.pop-mask{
  width: 750/@rem;
  height: 100%;
  position: fixed;
  background: rgba(0,0,0,0.6);
  z-index: 1000;
  top: 0;
  left: 0;
}
.container{
  width: 440/@rem;
  height: 610/@rem; 
  // background:rgba(255,251,251,1);
  border-radius: 9/@rem; 
  position: fixed;
  z-index: 1001;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  .icon-tri{
    width: 50/@rem;
    height: 50/@rem;
    position: absolute;
    right:0;
    top:0;
    background:rgba(0,0,0,0.3);
    border-radius: 50%;
  }
  .ear-icon{
    color: #fff;
    .fontSize(19);
  }
  img{
    display: block;
    height: 400/@rem;
    width: 440/@rem;
    position: absolute;
    top: 50/@rem;
  }
  .btn{
    width: 100%;
    height: 78/@rem;
    background: rgba(255,236,71,1);
    border-radius: 13/@rem; 
    margin: 45/@rem auto 0;  
    text-align: center;
    color: @color-strong;
    .fontSize(30); 
    position: absolute;
    bottom:0;
    line-height: 78/@rem;
  }
}
  
</style>

