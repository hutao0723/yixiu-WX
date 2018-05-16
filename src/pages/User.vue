<template>
  <div class="store-page">
    <router-view></router-view>
    <bnav></bnav>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import bnav from 'components/layout/Nav';
import AudioBar from 'components/basic/Audio_Bar';
export default {
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  created() {
      this.wxShare()
    },
  mounted () {
  
  },
  components: { bnav}
};
</script>
