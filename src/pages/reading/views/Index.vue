<template>
  <div class="index-main">
    <bnav></bnav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import bnav from '../components/basic/Nav';
export default {
  components: {
    bnav
  },
  data () {
    return {
    }
  },
  methods: {
  },
  mounted() {
  },
  beforeDestroy () {
  }
};
</script>

<style lang="less">
</style>
