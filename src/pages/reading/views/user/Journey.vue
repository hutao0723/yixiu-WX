<template>
  <div class="main" ref="journeymain">
    <div class="journey-main">
      <div v-if="!noData" >
        <div class="module" v-for="(item, $index) in journeyList" :style="item.content?'':'display:none'">
          <div class="date">{{item.releaseTime}}</div>
          <div class="text-box">
            <div class="text-journal" v-if="item.diploma"><span class="otw-title">{{item.readName}}{{item.readStageNum}}期毕业</span>

              <router-link :to="{ path: '/look/' + item.readId}"  @click.native="clickFun($event)" :monitor-log="getMonitor('8001.'+item.readId+'.0.'+item.courseId, '826.0.3')"><span class="look">查看证书></span></router-link>
            </div>
            <div class="text-container clearfix">
              <div class="content-container">
                <div  class="content" ref="cheight" :class="item.expand?'h132':''">{{item.content}}</div>
                <div v-if="item.line">
                  <div class="letter" v-if="(item.letter == 1 )&& (item.expand)" @click.stop="handleChange(item)">全部</div>
                  <div class="letter" v-if="(item.letter == 2 )&& (!item.expand)" @click.stop="handleChange(item)">收起</div>
                </div>
              </div>
              <div class="clearfix book" :class="item.content?'btop':''">
                <div class="fl book-img"><img :src="item.courseVerticalCover || frontImgUrl"></div>
                <div class="book-content">
                  <div class="book-title">《{{item.courseTitle}}》</div>
                  <div class="book-writer" v-if="item.courseAuthor">{{item.courseAuthor}} 著</div>
                </div>
              </div>
              <div class="row operate fr">
                <div class="column-center operate-share" @click="clickFun($event,goPoster,item)" :monitor-log="getMonitor('8001.'+item.readId+'.0.'+item.courseId, '826.0.1-'+ $index)">
                  <i class="iconfont icon-share"></i>
                </div>
                <div class="column-center" :class="point?'point':''"   @click.stop="clickFun($event,thumbsUp,{item:item,index:$index})" :monitor-log="getMonitor('8001.'+ item.readId +'.0.'+item.courseId, '826.0.2-' + $index)">
                  <i class="iconfont" :class="(item.userPraise==0) ? 'icon-dianzan':'icon-heart zan'"></i>
                </div>
                <div class="row">
                  <span class="operate-num">{{item.praiseCount == 0 ?"": item.praiseCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="no-shelf">
          <div class="shelf-container">
            <img src="https://yun.dui88.com/yoofans/images/201805/read/journey.png">
          </div>
          <div class="shelf-word">快去写感想，丰富你的历程~</div>
        </div>
      </div>
    </div>
    <AudioBar :monitorlog="getMonitor('0.0.0.0', '826.1.0')"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import user from '../../api/user';
import AudioBar from '../../components/basic/Audio_Bar';

export default {
  components: {
    AudioBar
  },
  data () {
    return {
      data: {},
      // contentHeight: 130,
      noData: false,
      journeyList: [],
      expandStatus: [],

      // 统计内容为空的数据条数
      contentNum: 0,

      flag: false,
      point: false,

      frontImgUrl: "http://yun.dui88.com/youfen/images/read_course_none.png"
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
    let self = this;
    self.$nextTick(function () {
      setTimeout(() => {
        window.monitor && window.monitor.showLog(self);
        self.$refs.journeymain.addEventListener('scroll', self.dispatchScroll, false);
      }, 100)
    })
  },
  methods: {
    // 获取monitor
    getMonitor(dcm,dpm) {
      // item tabindex dpmc
      return JSON.stringify({
        'dcm': dcm,
        'dpm': '157.' + dpm,
      });
    },
    // 触发滚动
    dispatchScroll () {
      window.monitor && window.monitor.showLog(this);
    },
    async getJourneyInfo (){
      let objs = await user.getJourneyList();
      if (objs.success) {
        this.journeyList = objs.data

      
        if(!this.journeyList.length) {
          this.noData = true
          return
        }
        this.journeyList.forEach((item,index)=>{
          // 获取时间
          if(parseInt(item.releaseTime.substring(5,7)) < 10){
            if(parseInt(item.releaseTime.substring(8,10)) < 10){
              this.journeyList[index].releaseTime = item.releaseTime.substring(0,4) +"."+ item.releaseTime.substring(6,7) + "." + item.releaseTime.substring(9,10)
            }else{
              this.journeyList[index].releaseTime = item.releaseTime.substring(0,4) +"."+ item.releaseTime.substring(6,7) + "." + item.releaseTime.substring(8,10)
            }
          }else{
            if(parseInt(item.releaseTime.substring(8,10)) < 10){
              this.journeyList[index].releaseTime = item.releaseTime.substring(0,4) +"."+ item.releaseTime.substring(5,7) + "." + item.releaseTime.substring(9,10)
            }else{
              this.journeyList[index].releaseTime = item.releaseTime.substring(0,4) +"."+ item.releaseTime.substring(5,7) + "." + item.releaseTime.substring(8,10)
            }
          }
        })
      }else{
        console.log("获取数据失败")
      }

    },
    async thumbsUp(obj) {
      this.point = true
      let praise = obj.item.userPraise == 0 ? 1 : 0
      let objs = await user.getThumbUp(praise,obj.item.id);
      if (objs.success) {
        if(praise){
          this.journeyList[obj.index].praiseCount += 1
        }else{
          this.journeyList[obj.index].praiseCount -= 1
        }
        // await this.getJourneyInfo();
        // this.init();
        this.journeyList[obj.index].userPraise = praise
        this.point = false
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
          // 获取时间
        if(!this.journeyList[index].content){
          this.contentNum += 1
        }
      })
      if(this.contentNum == this.journeyList.length ){
        this.noData = true
        return
      }
      this.journeyList.forEach((item,index)=>{
        let multiple = 750/document.body.clientWidth;
        // 131为三行字体的高度
        let originalOffsetY = 132/multiple;
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
    },
    goPoster(item){
      if(item.posterType == "H5"){
        this.$router.push({name:'share',query:{commentId:item.id,lastClock:0,isClock:1}})
      }else{
        this.$router.push({name:'poster',query:{commentId:item.id,lastClock:0,isClock:1}})
      }
    }
  }
}
</script>

<style lang="less">
@import '../../less/variable';
@import '../../less/base';
@import '../../less/icon';
.main{
  width: 750/@rem;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.point{
  pointer-events: none;
}
.journey-main{
  padding: 41/@rem 33/@rem 0 50/@rem;
  max-height: 9999px;
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
      .otw-title{
        float: left;
        width: 6rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
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
      .content-container {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
            justify-content: center;
        -ms-flex-direction: column;
            flex-direction: column;
      }
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
            color:#555;
            .fontSize(26);
            width: 460/@rem;
            margin-left: 80/@rem;
            margin-top: 3/@rem;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
        height: 27/@rem;
        a{
          color: #949494;
        }
        .operate-share{
          margin-right: 50/@rem;
        }
        .operate-num{
          .fontSize(26);
          width: 45/@rem;
          margin-left: 8/@rem;
        }
        .iconfont{
          .fontSize(26);
        }
        .zan{
          color:rgba(255,76,76,1);
        }
      }
      .h132{
        height: 132/@rem;
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
        margin: 90/@rem auto 50/@rem;
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

