import base from './base';
import store from '../vuex/store';

export default class user extends base {

  /**
   * 获取页面的数字信息
   */
  static async getNumber({
    userId
  }) {
    console.log('获取数字信息')
    const url = `/user/getNumberInfo`;
    const res = await this.get(url, {
      userId
    });
    return res.data.data;
  }


}

