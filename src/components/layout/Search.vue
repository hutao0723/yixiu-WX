<template>
  <div class="g-search-link" v-if='isLink'>
    <router-link :to="{ path: '/goodsSearch/0'}">
      <input type="text" class="form-control" v-model="search" placeholder="请输入">
      <a class="search-btn"><i class="iconfont">&#xe699;</i></a>
    </router-link>
  </div>
  <div class="g-search" v-else>
    <input type="text" class="form-control" v-model="search" placeholder="请输入">
    <a class="search-btn" @click="search = ''"><i class="iconfont">&#xe627;</i></a>
    <a class="cancel-btn" @click="cancelFn">取消</a>
  </div>
</template>
<script>
  export default {
    props: {
      isLink: {
        default: true
      },
      search: {
        default: ''
      },
      onSearch: {
        type: Function,
        default: null
      }
    },
    data () {
      return {
      };
    },
    watch: {
      'search': function () {
        this.$emit('update:search', this.search);
        this.onSearch();
      }
    },
    beforeMount () {
    },
    methods: {
      cancelFn () {
        window.history.go(-1);
      }
    }
  };
</script>
<style lang="less">
  @import url('../../assets/style/base/tool.less');
  .g-search-link{
    position: relative;
    padding: 10/@rem 20/@rem;
    .form-control{
      width: 100%;
      height: 48/@rem;
      .fontSize(20);
    }
    .search-btn{
      position: absolute;
      top: 10/@rem;
      right: 40/@rem;
      line-height: 48/@rem;
      color:#999;
    }
  }
  .g-search{
    position: sticky;
    top:-1px;
    padding: 10/@rem 20/@rem;
    background: #fff;
    z-index: 100;
    .form-control{
      width: 90%;
      height: 48/@rem;
      .fontSize(20);
    }
    .search-btn, .cancel-btn{
      position: absolute;
      top: 10/@rem;
      right: 14%;
      line-height: 48/@rem;
      color:#999;
    }
    .cancel-btn{
      right: 4%;
      .fontSize(22);
    }
  }
</style>
