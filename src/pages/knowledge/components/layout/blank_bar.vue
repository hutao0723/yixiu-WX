<template>
  <div class="blank-bar" :style="{width: blankWidth,height: blankHeight,background: param.blankFillColor,margin: '0 auto'}" :monitor-log="getMonitor()">
  </div>
</template>
<script>
  export default {
    props: {
      param: {}
    },
    computed: {
      blankWidth: function (val) {
        return (this.param.blankWidth) / 75 + 'rem'; 
      },
      blankHeight: function (val){
        return (this.param.blankHeight) / 75 + 'rem';
      }
    },
    async mounted () {
    },
    methods: {
      getMonitor () {
        return JSON.stringify({'dcm': 'blank','dpm': '1.1.1','url': '1111'});
      }
    },
    mixins: []
  }
</script>

<style lang="less">
</style>
