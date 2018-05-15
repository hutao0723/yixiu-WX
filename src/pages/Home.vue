<template>
  <div class="home-page">
    <router-view></router-view>
    <bnav></bnav>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import bnav from 'components/layout/Nav';
export default {
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  mounted () {
  },
  methods: {
  },
  components: { bnav }
};
</script>
