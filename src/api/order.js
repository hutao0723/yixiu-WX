import base from './base';

export default class order extends base {

  /**
   * 拉起支付
   */
  static async buy(itemId, itemType) {
    console.log('拉起支付')
    const orderId = await this.placeOrder({ itemId, itemType });
    const payment = await this.wxPrePay({ orderId });
    this.wxPay(payment);
  }

  /**
   * 下单
   */
  static async placeOrder({ itemId, itemType }) {
    console.log('下单')
    const url = `/order/submit`;
    const orderId = await this.post(url, { itemId, itemType });
    return orderId;
  }

  /**
    * 预支付
    */
  static async wxPrePay({ orderId }) {
    console.log('预支付')
    const payType = 'WECHATWXAPAY';
    const url = `/pay/submit`;
    const payment = await this.post(url, { orderId, payType });
    return payment;
  }

  /**
   * 支付
   */
  static wxPay(payment) {
    console.log('预支付2')
    wepy.requestPayment({
      'timeStamp': payment.timeStamp,
      'nonceStr': payment.nonceStr,
      'package': payment.package,
      'signType': 'MD5',
      'paySign': payment.paySign,
    }).then((res)=>{
      console.log('支付成功')
      // wepy.navigateTo({
      //   url: '/pages/user/success'
      // })
      wepy.$instance.globalData.pay = true;
    });
  }
  /**
   * 专栏详情
   */
  static async getColumnDetail(columnId) {
    console.log('专栏详情')
    const url = `/column/get`;
    const payment = await this.get(url, { columnId });
    return payment;
  }
  /**
   * 专栏列表
   */
  static async getColumnList(columnId) {
    console.log('专栏列表')
    const url = `/column/getCourses`;
    const payment = await this.get(url, { columnId });
    return payment;
  }
  /**
   * 专栏列表
   */
  static async getCourseDetail(courseId) {
    console.log('课程详情')
    const url = `/course/get`;
    const payment = await this.get(url, { courseId });
    return payment;
  }

}
