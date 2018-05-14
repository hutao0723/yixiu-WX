<template>
  <div class="course-page">
    课程详情
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
    this.setGoodsDetailAll();
  },
  methods: {
    setGoodsDetailAll: function () {
      this.$http.get('/datainter/dataFillServlet?tradeType=23').then(res => {
        this.$store.dispatch('setGoodsDetailAll', res.data);
      });
    }
  }
};
</script>
