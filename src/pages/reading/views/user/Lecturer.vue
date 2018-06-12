<template>
  <div class="lecturer-main">
    <div class="title">老师微信信息</div>
    <img class="code" :src="codeUrl" @click="clickFun($event)" :monitor-log="getMonitor('0.0.0.0', '829.1.0')">
    <div class="point">
      温馨提示：由于微信对添加好友的限制，老师可能收不到你的好友请求，如果在三个工作日内老师还未通过你的好友申请，你可以再发一次哦！
    </div>
     <AudioBar  @click="clickFun($event)" :monitor-log="getMonitor('0.0.0.0', '829.2.0')"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import bnav from '../../components/basic/Nav';
import user from '../../api/user';
import AudioBar from '../../components/basic/Audio_Bar';

export default {
  components: {
    bnav,AudioBar
  },
  data () {
    return {
      data: {},
      codeUrl: ''
    };
  },
  computed: {
    ...mapState({})
  },
  created() {
    },
  mounted () {
    this.getLecturerInfo();
  },
  methods: {
     getMonitor(dcm,dpm) {
        // item tabindex dpmc
        return JSON.stringify({
          'dcm': dcm,
          'dpm': '157.' + dpm,
        });
      },
    async getLecturerInfo (){
      let objs = await user.getInfo();
        if (objs.success) {
          this.codeUrl = objs.data.teacherWxQrcodeUrl;
        } else {
          console.log("获取用户信息失败")
        }
    }
  }
};
</script>

<style lang="less">
@import '../../less/variable';
@import '../../less/base';
@import '../../less/icon';
.lecturer-main{
  padding: 70/@rem 0 0 0;
  .title{
    text-align: center;
    .fontSize(40);
    font-weight: bold;
    margin-bottom: 58/@rem;
  }
  .code{
    margin:0 auto 60/@rem;
    width: 540/@rem;
    height: 630/@rem;

    display: block;
  }
  .name{
    font-weight: bold;
    .fontSize(44);
    text-align: center;
    margin-bottom: 64/@rem;
  }
  .point{
    width:630/@rem;
    .fontSize(28);
    color: @color-major;
    margin:0 auto;
    line-height: 40/@rem;
  }
}

  
</style>

