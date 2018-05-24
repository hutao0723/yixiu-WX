import base from './base';
import store from '../vuex/store';

export default class user extends base {

  /**
   * 获取页面的数字信息
   */
  static async getNumber(userId) {
    const url = `/user/getNumberInfo`;
    const res = await this.get(url, {
      userId
    });
    return res.data.data;
  }

  /**
   * 获取历程列表
   */
  static async getJourneyList(id) {
    let params = {
        id: id
      }
    const url = `/user/getJourneyList`;
    const res = await this.get(url, params);
    return res.data.data;
  }

  /**
   * 获取点赞状态
   */
  static async getThumbUp(status) {
    const url = `/user/getJourneyList`;
    const res = await this.get(url, {
      status
    });
    return res.data.data;
  }

  /**
   * 获取老师信息
   */
  static async getLecturer(id) {
    const url = `/user/getLecturer`;
    const res = await this.get(url, {
      id
    });
    return res.data.data;
  }

  /**
   * 获取banner
   */
  static async getSwipeList(id) {
    const url = `/user/getSwipeList`;
    const res = await this.get(url, {
      id
    });
    return res.data.data;
  }

  /**
   * 根据banner获取列表
   */
  static async getBookList({id}) {
    const url = `/user/getBookList`;
    const res = await this.get(url, {
      id
    });
    return res.data.data;
  }
}

