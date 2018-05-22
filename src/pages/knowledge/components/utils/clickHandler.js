import http from './http'
export function clickHandler (monitorLog) {
  let params = JSON.parse(monitorLog)
  http.post('/embed/click', params).then((res) => {
        // 埋点成功
      }, (res) => {
        // 埋点失败
      });
};
