export default {
  // 设置是否在加载
  SET_LOADING (state, platform) {
    state.isLoading = platform;
  },
  // 设置是否登录
  SET_LOGIN (state, platform) {
    state.isLogin = platform;
  },
  // 设置用户名
  SET_USERNAME (state, platform) {
    state.username = platform;
  },
  // 设置当前所在页面标记
  SET_WHICHPAGE (state, platform) {
    state.whichPage = platform;
  },
  SET_Avator (state, url) {
    state.avator = url;
  },
  SET_LOGINOUT (state, self) {
    state.username = '';
    state.isLogin = false;
    state.isLoading = false;
    state.avator = '';
    self.$cookie.delete('_dragon_sea');
    self.$cookie.delete('_coll_ci');
    window.MailaApp && window.MailaApp.logout();
  },
  SET_USERTYPE (state, status) {
    state.isOldUser = status;
  },
  SET_GOODSALL (state, data) {
    state.goodsAll = data;
  },
  SET_STOCKSALL (state, data) {
    state.stocksAll = data;
  },
  SET_GOODSDETAILALL (state, data) {
    state.goodsDetailAll = data;
  },
  SET_SHOPID (state, data) {
    state.shopId = data;
  },
  SET_CONFIRMORDER (state, data) {
    state.confirmOrder = data;
  }
};
