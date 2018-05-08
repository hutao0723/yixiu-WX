<template>
  <div class="store-main">
    <div class="user-box">
      <div class="user-info">
          <img :src="imageUrl" class="info-icon" />
          <div class="info-text">{{username}}</div>
      </div>
      <div class="mtr20 user-h110 row" >
        <div class="icon-box share column-center">
          <i class="iconfont icon-recom user-icon"></i>
        </div>
        <div class="row ft32 ml30">推荐给好友</div>
      </div>
      <a class="mtr20 user-h110 row" href="">
        <div class="icon-box help column-center">
          <i class="iconfont icon-help user-icon"></i>
        </div>
        <div class="row ft32 ml30">帮助中心</div>
      </a>
    </div>
    <!-- <div class="notice-bar">
      <div class="pop-mask"></div>
      <div class="no-choice">
        <img src="https://yun.dui88.com/yoofans/images/201804/miniapp/no-choice.png" class="cry-icon" />
        <div class="tac word">你还未选择任何音频课程</div>
        <div class="tac word">请先选择后在点击收听</div>
        <button class="know">我知道了</button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      data: {},
      imageUrl: 'https://yun.dui88.com/yoofans/images/201804/miniapp/help-center.png',
      username: '哈哈'
    };
  },
  watch: {},
  mounted () {
    // this.getAllStocks();
  },
  methods: {
    // share: function () {
    //   wx.onMenuShareAppMessage({
    //     title: '一修读书', // 分享标题
    //     desc: '在这里发现最好的自己', // 分享描述
    //     link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //     imgUrl: 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/knowledge.jpg', // 分享图标
    //     type: '', // 分享类型,music、video或link，不填默认为link
    //     dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //     success: function () {
    //     // 用户确认分享后执行的回调函数
    //     },
    //     cancel: function () {
    //     // 用户取消分享后执行的回调函数
    //     }
    //   });
    // }
  }
};
</script>

<style lang="less">
@import '../../../less/tool.less';
.center-main{
  background: #f4f4f4;
  height:100%;
}
.store-main {
  .user-box{
    height: 100%;
    background:rgba(244,244,244,1);
    box-sizing:border-box;
    border-top: 2/@rem solid #F4F4F4;
    .user-info{
      width: 750/@rem;
      height: 328/@rem; 
      background: rgba(255,255,255,1);
      padding: 1/@rem 0;
    }
    .info-icon{
      height: 150/@rem;
      margin: 54/@rem auto 0;
      width: 150/@rem;
      display: block;
      border-radius: 50%;
    }
    .info-text{
      text-align: center;
      margin-top: 22/@rem;
      height: 50/@rem; 
      .fontSize(36);
      color: rgba(68,68,68,1);
      line-height: 50/@rem;
    }
    .user-h110{
      height: 110/@rem;
      background:rgba(255,255,255,1);
      padding:0 30/@rem;
      border-radius:0;
      color: #333;
    }
    .ft32{
      .fontSize(32);
    }
    .ml30{
      margin-left:30/@rem;
    }
    .mtr20{
      margin-top:20/@rem;
    }
    .icon-box{
      width: 50/@rem;
      height: 50/@rem;
      border-radius: 50%;
      &.share{
        background:rgba(255,78,81,1);
      }
      &.help{
        background:rgba(65,164,255,1);
      }
    }
    .user-icon{
      color:#fff;
      .fontSize(26);
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
}
  
</style>
