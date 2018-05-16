<template>
  <div class="store-main">
    <div class="help-box">
      <img :src="imageUrl" class="info-icon" />
      <div class="info-text">{{username}}</div>
      <div class="word">听得见的知识，看得见的成长</div>
      <div class="introduce">
        <div class="word">你的学习过程中遇到问题了吗？</div>
        <div class="word">可以点击「遇到问题」向客服人员咨询</div>
        <div class="word">如果你学习过程中感到一个人很孤独，可以点</div>
        <div class="word">击「寻找组织」加入一修课堂学习交流群</div>
      </div>
      <div class="btn-box">
        <button class="btn-find" @click="onImage">遇到问题</button>
        <button class="btn-find bgred" @click="onShare">寻找组织</button>
      </div>
    </div>
    <AudioBar/>
  </div>
</template>

<script>
  import order from '../api/order';
  import AudioBar from 'components/basic/Audio_Bar';
  export default {
    components: {
      AudioBar
    },
    data() {
      return {
        data: {},
        imageUrl: 'https://yun.dui88.com/yoofans/images/201804/miniapp/help-center.png',
        username: '一修课堂'
      };
    },
    watch: {},
    created() {
      var link = window.location.href;
      this.wxShare('这一次,我想和你一起走在美丽的路上', '我正在参加中国丽人秀海选盛典,诚请你为我投上宝贵的一票', link)
    },
    mounted() {
      // const arr = ['previewImage', 'onMenuShareAppMessage', 'onMenuShareTimeline']
      // const res = await order.getApiRules(arr);
    },
    methods: {
      // 预览
      onImage() {
        order.wxPreview();
      },
      onShare(){
        order.wxShare();
      }
    }
  };

</script>

<style lang="less">
  @import '../less/tool.less';
  .help-box {
    height: 100%;
    padding: 1/@rem 0;
    box-sizing: border-box;
    border-top: 7/@rem solid #F4F4F4;
    .info-icon {
      height: 150/@rem;
      margin: 97/@rem auto 45/@rem;
      width: 150/@rem;
      display: block;
      border-radius: 50%;
    }
    .info-text {
      text-align: center;
      .fontSize(36);
      color: rgba(34, 34, 34, 1);
      margin-bottom: 74/@rem;
    }
    .word {
      .fontSize(28);
      color: rgba(102, 102, 102, 1);
      text-align: center;
      line-height: 40/@rem;
    }
    .introduce {
      margin: 55/@rem auto 20/@rem;
    }
    .btn-box {
      padding-top: 55/@rem;
      .btn-find {
        width: 360/@rem;
        height: 70/@rem;
        border-radius: 34/@rem;
        line-height: 70/@rem;
        margin: 0 auto;
        .fontSize(30);
        display: block;
        color: rgba(255, 80, 72, 1);
        background: inherit;
        margin-bottom: 55/@rem;
        border: 2/@rem solid rgba(255, 80, 72, 1);
        &.bgred {
          background: linear-gradient(-90deg, rgba(255, 80, 72, 1), rgba(255, 80, 72, 1));
          box-shadow: 0 10/@rem 14/@rem 0 rgba(255, 209, 209, 0.5);
          color: rgba(255, 255, 255, 1);
          border-color: transparent;
          border: 0;
        }
      }
    }
  }

</style>

