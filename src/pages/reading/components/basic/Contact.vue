<template>
  <div class="contact">
    <div class="pop-mask"></div>
    <div class="service">
      <div class="text">
        <p>在【一修读书】公众号内回复</p>
        <p>关键词：联系客服</p>
      </div>
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
.service{
  width: 480/@rem;
  height: 312/@rem; 
  background:rgba(255,251,251,1);
  border-radius: 9/@rem; 
  position: fixed;
  z-index: 1001;
  box-sizing: border-box;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 72/@rem 0 52/@rem;
  .text{
    color: @color-strong;
    text-align: center;
    .fontSize(26);
    p{
      line-height: 37/@rem;
    }
  }
  .btn{
    width: 340/@rem;
    height: 68/@rem;
    background: rgba(255,219,67,1);
    border-radius: 6/@rem; 
    margin: 45/@rem auto 0;  
    text-align: center;
    font-weight: bold;
    color: #343434;
    .fontSize(30); 
    line-height: 68/@rem;
  }
}
  
</style>

