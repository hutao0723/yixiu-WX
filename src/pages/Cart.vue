<template>
  <div class="cart-page">
    <router-view></router-view>
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
    // this.$store.dispatch('setWhichpage', '购物车');
    // // 返回登录页面
    // if (!this.isLogin) {
    //   this.$router.push({ path: '/login' });
    // }
  }
};
</script>
