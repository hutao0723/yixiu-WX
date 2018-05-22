import Vue from 'vue';

// HTTP工具类
export default class http {

  static get (url, data) {
    return Vue.http.get(url, data);
  }

  static put (url, data) {
    return Vue.http.put(url, data);
  }

  static post (url, data) {
    return Vue.http.post(url, data);
  }

  static patch (url, data) {
    return Vue.http.patch(url, data);
  }

  static delete (url, data) {
    return Vue.http.delete(url, data);
  }
}
