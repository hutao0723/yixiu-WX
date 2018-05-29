<template>
  <div class="journey-main">
    <div v-if="!noData">
      <div class="module" v-for="(item, $index) in journeyList">
        <div class="date">{{item.releaseTime}}</div>
        <div class="text-box">
          <div class="text-journal" v-if="item.diploma"><span>{{item.readName}}{{item.readStageNum}}期毕业</span>

            <router-link :to="{ path: '/look/' + item.readId}"><span class="look">查看证书></span></router-link>
          </div>
          <div class="text-container clearfix">
            <div class="container">
              <div  class="content" ref="cheight" :class="item.expand?'h131':''">{{item.content}}</div>
              <div v-if="item.line"> 
                <div class="letter" v-if="(item.letter == 1 )&& (item.expand)" @click.stop="handleChange(item)">全部</div>
                <div class="letter" v-if="(item.letter == 2 )&& (!item.expand)" @click.stop="handleChange(item)">收起</div>
              </div>
            </div>
            <div class="clearfix book" :class="item.content?'btop':''">
              <div class="fl book-img"><img :src="item.courseUrl"></div>
              <div class="book-content">
                <div class="book-title">{{item.courseTitle}}</div>
                <div class="book-writer">{{item.courseAuthor}}</div>
              </div>
            </div>
            <div class="row operate fr">
              <router-link :to="{ path: '/poster/' + item.id}">
                <div class="column-center operate-share">
                  <i class="iconfont icon-share"></i>
                </div>
              </router-link>
              <div class="row">
                <span class="operate-num">{{item.praiseCount}}</span>
              </div>
              <div class="column-center" @click.stop="thumbsUp(item,$index)">
                <i class="iconfont icon-heart" :class="(item.userPraise==0) ? '':'zan' "></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="no-shelf">
          <div class="shelf-container">
            <img src="https://yun.dui88.com/yoofans/images/201805/read/past.png">
          </div>
          <div class="shelf-word">啊哦，暂无历程哟~</div>
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
      // contentHeight: 130,
      noData: false,
      journeyList: [],
      expandStatus: []
    };
  },
  computed: {
    ...mapState({})
  },
  created() {
  },
  async mounted () {
    await this.getJourneyInfo();
    this.init();
  },
  methods: {
    async getJourneyInfo (){
      let objs = await user.getJourneyList();
      if (objs.success) {
        this.journeyList = objs.data;
        if(!this.journeyList.length) {
          this.noData = true
          return
        }
        this.journeyList.forEach((item,index)=>{
          // 获取时间
          this.journeyList[index].releaseTime = item.releaseTime.substring(0,4) +"."+ item.releaseTime.substring(5,7) + "." + item.releaseTime.substring(8,10)
        })
      }else{
        console.log("获取数据失败")
      }
      
    },
    async thumbsUp(row,index) {
      let praise = row.userPraise == 0 ? 1 : 0
      let objs = await user.getThumbUp(praise,row.id);
      if (objs.success) {
        if(praise){
          this.journeyList[index].praiseCount += 1
        }else{
          this.journeyList[index].praiseCount -= 1
        }
        // await this.getJourneyInfo();
        // this.init();
        this.journeyList[index].userPraise = praise
      }else{
        console.log("获取数据失败")
      }
      
    },
    init() {  
      if(!this.journeyList.length) {
        this.noData = true
        return
      }
      this.journeyList.forEach((item,index)=>{
        let multiple = 750/document.body.clientWidth;
        // 131为三行字体的高度
        let originalOffsetY = 131/multiple;
        let valueHeight = this.$refs.cheight[index].getBoundingClientRect().height;
        if(valueHeight > originalOffsetY){
          // line属性是否展示全部收起这个容器
          this.$set(this.journeyList[index],'line', true)
          // letter初始化展示收起的的状态默认是全部为1，收起是2
          this.$set(this.journeyList[index],'letter', 1)
          // 全部和收起默认是true的状态显示
          this.$set(this.journeyList[index],'expand', true)
          // 全部都为展开的状态
          this.expandStatus[item.id] = true
        }else{
          // line属性是否展示全部收起这个属性
          this.$set(this.journeyList[index],'line', false)
        }
        
      })
    },
    formatDateNew(date) {
      if (!date) return '';
      if (typeof date !== 'object') {
        date = new Date(date);
      }
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = ('0' + month).slice(-2);
      day = ('0' + day).slice(-2);
      return year + '-' + month + '-' + day;
    },
    handleChange(row){
      if(this.expandStatus[row.id] == true){
        this.expandStatus[row.id] = !row.expand
        this.$set(row,'letter', 2)
      }else{
        this.expandStatus[row.id] = !row.expand
        this.$set(row,'letter', 1)
      }
      this.$set(row,'expand', this.expandStatus[row.id])
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
      margin-bottom: 30/@rem;
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
        width: 55/@rem;
        padding-top: 14/@rem;
      }
      .book{
        margin-top: 16/@rem;
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
        a{
          color: #949494;
        }
        .operate-share{
          margin-right: 30/@rem;
        }
        .operate-num{
          .fontSize(26);
          width: 30/@rem;
          margin-right: 13/@rem;
        }
        .iconfont{
          .fontSize(26);
        }
        .zan{
          color:rgba(255,76,76,1);
        }
      }
      .h131{
        height: 131/@rem;
      }
      .hauto{
        height:auto;
      }
      .btop{
        border-top: 1/@rem solid #D6D6D6;
      }
    }
  }
  .no-shelf{
    .shelf-container{
      img{
        width: 310/@rem;
        height: 310/@rem;
        display: block;
        margin: 100/@rem auto 50/@rem;
      }
    }
    .shelf-word{
      text-align: center;
      .fontSize(32);
      color: #888;
    }
}



  
}

  
</style>

