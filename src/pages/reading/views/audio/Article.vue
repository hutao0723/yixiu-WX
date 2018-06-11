<template>
  <div class="article-main" v-html="article">
  </div>
</template>

<script>
import { mapState } from 'vuex';
import play from '../../api/play'
export default {
  data () {
    return {
      article: ''
    };
  },
  computed: {
    ...mapState({})
  },
  mounted () {
    this.getCourseSketch()
  },
  methods: {
    async getCourseSketch () {
      this.article = (await play.getCourseSketch(this.$route.params.courseId)).sketch;
    }
  }
};
</script>

<style lang="less">
@import '../../less/variable';
.article-main {
  width: 750/@rem;
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  padding-top: 20/@rem;
  background: #fff;
  font-size: 24/@rem;
  img {
      width: 100% !important;
    }
}
</style>

