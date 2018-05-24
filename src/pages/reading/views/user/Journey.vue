<template>
  <div class="journey-main">
    <div class="module" v-for="(item, $index) in journeyList">
      <div class="date">{{item.dateTime}}</div>
      <div class="text-box">
        <div class="text-journal"><span>{{item.titleName}}</span>
          <router-link :to="{ path: '/lecturer' }"><span class="look">查看证书></span></router-link>
        </div>
        <div class="text-container clearfix">
          <div class="container">
            <div class="content" ref="cheight">{{item.contentText}}</div>
            <div class="expand-collapse"></div>
          </div>
            <div class="clearfix book">
            <div class="fl book-img"><img :src="item.imageUrl"></div>
            <div class="book-content">
              <div class="book-title">《{{item.bookname}}》</div>
              <div class="book-writer">{{item.writor}}</div>
            </div>
          </div>
          <div class="row operate fr">
            <div class="column-center operate-share">
              <i class="iconfont icon-help"></i>
            </div>
            <div class="row">
              <span class="operate-num">{{item.number}}</span>
            </div>
            <div class="column-center" @click="thumbsUp(item.zanStatus)">
              <i class="iconfont icon-help" :class="(item.zanStatus === 0) ? '':'zan' "></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import user from '../../api/user';
export default {
  components: {
  },
  data () {
    return {
      data: {},
      contentHeight: 130,
      journeyList:[
        {
          "dateTime": '2018.05.20',
          "titleName": "100天魔鬼读书训练营36期毕业",
          "contentText": "我们曾经都是文艺青年，而原来文艺青年们，现在都已经不玩儿憔悴了。所以她有圆圆脸，我有小肚腩。以为拼尽全力，就能杀进红尘，但从前我们不知道，红是世界的，尘是自己的，没有阳光的季节。 ",
          "imageUrl": 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=768904644,500415380&fm=27&gp=0.jpg',
          "bookname": "追风筝的人",
          "writor": "卡勒德·胡赛尼",
          "number": 16
        }
      ]
    };
  },
  computed: {
    ...mapState({})
  },
  created() {
  },
  async mounted () {
    await this.getJourneyInfo();
    this.showAll();
    // this.init();
  },
  methods: {
    async getJourneyInfo (){
      let objs = await user.getJourneyList(1);
      this.journeyList = objs.content;
    },
    async thumbsUp(status) {
      let objs = await user.getThumbUp(status);
      this.journeyList = objs.content;
    },
    init() {  
      // const self = this;  
      // this.journeyList.forEach(item=>{
      //   item['checked'] = true;
      // })
    },
    showAll() {
      
    }
  }
};
</script>

<style lang="less">
@import '../../less/variable';
@import '../../less/base';
@import '../../less/icon';
.journey-main{
  padding: 41/@rem 33/@rem 0 50/@rem;
  .module{
    .date{
      position: relative; 
      height: 42/@rem;
      padding: 0 0 0 24/@rem;
      .fontSize(30);
      color: @color-strong;
      &:before{
        content: "";
        background-color: #B7B7B7;
        position: absolute;
        top: 8/@rem;
        left: -9/@rem;
        width: 20/@rem;
        height: 20/@rem;
        border-radius: 50%;
      }
    }
    .text-box{
      padding: 20/@rem 0 30/@rem 24/@rem;
      border-left-width: 3/@rem;
      border-left-style: solid;
      border-left-color: #B7B7B7;
    }
    .text-journal{
      width: 630/@rem;
      height: 83/@rem; 
      background: rgba(243,243,243,1);
      border-radius: 8/@rem ; 
      line-height: 83/@rem;
      box-sizing: border-box;
      padding-left: 22/@rem;
      .fontSize(30);
      .look{
        color: #FF4C4C;
        .fontSize(26);
      }
    }
    .text-container{
      width: 630/@rem;
      background: #F3F3F3;
      border-radius: 8/@rem;
      padding: 25/@rem 35/@rem 25/@rem 29/@rem ;
      box-sizing: border-box;
      margin-top: 30/@rem;
      .content{
        .fontSize(30);
        line-height: 42/@rem;
        letter-spacing: 1/@rem;
        //max-height: 130/@rem;
        overflow: hidden;
        &:first-letter{
          .fontSize(44)
        }
      }
      .letter{
        .fontSize(26);
        color: #4A669D;
        padding-top: 14/@rem;
      }
      // .collapse .content::after{
      //       content: ' ... ';
      //       position: absolute;
      //       right: 0;
      //       bottom: 0;
      //       background: linear-gradient(to right, transparent, #ffffff 50%);
      //       padding-left: 20px;
      //   }

        .collapse .expand-collapse::after{
            content: '展开';
            display: block;
            color: #4A669D;
            width: 100%;
            text-align: left;
            .fontSize(26);
            margin-top: 10/@rem;
        }

        .expand .expand-collapse::after{
            content: '收缩';
            display: block;
            color: #4A669D;
            width: 100%;
            text-align: left;
            .fontSize(26);
            margin-top: 10/@rem; 
        }

        .collapse .content{
            overflow: hidden;
            height: 130/@rem;
            padding: 0;
            margin: 0;
        }
      .book{
        margin-top: 16/@rem;
        border-top: 1/@rem solid #D6D6D6;
        margin-bottom: 17/@rem;
        padding-top: 24/@rem;
        padding-left: 5/@rem;
        .book-img{
          img{
            box-sizing: border-box;
            width: 64/@rem; 
            height: 88/@rem;
            border-radius: 5/@rem;
          }
        }
        .book-content{
          color: #7F7F7F;
          .book-title{
            .fontSize(26);
            margin-left: 80/@rem;
            margin-top: 3/@rem;
          }
          .book-writer{
            .fontSize(24);
            margin-top: 10/@rem;
            margin-left: 93/@rem;
          }
        }
      }
      .operate{
        color: #949494;
        .operate-share{
          margin-right: 30/@rem;
        }
        .operate-num{
          .fontSize(26);
          margin-right: 13/@rem;
        }
        .iconfont{
          .fontSize(26);
        }
        .zan{
          color:rgba(255,76,76,1);
        }
      }
    }
  }




  
}

  
</style>

