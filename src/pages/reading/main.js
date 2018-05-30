import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './App';
import router from './router';
import store from './vuex/store';
import VueCookie from 'vue-cookie';
var infiniteScroll = require('vue-infinite-scroll');
Vue.use(infiniteScroll);

// import './less/base.less';
Vue.use(VueCookie);
Vue.use(VueResource);
// vue-resource配置项
// Vue.http.options.emulateJSON = true;
// rem 换算
import {
  setDPR,
  remChange
} from './components/utils/remChange';
setDPR();
remChange();

// // monitor 埋点
// import { monitorHandler } from './components/utils/monitorHandler';
// monitorHandler();

// lazyload 图片懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: 'https://yun.duiba.com.cn/yoofans/images/201804/miniapp/player-column-cover.png',
  attempt: 1,
  filter: {
    webp(listener, options) {
      listener.src += !options.supportWebp ? '?x-oss-process=image/quality,Q_60' : '?x-oss-process=image/format,webp';
    }
  }
});
Vue.http.headers.common['from'] = 'read';
Vue.http.headers.common['tk'] = '4DZvCWSG2VZjmoWt41H6dppeLDEH57kowX4aPDmKRCj8ZCvtX9GD1BkLYawDZWU3mytFEThAbUxgYoDsLSGVdXwpPoDchZnGyMnEVTKiS3QcAZ2Ht9pH8sRbLgX6CQVxH6ZszUt6pLDTdFDNYq8EpDs27xWbyhrFM6Qyr7d5gq3HCZKumRZVy3YKapJYDsivP8RgBwrZ';
Vue.http.interceptors.push((request, next) => {
  // modify request
  // request.url = request.root + request.url;
  // continue to next interceptor
  next((response) => { // 在响应之后传给then之前对response进行修改和逻辑判断。对于token时候已过期的判断，就添加在此处，页面中任何一次http请求都会先调用此处方法
    // response.body = '...';
    if (response.data.code == '000001') {
      if (response.url = '/order/submit') {
        let reqObj = JSON.parse(request.body)
        let o = '/' + window.location.href.split('/').slice(3).join('/')
        const url = encodeURIComponent(o)+ (o.indexOf("？")> -1?'&courseId=' +reqObj.itemId:'?courseId=' +reqObj.itemId);
        location.href = "/loginH5?dbredirect=" + url;
      }else{
        const url = encodeURIComponent();
        location.href = "/loginH5?dbredirect=" + url;
      }

    }
    return response;
  });
});

Vue.prototype.wxShare = function () {
  let msg = {
    title: '我已经坚持在这读书23天了，一起来读书吧！', // 分享标题
    desc: '每天阅读10分钟，培养阅读习惯，成就更好的自己。', // 分享描述
    link: 'http://k.youfen666test.com/reading.html#/index/home', // 分享链接 默认以当前链接
    imgUrl: 'http://yun.dui88.com/youfen/images/read_share.png', // 分享图标
  }
  const urlData = `/wechat/getJsapiSignature`;
  const url = location.href.split("#")[0];

  Vue.http.get(urlData, {
    params: {
      url: url
    }
  }).then(res => { // 获得签名配置
    if (res.data.data) {
      var Data = res.data.data;
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: Data.appid, // 必填，公众号的唯一标识
        timestamp: Number(Data.timestamp), // 必填，生成签名的时间戳
        nonceStr: Data.noncestr, // 必填，生成签名的随机串
        signature: Data.signature, // 必填，签名，见附录1
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'previewImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    }
  });
  wx.ready(() => {
    // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
    // 则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareAppMessage({ // 分享给朋友
      title: msg.title, // 分享标题
      desc: msg.desc, // 分享描述
      link: msg.link, // 分享链接 默认以当前链接
      imgUrl: msg.imgUrl, // 分享图标
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
      title: msg.title, // 分享标题
      desc: msg.desc, // 分享描述
      link: msg.link, // 分享链接 默认以当前链接
      imgUrl: msg.imgUrl, // 分享图标
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

