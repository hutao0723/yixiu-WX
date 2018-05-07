<template>
  <div class="section-title clearfix">
    <div class="title fl">
      <span class="titlt-bg"></span>{{title}}
    </div>
    <div class="more fr" @click="moreCb" :class="{'more-link': moreCb}">
      {{more}}
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
        default: ''
      },
      more: {
        type: String,
        required: true,
        default: ''
      },
      moreCb: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
      };
    },
    methods: {
    }
  };
</script>
<style lang="less">
  @import url('../../assets/style/base/tool.less');

  .section-title{
    padding: 5px 20px;
    background-color: #f5f5f5;
    line-height: 60/@rem;
    .more-link{
      color: #0173d2;
    }
    .titlt-bg{
      display: inline-block;
      width: 8/@rem;
      height: 24/@rem;
      background-color: rgb(255, 155, 67);
      margin-right: 10/@rem;
    }
  }
</style>
