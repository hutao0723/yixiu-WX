<template>
  <div class="article-main">
    文稿
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data () {
    return {
    };
  },
  computed: {
    ...mapState({})
  },
  created() {
    },
  mounted () {
  },
  methods: {
  }
};
</script>

<style lang="less">
@import '../../less/variable';
.article-main {
  width: 750/@rem;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-top: 20/@rem;
  background: #fff;
  font-size: 24/@rem;
}
</style>

