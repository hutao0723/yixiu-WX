<template>
  <div class="home-main" ref="homeMain">
    <AudioBar/>
    <bnav></bnav>
  </div>
</template>

<script>
import bnav from '../../components/basic/Nav';
import AudioBar from '../../components/basic/Audio_Bar';
import { mapState } from 'vuex';
export default {
  components: {
    AudioBar, bnav
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
.home-main {
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

