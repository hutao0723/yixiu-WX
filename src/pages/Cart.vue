<template>
  <div class="cart-page">
    <router-view></router-view>
    <bnav></bnav>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import bnav from 'components/layout/Nav';

export default {
  computed: {
   
  },
  mounted () {
  },
  components: { bnav }
};
</script>
