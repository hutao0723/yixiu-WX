<template>
  <div class="">
    <div class="audio-list">
      <div v-for="item in list">
        <div class="audio-item row-between">
          <div class="row-center" :class="!item.playing ? 'icon-paused' : 'icon-play'">
            <!-- ../../images/svg/audio.svg -->
            <img class="wave-icon" src=""  v-if="item.playing"/>
            <i class="iconfont icon-bofang" v-else></i>
          </div>
          <div class="content-bar column-between">
            <span class="lg  line1" :class="!item.playing ? 'strong' : 'soft'">{{item.title}}</span>
            <div class="info-bar row-between">
              <div class="duration">
                <i class="iconfont icon-clock mr10"></i>
                <span class="xs weak">{{item.duration}}</span>
              </div>
              <span class="already xs weak">{{'已收听' + item.percent}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  data () {
    return {
      list:[
        {
          playing: 1,
          title: '学会这几种方法',
          duration: '04:06',
          percent: 30

        }
      ]
    };
  },
  mounted () {
    // this.$store.dispatch('setWhichpage', '首页');
    // // 返回登录页面
    // if (!this.isLogin) {
    //   this.$router.push({ path: '/login' });
    // }
    this.setGoodsDetailAll();
  },
  methods: {
    setGoodsDetailAll: function () {
      this.$http.get('/datainter/dataFillServlet?tradeType=23').then(res => {
        console.log(res);
        this.$store.dispatch('setGoodsDetailAll', res.data);
      });
    }
  }
};
</script>
<style lang="less">
@import '../../../less/base.less';
@import '../../../less/tool.less';
.audio-list {
  width: 690/@rem;
  padding: 0 30/@rem;
  border-top: 1px solid rgba(216,216,216,1);
  .audio-item {
    width: 690/@rem;
    height: 142/@rem;
    border-bottom: @border;
    .icon-play {
      width: 54/@rem;
      height: 54/@rem;
      background: @color-soft;
      border-radius: 50%;
      .wave-icon{
        width: 20/@rem
      }
      .iconfont {
        color: white;
        .fontSize(22);
      }
      ;
    }
    .icon-paused {
      width: 54/@rem;
      height: 54/@rem;
      background: rgba(170, 170, 170, 1);
      box-shadow: 0px 2px 4px 0px rgba(214, 214, 214, 0.5);
      border-radius: 50%;
      .iconfont {
        color: white;
        .fontSize(22);
      }
      ;
    }
    .content-bar {
      width: 626/@rem;
      height: 92/@rem;
      padding-left: 20/@rem;
      box-sizing: border-box;
      text.onplay {
        color: #fff
      }
      .info-bar {
        width: 100%;
      }
      .duration {
        width: 200/@rem;
        .iconfont {
          color: @color-weak;
          .fontSize(24);
        }
      }
      .already {
        width: 200/@rem;
        text-align: right;
      }
    }
  }
}
</style>