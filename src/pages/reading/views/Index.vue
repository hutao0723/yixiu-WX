<template>
  <div class="index-main">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  components: {
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
.index-main{
  position: fixed;
}
</style>
