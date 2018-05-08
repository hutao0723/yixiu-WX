<template>
  <div class="audio-page">
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
    // this.$store.dispatch('setWhichpage', '首页');
    // // 返回登录页面
    // if (!this.isLogin) {
    //   this.$router.push({ path: '/login' });
    // }
    this.setGoodsDetailAll();
  },
  methods: {
    setGoodsDetailAll: function () {
      this.$http.get('/datainter/dataFillServlet?tradeType=23').then(res => {
        console.log(res);
        this.$store.dispatch('setGoodsDetailAll', res.data);
      });
    }
  }
};
</script>
