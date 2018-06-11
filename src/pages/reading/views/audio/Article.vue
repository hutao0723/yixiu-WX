<template>
  <div class="article-main">
    <div class="article-box" v-html="article"></div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex';
  import play from '../../api/play'
  export default {
    data() {
      return {
        article: ''
      };
    },
    computed: {
      ...mapState({})
    },
    mounted() {
      this.getCourseSketch()
    },
    methods: {
      async getCourseSketch() {
        this.article = (await play.getCourseSketch(this.$route.params.courseId)).sketch;
      }
    }
  };

</script>

<style lang="less">
  @import '../../less/variable';
  .article-main {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding-top: 20/@rem;
    background: #fff;
    font-size: 24/@rem;
    img {
      width: 100% !important;
    }
    .article-box {
      height: 100%;
      width: 100%;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }

</style>

