import base from './base';

export default class poster extends base {

  
  /**
   * 获取海报信息
   */
  static async getInfo() {
    const url = `/comment/share`;
    const res = await this.get(url);
    return res.data;
  }
}