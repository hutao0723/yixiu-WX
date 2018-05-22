<template>
  <div class="user-main">
    我的
    <bnav></bnav>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import bnav from '../../components/basic/Nav';
export default {
  components: {
    bnav
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
.opinion-main {
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

