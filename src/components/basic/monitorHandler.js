/**
 * @note   监控埋点系统
 * @param  pointer this指针
 * @func   showLog() 发送埋点
 * @author 朱双龙
 * @email  zsl@duiba.com.cn
 * @date   2017-09-23
 * @des    showLog(pointer)    this指针 必传
 */

export function monitorHandler () {
  let domain = window.mailaDomain || '/'; // 客户端提供
  let monitorList = []; // 数据
  let monitorTimeout;
  var monitor = {
    // 曝光
    showLog: function (pointer) {
      /**
       * pointer this指针
       * data 埋点数据
       */
      const self = this;
      var monitorEl = document.querySelectorAll('[monitor-log]');
      if (!window.innerHeight) {
        return;
      }
      // 执行数据埋点
      clearTimeout(monitorTimeout);
      monitorTimeout = setTimeout(function () {
        for (var i = 0; i < monitorEl.length; i++) {
          if (!monitorEl[i].getAttribute('monitor-log-get')) {
            var monitorLog = monitorEl[i].getAttribute('monitor-log');
            var isIn = false;

            if (monitorLog === undefined || monitorLog === 'undefined' || monitorEl[i].style.display === 'none' || monitorEl[i].offsetWidth === 0) {
              continue;
            }

            if (monitorEl[i].getBoundingClientRect().top < window.innerHeight && monitorEl[i].getBoundingClientRect().left < window.innerWidth) {
              isIn = true;
            }

            if (isIn) {
              console.log(monitorLog)
              monitorEl[i].setAttribute('monitor-log-get', true);
            } else {
              continue;
            }

            try {
              monitorList.push(JSON.parse(monitorLog));
            } catch (e) {}
          }
        }
        if (monitorList.length) {
          self.sendApi(pointer, monitorList);
          monitorList = [];
        }
      }, 200);
    },
    sendApi: function (pointer, data) {
      if (!pointer) {
        return;
      }
      var list = [];
      var baseUrl = '/exposure/standard?';
      var exposeUrl = '';
      // iframe数据过滤，防刷
      try {
        list = JSON.stringify(data);
        if (list.indexOf('iframe') !== -1) {
          return;
        }
      } catch (e) {
        // 数据异常;
      }

      // 单独发送埋点还是批量发送埋点
      if (data.length > 1) {
        baseUrl += 'batch=1&batch_c=';
        exposeUrl = domain + baseUrl + encodeURIComponent(list);
      } else {
        baseUrl = '/exposure/standard?';
        if (data[0].dcm) {
          baseUrl += 'dcm=' + data[0].dcm;
        }
        if (data[0].dpm) {
          baseUrl += (data[0].dcm ? '&' : '') + 'dpm=' + data[0].dpm;
        }
        exposeUrl = domain + baseUrl;
      }
      // 加入APPID 和 设备号
      exposeUrl += '&app_id=' + window.JQG.appId + '&device_id=' + pointer.$cookie.get('_coll_ci');

      pointer.$http.jsonp(exposeUrl, {}).then((res) => {
        // 埋点成功
      }, (res) => {
        // 埋点失败
      });
    },
    // 横向滚动曝光
    scrollLeftShowLog: function (pointer, el) {
      if (!el || !document.getElementsByClassName(el)) {
        return;
      }
      const self = this;
      var startPosition, endPosition, deltaX;
      document.getElementsByClassName(el)[0].addEventListener('touchstart', function (e) {
        let touch = e.touches[0];
        startPosition = {
          x: touch.pageX,
          y: touch.pageY
        };
      }, false);
      document.getElementsByClassName(el)[0].addEventListener('touchmove', function (e) {
        let touch = e.touches[0];
        endPosition = {
          x: touch.pageX,
          y: touch.pageY
        };
        deltaX = Math.abs(endPosition.x - startPosition.x);
      }, false);
      document.getElementsByClassName(el)[0].addEventListener('touchend', function () {
        deltaX > 0 && self.showLog(pointer);
      }, false);
    },
    // 首页曝光
    indexShowLog: function (pointer) {
      this.sendApi(pointer, [{'dpm': 'maila-' + window.JQG.appId + '.15.13.0'}]);
    }
  };
  window.monitor = monitor;
}
