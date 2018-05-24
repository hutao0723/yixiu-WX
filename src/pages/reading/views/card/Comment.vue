<template>
  <div class="comment-main">
    发表评论
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  components: {
  },
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
.comment-main {
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
  // z-index: 9;
  background: #fff;
  font-size: 24/@rem;
  .icon-nav{
    height: 480/@rem;
    border: 1px solid #ccc;
  }
}
</style>

