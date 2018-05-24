import base from './base'

/**
 * 权限服务类
 */
export default class auth extends base {
  /**
   *检测登录是否过期
   */
  static async isNeedLogin() {
    const tk = this.getConfig('tk');
    const url = `/needLogin`;
    return await this.get(url, {tk});
  }

  /**
   *绑定分销渠道
   */
  static async syncdcd(dcd) {
    const url = `/distribution/binding`;
    return await this.get(url, {dcd});
  }
  /**
   * 执行登录操作
   */
  static async doLogin() {
    const appId = wepy.$instance.globalData.appId;
    const {code} = await wepy.login();
    const {rawData,signature,encryptedData,iv} = await this.getAuth();
    const params = {appId,code,rawData,signature,encryptedData,iv};
    const {tk} = await this.getToken(params);
    await this.setConfig('tk', tk);
  }


  /**
   * 获取登录态token
   */
  static async getToken(params) {
    const url = `/login`;
    return await this.get(url, params);
  }


  /**
   * 读取权限值
   */
  static getConfig(key) {
    return wepy.$instance.globalData.auth[key];
  }

  /**npm
   * 检查是否存在权限值
   */
  static hasConfig(key) {
    const value = this.getConfig(key);
    return value != null && value != '';
  }

  /**
   * 设置权限值
   */
  static async setConfig(key, value) {
    await wepy.setStorage({key: key, data: value});
    wepy.$instance.globalData.auth[key] = value;
  }

  /**
   * 删除权限值
   */
  static async removeConfig(key) {
    console.info(`[auth] clear auth config [${key}]`);
    wepy.$instance.globalData.auth[key] = null;
    await wepy.removeStorage({key: key});
  }
}
