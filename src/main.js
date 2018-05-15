import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import store from './vuex/store';
import VueCookie from 'vue-cookie';
var infiniteScroll = require('vue-infinite-scroll');
Vue.use(infiniteScroll);

import './assets/style/main.less';
Vue.use(VueCookie);
Vue.use(VueResource);
// vue-resource配置项
// Vue.http.options.emulateJSON = true;
// Vue.component(modal.name, modal);
// rem 换算
import { setDPR, remChange } from './components/basic/remChange';
setDPR();
remChange();

// monitor 埋点
// import { monitorHandler } from './components/basic/monitorHandler';
// monitorHandler();

// lazyload 图片懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQAgMAAAD90d5fAAAACVBMVEX6+vrx8fH19fWsTa0SAAAFFElEQVR42uzBgQAAAACAoP2pF6kCAAAAAAAAAAAAgNkzg9w6YSiKXpAslc4974RJV+F0lplV+SEPUVZiReoSWEL3WUH5vWCT0Xt8dZCrKEImeid5xwY7/zP/cbqE++MEjxQw1pAA4LesAWMNiUAnWwIYY0hav22JuCmdCOBlS8JdEQmQPbgrXmIncruU7ERul5JGkfulOHmClBd5gpSf8gwpYiul36vNYCR5Wym+7X7vD+YL9Okvuj/8kleM/AsN+v/IhEfGt7X0PpxNZlLb/SUtEfBkazMSEthBl4gvht7Z/UHkZWIjZ1NIZAejEJLvgmQHgBPCEJIJiSgAV4ohJB0hIGR+BiQ/AzJZrpMJFM8HjoUUJwyH0umBM98JMZPSXULkhJ9uggTAi50UYQoh8XRjNpzDgRA5ycp25glhjKRg+RBiKAXv3zFcQYykMFcQQynUT4i1FOpvIa+tFD1kriB9K0UPiWdI2iYeFjMpwwVEMK5jjlIsIKmClGGV0ZlJYSUQMvcbd5fSf/n2vn1pIPz9uTqWDF/8ds0fmYoecny5+wgJfpeintA9KwQ+mMsydztECoclqyEzpbxJcA/IbPCqJCSCvVsJxbfDRQtJ6E8Q+H0Yh2EtRIDlAEnw0kiZ1ZCA8QCJ4LD2dL8cpQy8/gqeU5wW4q+lZPwjJnQmkFbKtN3ZHzpWkFZKvyrfL20grRRZJKDfh7Wza5RaCgv2UkOCbo9HKezMYgtppWTASwMpBhBKSSDvIB56CKVMxxvotJBBrqSs49PSLMZkcBiilHWYk8tZQijlx1bw8dYarSCUwnXn6nkd1ZCqYkAc/s4B9VOFFeqVApc6dlC5MybgXBI+dZUSCSYQSkmQ1LGBlhDWTP0KOSuRYgGhlJUQu0qJ6A/BlLJDQkclSohvpewQuErJZARhVWS4SkkyglDKdotKLCEsG4BaSVT+n7CVkqlED3HygZT3epXIbAOhFPaOCWYQFqYSWwilsHVMAfQv+bbyymO0J/lrKRnDXRDuHOJJSbKEcA9UsBhDGIBKTCCswwR4KtEseEaupHCVmEMohUqY2RQiAHdcTLCDUAqV6CHLpZRWiUARfy2FSuwhlDIBchOEUnK947eDUMoMZwcZ5VpKjc9Gn9YwwJ/2zRg3QiCGogMSUjjAHIF7+AgUgCinSpFTTLsH2D5HTToX2Eok/nhh9Z+ovMUTO4ztWS/LoeGHS0RTZzvJfPxAgBJd5QyUjKuF1gCIpDMlcpAnvGRLz7YS2xohWU5J+ghJ+p9kfhuJREgqYJz9J7jxv88SIZEAyZYCJBXyj5/tdyjqXxU4yfahJFYyauvWjs7Y0ZS8VtJrcmqIVS8ocXlGSLJR+m4sKaktOSTXR2z5wesV8JL10+WrAqoWoElFnLXmCMkeIVkABQUgARyDtptI8ttIhoiFHyMkXYQkAdOKzxQh6U6csGG3sicIetK1rkTI9ampOR/Ojnus39imu9hFQFCOzil/0FZ8stPgqGEATh7MGsal+oNbw7hOQmy3QF/MLra7QCRPu8pmDQNwmpKs4fP0jkQPWtA+Il6i4ZqQbWq1JQJ9WV7CJXqDpZ1kiJXMd5FMl7iTcr+ny9uMEWlF7pK7euc3AXUjOFFPYOV3wTUSvmTHtkR2eAY3d/i+S3G+e3XjFmU+hNUNq/LOWkkC4TxE2MHdaCePATtZeWzqUPpp3RMhhBBCCCGEEEIIIYQQQgghhBBCCCFX5Qdh54vb3KxxbwAAAABJRU5ErkJggg==',
  attempt: 1,
  filter: {
    webp (listener, options) {
      listener.src += !options.supportWebp ? '?x-oss-process=image/quality,Q_60' : '?x-oss-process=image/format,webp';
    }
  }
});
Vue.http.headers.common['tk'] = 'ZEnrPP8wBUNhjtGwV5veCW7i5cZMJs1P2jBFZywQJKhz5taZ15bYWvXKsTESLdD85REaem63opFkazNHBd2XyP3KSkHm9KEqrnUvbWupegBnvCdQ2zNKgk8yNiEh2FCN5wGwwbNjUGp6WFhWJ3uEsAhGe';
Vue.http.interceptors.push((request, next) => {
  // modify request
  // request.url = request.root + request.url;
    // continue to next interceptor
  next((response) => { // 在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    // console.log(response);
    // response.body = '...';
    return response;
  });
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  next()
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

