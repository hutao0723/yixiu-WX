<template>
  <div class="cardNotice-box" @click="hideNotice()">
    <div class="notice-box">
      <div class="notice-title">打卡须知</div>
      <ul class="notice-content">
        <div class="notice-order">
          <span>1</span>
          <i v-for="item in [1,2,3,4,5,6,7,8]"></i>
          <span>2</span>
        </div>
        <li>点击xx页面，完成当日学习目标后，将自动弹出弹窗提醒打卡。或者在收听页面，点击“打卡“按钮进行打卡</li>
        <li>分享打卡图片至微信朋友圈，并把分享截图发送至班级群，坚持49天即可获得一修阅读定制音响</li>
      </ul>
      <div class="notice-btn" @click="hideNotice()">我知道了</div>
    </div>
  </div>
</template>
<script>

  export default {
    props: ['noticeFlag'],
    data () {
      return {

      };
    },
    methods: {
      hideNotice(){
        this.$emit('changFlag',false)
      }
    },
    components: {

    }
  }
</script>

<style  lang="less">
  @import "../../less/variable";
  .cardNotice-box{
    width:100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
    position: absolute;
    top:0;
    left:0;
    color:#333;
    .notice-box{
      width:536/@rem;
      border-radius: 8/@rem;
      position: absolute;
      top:50%;
      left:50%;
      transform: translate(-50%,-50%);
      overflow: hidden;
      .notice-title{
        font-size: 30/@rem;
        text-align: center;
        height: 90/@rem;
        line-height: 90/@rem;
        background: #FFE555;
      }
      .notice-content{
        position: relative;
        background: #fff;
        padding: 57/@rem 30/@rem 33/@rem 103/@rem;
        li{
          margin-bottom: 45/@rem;
          color:#555555;
          font-size: 24/@rem;
          line-height: 37/@rem;
        }
        .notice-order{
          position: absolute;
          left:39/@rem;
          span{
            width:44/@rem;
            height:44/@rem;
            background: #FFE555;
            border-radius: 50%;
            display: block;
            text-align: center;
            line-height: 44/@rem;
            margin-bottom: 9/@rem;
          }
          i{
            width:4/@rem;
            height:4/@rem;
            background: #F7DC7B;
            border-radius: 50%;
            display: block;
            margin: 0 auto;
            margin-bottom: 9/@rem;
          }
        }
      }
      .notice-btn{
        text-align: center;
        border-top: 1px solid #E5E5E5;
        height:82/@rem;
        line-height: 82/@rem;
        font-size: 28/@rem;
        background: #fff;
      }
      .notice-btn:active{
        background: #E5E5E5;
      }
    }
  }
</style>
