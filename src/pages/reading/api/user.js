import base from './base';
import store from '../vuex/store';

export default class user extends base {

  /**
   * 获取统计数据我和老师微信账号
   */
  static async getInfo() {
    const url = `/user/stat/detail`;
    const res = await this.get(url);
    return res.data;
  }

  /**
   * 获取历程列表
   */
  static async getJourneyList() {
    const url = `/user/read/journey`;
    const res = await this.get(url);
    return res.data;
  }

  /**
   * 获取点赞
   */
  static async getThumbUp(status,commentId) {
    let params = {};
      params = {
        status: status,
        commentId: commentId
      }
    const url = `/comment/praise`;
    const res = await this.get(url, {
      params
    });
    return res.data;
  }

  /**
   * 获取banner
   */
  static async getBookList(id) {
    let params = {}
    params = {
      id: id
    }
    const url = `/read/past`;
    const res = await this.get(url, {
      params
    });
    return res.data;
  }

  /**
   * 根据banner获取列表
   */
  static async getSwipeList(readId) {
    let params = {};
      params = {
        readId: readId
      }
    const url = `/readBook/bookList`;
    const res = await this.get(url,{params});
    return res.data;
  }
}

