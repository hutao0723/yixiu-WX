  // 页面访问日志统一处理
  import http from '../components/utils/http'
  import store from '../vuex/store'
  export default {
    data() {
      return {
        entryTime: '',
        outTime: ''
      }
    },
    methods: {
      /**
       * 处理跳转到播放列表页
       */
    },
    mounted() {
      this.entryTime = new Date().getTime();
      this.url = window.location.href;
      this.referer = store.getters.getReferer;
    },
    beforeDestroy() {
      alert(2)
      this.outTime = new Date().getTime();
      let referer = this.referer,
          stayTime = this.outTime - this.entryTime,
          action = referer == '' ? 'entry' : 0,
          url = this.url;
      store.commit({ type: 'setReferer', referer: this.url });  // 设置来源路径
      http.post('/embed/access',{stayTime, action, url, referer}).then((res) => {
        // 埋点成功
      }, (res) => {
        // 埋点失败
      });
    }
  }
