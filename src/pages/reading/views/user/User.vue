<template>
  <div class="user">
    <div class="person-main">
      <div class="person-box">
        <div class="info">
            <div class="fl"><img :src="imageUrl" class="info-icon" /></div>
            <div class="info-text fl">{{personname}}</div>
        </div>
      </div>
      <ul class="number clearfix row-around">
            <li class="column">
              <div><span class="word">{{day ? day : 0}}</span>天</div>
              <div class="text">坚持打卡</div>
            </li>
            <li class="column">
              <div><span class="word">{{minute ? minute : 0}}</span>{{time}}</div>
              <div class="text">累计精听</div>
            </li>
            <li class="column">
              <div><span class="word">{{book ? book : 0}}</span>本</div>
              <div class="text">累计阅读</div>
            </li>
        </ul>
      <router-link :to="{ path: '/personal/share/poster' }">
        <div class="mt20 recommend bgfff">
            <img :src="recommendUrl">
            
        </div>
      </router-link>
      <router-link :to="{ path: '/journey' }">
        <div class="bgfff">
          <div class="person-h90 row mt20 border" >
            <div class="icon-box column-center">
              <i class="iconfont icon-wodelicheng person-icon"></i>
            </div>
            <div class="row ft28 ml30 ftbold">我的历程</div>
          </div>
        </div>
      </router-link>
      <router-link :to="{ path: '/shelf' }">
        <div class="bgfff">
          <div class="person-h90 row border">
            <div class="icon-box column-center">
              <i class="iconfont icon-booklist person-icon"></i>
            </div>
            <div class="row ft28 ml30 ftbold">往期书架</div>
          </div>
        </div>
      </router-link>
      <router-link :to="{ path: '/lecturer' }">
        <div class="bgfff">
          <div class="person-h90 row border" >
            <div class="icon-box column-center">
              <i class="iconfont icon-teacher person-icon"></i>
            </div>
            <div class="row ft28 ml30 ftbold">我的老师</div>
          </div>
        </div>
      </router-link>
      <router-link :to="{ path: '/personal/share' }">
        <div class="bgfff">
          <div class="person-h90 row " >
            <div class="icon-box column-center">
              <i class="iconfont icon-income person-icon"></i>
            </div>
            <div class="row ft28 ml30 ftbold">我的收益</div>
          </div>
        </div>
      </router-link>
      <div class="bgfff" @click="contactToggle = true">
        <div class="person-h90 row mt20" >
          <div class="icon-box column-center">
            <i class="iconfont icon-ear person-icon"></i>
          </div>
          <div class="row ft28 ml30 ftbold" @click="contactToggle = true">联系客服</div>
        </div>
      </div>
    </div>
    <Contact v-show="contactToggle" v-on:success="success"/>
    <bnav></bnav>
    <AudioBar/>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import Contact from '../../components/basic/Contact';
import AudioBar from '../../components/basic/Audio_Bar';
import bnav from '../../components/basic/Nav';
// import store from '../vuex/store';
import user from '../../api/user';
export default {
  components: {
    Contact,bnav,AudioBar
  },
  data () {
    return {
      data: {},
      contactToggle: false,

      imageUrl: '',
      personname: '',

      day: 0,
      minute: 0,
      book: 0,
      time: "分钟",
      // 分享
      recommendUrl: 'https://yun.duiba.com.cn/yoofans/images/201805/read/share2.png'
    };
  },
  computed: {
    ...mapState({})
  },
  created() {
    },
  async mounted () {
    this.getNumberInfo()
    this.setTitle('一修读书')
    let self = this;
    let userState = await self.getThumbUp();
      self.wxShare(userState.data.userId);
  },
  methods: {
    // 联系客服
    success(){
      this.contactToggle = false;
    },
    async getNumberInfo (){
      let objs = await user.getInfo();
        if (objs.success) {
          this.day = objs.data.clocks;
          this.minute = objs.data.listens > 999?(objs.data.listens/60).toFixed(1): objs.data.listens;
          this.time = objs.data.listens > 999?"小时": "分钟";
          this.book = objs.data.books ? objs.data.books : 0;
          this.personname = objs.data.userNickname;
          this.imageUrl = objs.data.userHeadImgUrl;
        } else {
          console.log("获取用户信息失败")
        }
     
    },
    async getThumbUp() {
        let self = this;
        let params = {};
        params = {

        }
        const url = `/user/read/state`;
        const res = await this.$http.get(url, {
          params
        });
        return res.data;
      },
  }
};
</script>

<style lang="less">
@import '../../less/variable';
@import '../../less/base';
@import '../../less/icon';
// #app{
//   background:rgba(244,244,244,1);
// }
.user{
  background:rgba(244,244,244,1);
  width: 750/@rem;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  z-index:100;
}
.person-main {
  padding-bottom: 240/@rem;
  .person-box{
    width: 750/@rem;
    background: rgba(255,255,255,1);
    box-sizing: border-box;
    padding: 54/@rem 68/@rem 44/@rem  68/@rem;
    .info{
      height: 110/@rem;
      .info-icon{
        height: 110/@rem;
        width: 110/@rem;
        display: block;
        border-radius: 50%;
      }
      .info-text{
        height: 110/@rem; 
        margin-left: 50/@rem;
        .fontSize(40);
        font-weight: bold;
        color: rgba(51,51,51,1);
        line-height: 110/@rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 440/@rem;
      }
    }
  }
  ul.number {
      width: 100%;
      background: #fff;
      padding-bottom: 27/@rem;
      li{
        width: 200/@rem;
        text-align: center;
        // float: left;
        &:first-child{
          margin-left: 20/@rem;
        }
        .word{
          font-weight: bold;
          .fontSize(40);
          margin-right: 8/@rem;
        }
        .text{
          margin-top: 19/@rem;
          color: @color-weak;
          .fontSize(26);
        }
      }
    }
  .recommend{
    padding: 20/@rem 0;
    position: relative;
    img{
      height: 120/@rem;
      width: 690/@rem;
      margin: 0 auto;
      display: block;
    }
    .jiantou{
      position: absolute;
      top: 60/@rem;
      right: 60/@rem;
      text-align: center;
    }
  }
  .person-h90{
    height: 90/@rem;
    margin:0 42/@rem;
    border-radius:0;
    color: @color-strong;
  }
  .ftbold{
    font-weight: bold;
  }
  .ft32{
    .fontSize(32);
  }
  .ft28{
    .fontSize(28);
  }
  .ml30{
    margin-left:30/@rem;
  }
  .mt20{
    margin-top: 20/@rem;
  }
  .bgfff{
    background:rgba(255,255,255,1);
  }
  .border{
    border-bottom: 1/@rem solid #e5e5e5;
  }
  .icon-box{
    width: 34/@rem;
    height: 34/@rem;
  }
  .icon-tri{
    width: 34/@rem;
    height: 34/@rem;
    background: #fff;
    border-radius: 50%;
  }
  .person-icon{
    color: #414141;
    .fontSize(34);
  }
  .ear-icon{
    color: #414141;
    width: 9/@rem;
    height: 9/@rem;
    border-top: 2/@rem solid #414141;
    border-right: 2/@rem solid #414141;
    transform: rotate(45deg);
    margin-left: -5/@rem;
  }
}

</style>

