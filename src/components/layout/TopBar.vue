<template>
  <div class="topbar-main clearfix" v-if="$store.getters.getLogin">
    <div class="topbar">
      <p>{{$store.getters.getWhichPage}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    mounted () {},
    methods: {
      clickBack () {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="less">
  @import url('../../assets/style/base/tool.less');
  .topbar-main {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
  .topbar {
    position: relative;
    width: 730/@rem;
    height: 60/@rem;
    line-height: 60/@rem;
    padding: 10/@rem;
    background-color: #f5f5f5;
    .iconfont {
      .fontSize(36);
    }
    .icon-back {
      position: absolute;
      left: 10/@rem;
      top: 10/@rem;
    }
    .icon-category {
      position: absolute;
      right: 10/@rem;
      top: 10/@rem;
    }
    p {
      height: 60/@rem;
      line-height: 60/@rem;
      text-align: center;
      .fontSize(28);
    }
  }
</style>
