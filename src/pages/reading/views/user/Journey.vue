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
            <div class="content" ref="cheight" :class="item.expand?'h131':''">{{item.contentText}}</div>
            <div v-if="item.line"> 
              <div class="letter" v-if="(item.letter == 1 )&& (item.expand)" @click.stop="handleChange(item)">全部</div>
              <div class="letter" v-if="(item.letter == 2 )&& (!item.expand)" @click.stop="handleChange(item)">收起</div>
            </div>
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
            <div class="column-center" @click.stop="thumbsUp(item)">
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
      // contentHeight: 130,
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
      let objs = await user.getJourneyList(1);
      this.journeyList = objs.content;
    },
    thumbsUp(row) {
      // let objs = user.getThumbUp(row.ZanStatus);
      // if(objs.success){
      //   row.row.ZanStatus = !row.ZanStatus
      // }
      console.log("点赞")
      
    },
    init() {  
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
        width: 55/@rem;
        padding-top: 14/@rem;
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
      .h131{
        height: 131/@rem;
      }
      .hauto{
        height:auto;
      }
    }
  }




  
}

  
</style>

