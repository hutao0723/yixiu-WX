<template>
  <div class="row goods-nopic-box" @click.stop="routeByIconAction(goods)">
    <div class="main-box row">
      <!--左边栏-->
      <div class="left-bar row-between on-play">
        <div class="icon-fecth column-center" :class="(audio.columnId == goods.columnId || audio.courseId == goods.courseId) ? 'icon-play' : 'icon-paused'">
          <img class="" src="https://yun.dui88.com/youfen/images/audio.svg" v-if="audio.columnId == goods.columnId || audio.courseId == goods.courseId" />
          <i class="iconfont icon-bofang" v-else></i>
        </div>
        <span class="nm line1 title" :class="(audio.columnId == goods.columnId || audio.courseId == goods.courseId) ? 'soft' : 'strong'">{{goods.title}}</span>
      </div>
      <!--右边栏-->
      <div class="right-bar">
        <span class="xs week line1 c999">{{goods.duration}}</span>
      </div>
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex';
  import router from '../../../mixins/router';
  export default {
    props: {
      goods: {}
    },
    computed: {
      ...mapState(['audio'])
    },
    methods: {
    },
    mixins: [router]
  }
</script>

<style lang="less">
  @import "../../../less/variable";
  .goods-nopic-box{
    @size: 40/@rem;
    align-items: center;
    padding: 10/@rem 0;
    .main-box{
      height: @size;
      flex: 1;
      .left-bar{
        width: 620/@rem;
        height: @size;
        .icon-fetch{
          width: @size;
          height: @size;
          background:rgba(255,62,68, 1);
          border-radius: 50%;
          .iconfont{
            color: white;
            font-size: @text-xxs;
          };
        }
        .icon-play{
          width: 40/@rem;
          height: 40/@rem;
          border-radius: 50%;
          background:rgba(255,70,74,1);
          .iconfont{
            color: white;
            font-size: 16/@rem;
          };
        }
        .icon-paused{
          width: 40/@rem;
          height: 40/@rem;
          background:rgba(255,255,255,1);
          box-shadow: 0px 2px 17px 0px rgba(164,164,164,0.5);
          border-radius: 50%;
          .iconfont{
            color: rgba(255,70,74,1);
            font-size: 16/@rem;
          };
        }
        .title{
          width: 560/@rem;
        }
      }
      .right-bar{
        width: 70/@rem;
        height: @size;
        align-items: flex-end;
        span{
          display: block;
          width: 100%;
          height:@size; 
          line-height: @size;
          text-align: right;
        }
      }
    }
    .c999{
      color: #999;
    }
  }
</style>
