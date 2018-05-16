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
import {
  setDPR,
  remChange
} from './components/basic/remChange';
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
    webp(listener, options) {
      listener.src += !options.supportWebp ? '?x-oss-process=image/quality,Q_60' : '?x-oss-process=image/format,webp';
    }
  }
});
// Vue.http.headers.common['tk'] = 'ZEnrPP8wBUNhjtGwV5veCW7i5cZMJs1P2jBFZywQJKhz5taZ15bYWvXKsTESLdD85REaem63opFkazNHBd2XyP3KSkHm9KEqrnUvbWupegBnvCdQ2zNKgk8yNiEh2FCN5wGwwbNjUGp6WFhWJ3uEsAhGe';
Vue.http.interceptors.push((request, next) => {
  // modify request
  // request.url = request.root + request.url;
  // continue to next interceptor
  next((response) => { // 在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    // console.log(response);
    // response.body = '...';
    if (response.data.code == '000001') {
      // const url = '/' + window.location.href.split('/').slice(3).join('/');
      location.href = "/loginH5?dbredirect=/#/home/index";
    }
    return response;
  });
});

Vue.prototype.wxShare = function (title, desc, link) {
  // var link  = encodeURIComponent(link);
  // const url = encodeURIComponent(location.href.split('#')[0]);// 当前url
  // const url = encodeURIComponent(window.location.href.split('#')[0]);
  // const url = location.href.split('#')[0];
  const urlData = `/wechat/getJsapiSignature`;
  const url = location.href;

  Vue.http.get(urlData, {
    params: {
      url: url
    }
  }).then(res => { // 获得签名配置
    var Data = res.data.data;
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
    wx.config({
      debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: Data.appid, // 必填，公众号的唯一标识
      timestamp: Data.timestamp, // 必填，生成签名的时间戳
      nonceStr: Data.noncestr, // 必填，生成签名的随机串
      signature: Number(Data.signature), // 必填，签名，见附录1
      jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'previewImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
  });
  wx.ready(() => {
    // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
    // 则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareAppMessage({ // 分享给朋友
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接 默认以当前链接
      imgUrl: '', // 分享图标
      // 用户确认分享后执行的回调函数
      success: function () {

      },
      // 用户取消分享后执行的回调函数
      cancel: function () {
        console.log('分享到朋友取消');
      }
    });
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: desc,
      link: link,
      imgUrl: '',
      // 用户确认分享后执行的回调函数
      success: function () {

      },
      // 用户取消分享后执行的回调函数
      cancel: function () {
        console.log('分享到朋友圈取消');
      }
    });
  });
};

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
  components: {
    App
  }
});

