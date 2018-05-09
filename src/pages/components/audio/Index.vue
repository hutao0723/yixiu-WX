<template>
  <div class="home-page">
    <div class="audio-page">
      <div class=" banner">
        <img class="course-img" :src="audioData.verticalCover" v-if="audioData.verticalCover && ! audioData.lateralCover"/>
        <img class="course-img-lateral" :src="audioData.lateralCover" v-if="audioData.lateralCover"/>
        <img class="course-img-lateral" src="https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-column-cover.png" v-if="!audioData.lateralCover && !audioData.verticalCover"/>
        <span class="xl strong line1 detail-word">{{audioData.title}}</span>
      </div>
      <div class="controler column-between">
        <div class="slider-bar">
          <div></div>
          <div class="row-between timer">
            <span class="xs week row-center">{{currentTime}}</span>
            <span class="xs week row-center">{{durationTime}}</span>
          </div>
        </div>
        <div class="row-between control-bar">
          <button type="primary" class="btn-switch" @click="audioPrev">
            <i class="iconfont icon-shangyiqu" :style="{color: `${!audioData.isPrev ? '#FF9E9A' : '#FF5349'}`}"></i>
          </button>
          <button type="primary" class="btn-play" @click="pauseOrplay">
            <i class="iconfont" :class="audioData.paused ? 'icon-bofang' : 'icon-bofangqi-zanting'"></i>
          </button>
          <button type="primary" class="btn-switch" @tap="audioNext">
            <i class="iconfont icon-xiayiqu" :style="{color: `${!audioData.isNext ? '#FF9E9A' : '#FF5349'}`}"></i>
          </button>
        </div>
        <div class="column-between bottom" :class="!audioData.powerLevel ? 'h214' : 'h120'" :style ="{borderTop: `${!audioData.powerLevel ? 'none' : '1px solid #E5E5E5'}`}">

          <div class="buy-bar row-around" :class="audioData.tryEnd ? 'buy-bar-after' : 'buy-bar-before'" v-if="!audioData.powerLevel">
            <span class="remind nm " v-if="!audioData.tryEnd && audioData.columnId">试听免费课程，购买后收听完整专栏</span>
            <span class="remind nm " v-if="!audioData.tryEnd && !audioData.columnId">免费试听前{{audioData.watchable}}秒，购买后收听完整版</span>
            <span class="remind nm " v-if="audioData.tryEnd">试听结束，购买后收听完整版</span>
            <button type="primary" class="btn-fetch row-center" @tap="goPay">
              直接购买
            </button>
          </div>
          <div class="row-around table" style="">
            <button type="primary" class="column-around btn-bottom" @click="routeToCourse()">
              <i class="iconfont icon-detail"></i>
              <span class="xxs weak">详情</span>
            </button>
            <button type="primary" class="column-around btn-bottom" @click="onShareAppMessage()">
              <i class="iconfont icon-share1"></i>
              <span class="xxs weak">分享</span>
            </button>
            <button type="primary"  class="column-around btn-bottom" @click="routeToAudioList()">
              <i class="iconfont icon-list"></i>
              <span class="xxs weak">播放列表</span>
            </button>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data () {
    return {
      audioData:{
        verticalCover: '',
        lateralCover: '',
        title:'这个时代的终结生活指南',
        isPrev: 1,
        tryEnd: 1,
        powerLevel: 0,
        watchable: 1,
        columnId: 1,
      },
      currentTime: '03:20',
      durationTime: '09:30',
      option: {}
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
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
    },
    audioPrev () {
    },
    pauseOrplay (){
    },
    audioNext (){
    },
    goPay(){},
    routeToCourse(){},
    onShareAppMessage(){},
    routeToAudioList(){}
  }
};
</script>
<style lang="less">
@import '../../../less/base.less';
@import '../../../less/tool.less';
@import '../../../less/icon.less';
 .audio-page{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background: white;
    width: 690/@rem;
    height: 100%;
    padding: 0 30/@rem;
    .banner{
      width: 100%;
      height: 54%;
      position: relative;
      padding: 1/@rem;
      box-sizing: border-box;
      .course-img{
        width: 360/@rem;
        height: 468/@rem;
        display: block;
        margin: 40/@rem auto 0;
        box-shadow: -5/@rem 0/@rem 10/@rem 4/@rem rgba(225,225,225,0.5);
        border-radius: 10/@rem;
      }
      .course-img-lateral{
        width: 494/@rem;
        height: 360/@rem;
        margin: 136/@rem auto 0;
        display: block;
        border-radius: 10/@rem;
        box-shadow: -5/@rem 0/@rem 10/@rem 4/@rem rgba(225,225,225,0.5);
      }
      .detail-word{
        position: absolute;
        text-align: center;
        display: block;
        bottom: 45/@rem;
      }
    }
    .controler{
      height: 46%;
    }
    .slider-bar{
      width: 690/@rem;
    }
    .control-bar{
      width: 414/@rem;
      .btn-switch{
        width: 46/@rem;
        background: white;
        border:none;
        .iconfont{
          font-size: 46/@rem;
        }
      }
      .btn-play{
        display: block;
        width:130/@rem;
        height:130/@rem; 
        line-height: 130/@rem;
        border: 0;
        border-color: transparent;
        background:linear-gradient(90deg,rgba(254,61,52,1),rgba(255,101,77,1));
        border-radius: 50%;
        .iconfont{
          font-size: 46/@rem;
          color: #fff;
        }
      }
    }
    .bottom{
      width: 750/@rem;
      @colorbefore: #FF3E44;
      @colorafter: #FF5F4E;
      &.h214{
        height:214/@rem;
      }
      &.h120{
        height:120/@rem;
      }
      .buy-bar{
        width: 750/@rem;
        height: 94/@rem;
        .btn-fetch{
          width:150/@rem;
          height:56/@rem; 
          border-radius: 45/@rem; 
          font-size: @text-sm;
        }
      }
      .buy-bar-before{
        background: #FFF2EB;
        .remind{
          color: @colorbefore;
        }
        .btn-fetch{
          background:white;
          color: @colorbefore;
        }
      }
      .buy-bar-after{
        background: @colorafter;
        .remind{
          color: white;
        }
        .btn-fetch{
          background:#FFD900;
          color: #FF4000;
        }
      }
      .table{
        width: 100%;
        height: 120/@rem;
        .btn-bottom{
          width: 200/@rem;
          height: 120/@rem;
          background: white;
          border: none;
          .iconfont{
            width: 36/@rem;
            height: 36/@rem;
            font-size: 36/@rem;
            color: #666666;
          }
        }
      }
    }
  }
</style>
