/**
 * @note   监控埋点系统
 * @param  pointer this指针
 * @func   showLog() 发送埋点
 * @date   2018-05-17
 * @des    showLog(pointer)    this指针 必传
 */

export function monitorHandler () {
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
            } catch (e) {
            }
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
      var exposeUrl = '/embed/exposure';
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
        var {referer, url, adzoneId, pageId} = data[0];
        var params = {referer, url, adzoneId, pageId};
        var body = [];
        for (var i = 0; i < data.length; i++) {
          var {dpm, dcm, moduleId, itemType, itemId} = data[i];
          body.push({dpm, dcm, moduleId, itemType, itemId});
        }
        params.body = JSON.stringify(body); 
      } else {
        params = data[0];
      }
      
      pointer.$http.post(exposeUrl, params).then((res) => {
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
    }
  };
  window.monitor = monitor;
}
