<template>
  <div class="activity-page">
    活动页
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      isLogin: state => state.isLogin
    })
  },
  mounted () {
  },
  methods: {
  }
};
</script>
