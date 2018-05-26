<template>
  <div class="swiper-bar">
    <Swipe class="index_banner my-swipe" @indexChange='newChangeSwiper' :showIndicators="true">
      <swipeItem v-for="(item, index) in param"  class="slide" :class="'slide' + index">
        <a href="javascript:;" class="swiper-train">
          <div class="journal">
            <div class="clearfix">
              <div class="journal-title fl">{{item.title}}</div>
              <div class="journal-number fr">{{item.stageNum}}期</div>
            </div>
            <div class="journal-content">{{item.briefer}}</div>
          </div>
        </a>
        <!-- <div class="yellow" ref="yellow"></div> -->
      </swipeItem>
    </Swipe>
  </div>
</template>
<script>
  import router from '../../mixins/router';
  import { Swipe, SwipeItem } from '../swipe';
  export default {
    data () {
    return {
      
    };
  },
    components: {
      Swipe,
      SwipeItem
    },
    props: {
      param: Array
    },
    mounted () {
      this.newChangeSwiper()
    },
    methods: {
      success(item) {
        console.log(item);
      },
      
      newChangeSwiper(index){
        if(index == undefined){
          index = 0
        }
        if (this.param && this.param.length){
          this.$emit("newSwiperIndex",this.param[index].id)
        }
      }
    },
    mixins: [router]
  };
</script>
<style lang="less">
@import '../../less/variable';
@import '../../less/base';
@import '../../less/icon';
  .swiper-bar{
    height: 260/@rem;
    // width: 730/@rem;
    border-radius:10/@rem;
  }
  .swiper-train{
    background:rgba(255,229,85,1);
    box-shadow: 0 2/@rem 4/@rem 0 rgba(215,215,215,0.5);
    border-radius: 30/@rem ;
  }
  .yellow{
    position: absolute;
    right:0;
    top: 0;
    width: 30/@rem;
    background-color: yellow;
    height: 260/@rem;
    border-top-left-radius: 30/@rem;
    border-top-right-radius: 30/@rem;
  }
  .journal{
    padding: 40/@rem;
    box-sizing: border-box;
    .journal-title{
      font-weight: bold;
      .fontSize(50);
      color: @color-strong;
    }
    .journal-number{
      width:100/@rem;
      text-align: center;
      height: 30/@rem;
      border-left: 3/@rem solid #333;
      margin-top: 25/@rem;
    }
    .journal-content{
      margin-top: 20/@rem;
      font-weight: bold;
      .fontSize(26);
      color: @color-major;
    }
  }
</style>
