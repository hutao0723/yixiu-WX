<template>
  <div class="title-bar">
    <div class="main-box row-between title-padding" v-if="param.layout === 'BASE'" @click="routeByBlockAction(param,getMonitor())" :monitor-log="getMonitor()">
      <span class="xxxl hard weight">{{param.titleName}}</span>
      <div class=" row-center" v-if="param.subTitle">
        <span class="nm weak row-center">{{param.subTitle}}</span>
        <div class="column-center"><i class="iconfont icon-more "></i></div>
      </div>
    </div>
    <div class="main-box row-center border-more" v-if="param.layout == 'CENTER'" @click="routeByBlockAction(param,getMonitor())" :monitor-log="getMonitor()">
      <span class="nm weak row-center">{{param.subTitle || ''}}</span>
      <div class="column-center"><i class="iconfont icon-more "></i></div>
    </div>
  </div>
</template>
<script>
  import router from '../../mixins/router';
  export default{
    props: {
      param: {}
    },
    mounted () {  
    },
    methods: {
      getMonitor () {
        return JSON.stringify({'dcm': this.param.titleName,'dpm': '1.1.1','url': '1111'});
      }
    },
    mixins: [router]
  }
</script>

<style lang="less">
  @import "../../less/variable.less";
  .title-bar{
    background: white;
    .border-more{
      padding: 0 0 16/@rem 0;
      margin: 0/@rem 30/@rem 0 30/@rem;
    }
    .weight{
      font-weight: bold;
    }
    .title-padding{
      padding: 34/@rem 30/@rem 0/@rem 30/@rem;
    }
    .main-box{
      height: 56/@rem;
      .iconfont{
        color: @color-weak;
        font-size: 34/@rem;
      }
    }
  }
</style>
