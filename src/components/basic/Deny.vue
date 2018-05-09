<template>
  <div class="deny-box">
      <img src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/deny.png" class="icon"/>
      <div class="tac mt88">小程序需要获取用户信息权限, </div>
      <div class="tac">前往设置</div>
      <button class="row-center go-set" @click="goGetSetting">
        <div class="row-center ft32 ml30">去设置<i class="iconfont jiantou ft32"></i></div>
      </button>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        data: {}
      };
    },
    methods: {
      goGetSetting (){
        console.log("goGetSetting")
      }
    }
  };
</script>
<style lang="less">
  @import url('../../assets/style/base/tool.less');
   .deny-box{
    height: 100%;
    background: #fff;
    padding:1/@rem 20/@rem;
    box-sizing: border-box;
    .go-set{
      width: 223/@rem;
      height: 63/@rem; 
      line-height: 63/@rem; 
      background: rgba(255,255,255,1);
      border-radius: 8/@rem; 
      margin: 44/@rem auto 0;
      border: 2/@rem solid rgba(85,85,85,1);
    }
    .icon{
      display: block;
      width: 160/@rem;
      height: 150/@rem;
      margin: 350/@rem auto 0;
    }
    .tac{
      .fontSize(30);
      color: rgba(154,154,154,1);
      line-height: 42/@rem;
      text-align: center;
    }
    .mt88{
      margin-top: 88/@rem;
    }
    .ft32{
      font-size: 32/@rem;
    }
    .jiantou{
      width: 14/@rem;
      height: 14/@rem;
      border-top: 2/@rem solid rgba(85,85,85,1);
      border-right: 2/@rem solid rgba(85,85,85,1);
      transform: rotate(45deg);
      margin-left:5/@rem;
    }
  }
</style>
