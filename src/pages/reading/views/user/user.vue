<template>
  <div class="user">
    <div class="person-main">
      <div class="person-box">
        <div class="info">
            <div class="fl"><img :src="imageUrl" class="info-icon" /></div>
            <div class="info-text fl">{{personname}}</div>
        </div>
        <ul class="number clearfix">
            <li>
              <div><span class="word">{{day}}</span>天</div>
              <div class="text">坚持打卡</div>
            </li>
            <li>
              <div><span class="word">{{minute}}</span>{{time}}</div>
              <div class="text">累计精听</div>
            </li>
            <li>
              <div><span class="word">{{book}}</span>本</div>
              <div class="text">累计阅读</div>
            </li>
        </ul>
      </div>
      <div class="mt20 recommend bgfff">
          <img :src="recommendUrl">
          <div class="icon-tri share column-center jiantou">
              <i class="iconfont ear-icon ear-icon"></i>
          </div>
      </div>
      <router-link :to="{ path: '/journey' }">
        <div class="bgfff">
          <div class="person-h90 row mt20 border" >
            <div class="icon-box share column-center">
              <i class="iconfont icon-clock person-icon"></i>
            </div>
            <div class="row ft32 ml30">我的历程</div>
          </div>
        </div>
      </router-link>
      <router-link :to="{ path: '/shelf' }">
        <div class="bgfff">
          <div class="person-h90 row border">
            <div class="icon-box share column-center">
              <i class="iconfont icon-booklist person-icon"></i>
            </div>
            <div class="row ft32 ml30">往期书架</div>
          </div>
        </div>
      </router-link>
      <router-link :to="{ path: '/lecturer' }">
        <div class="bgfff">
          <div class="person-h90 row" >
            <div class="icon-box share column-center">
              <i class="iconfont icon-user person-icon"></i>
            </div>
            <div class="row ft32 ml30">我的老师</div>
          </div>
        </div>
      </router-link>
      
      <div class="bgfff" @click="contactToggle = true">
        <div class="person-h90 row mt20" >
          <div class="icon-box share column-center">
            <i class="iconfont icon-ear person-icon"></i>
          </div>
          <div class="row ft32 ml30" @click="contactToggle = true">联系客服</div>
        </div>
      </div>
    </div>
    <Contact v-show="contactToggle" v-on:success="success"/>
    <bnav></bnav>
  </div>

</template>

<script>
import { mapState } from 'vuex';
import Contact from '../../components/basic/Contact';
import bnav from '../../components/basic/Nav';
// import store from '../vuex/store';
import user from '../../api/user';
export default {
  components: {
    Contact,bnav
  },
  data () {
    return {
      data: {},
      contactToggle: false,

      imageUrl: 'https://yun.dui88.com/yoofans/images/201804/miniapp/help-center.png',
      personname: '哈哈',

      day: 0,
      minute: 0,
      book: 0,
      time: "分钟",
      // 分享
      recommendUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=768904644,500415380&fm=27&gp=0.jpg'
    };
  },
  computed: {
    ...mapState({})
  },
  created() {
    },
  mounted () {
    this.getNumberInfo()
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
          this.book = objs.data.books;
          this.personname = objs.data.userNickname;
          this.imageUrl = objs.data.userHeadImgUrl;
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
// #app{
//   background:rgba(244,244,244,1);
// }
.user{
  background:rgba(244,244,244,1);
  height: 100%;
}
.person-main {
  
  .person-box{
    width: 750/@rem;
    height: 336/@rem; 
    background: rgba(255,255,255,1);
    box-sizing: border-box;
    padding: 54/@rem 68/@rem 25/@rem  68/@rem;
    .info{
      height: 110/@rem;
      margin-bottom: 44/@rem;
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
      }
    }
    ul.number {
      width: 100%;
      li{
        
        float: left;
        &:first-child{
          margin-left: 20/@rem;
        }
        margin-left: 120/@rem;
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
  }
  .recommend{
    padding: 20/@rem 0;
    position: relative;
    img{
      height: 120/@rem;
      width: 690/@rem;
      margin: 0 auto;
      display: block;
      border-radius: 70/@rem;
    }
    .jiantou{
      position: absolute;
      top: 60/@rem;
      right: 60/@rem;
    }
  }
  .person-h90{
    height: 90/@rem;
    margin:0 42/@rem;
    font-weight: bold;
    border-radius:0;
    color: @color-strong;
  }
  .ft32{
    .fontSize(32);
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
    .fontSize(34);
  }
}

</style>

