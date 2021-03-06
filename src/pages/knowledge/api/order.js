import base from './base';
import play from './play';
import store from '../vuex/store';

export default class order extends base {

  /**
   * 拉起支付
   */
  static async buy(itemId, itemType) {
    console.log('拉起支付')
    const orderId = await this.placeOrder({
      itemId,
      itemType
    });
    const payment = await this.wxPrePay({
      orderId
    });
    this.wxPay(payment);
  }



  /**
   * 下单
   */
  static async placeOrder({
    itemId,
    itemType
  }) {
    console.log('下单')
    const url = `/order/submit`;
    const res = await this.post(url, {
      itemId,
      itemType
    });
    return res.data.data;
  }

  /**
   * 预支付
   */
  static async wxPrePay({
    orderId
  }) {
    console.log('预支付')
    const payType = 'WECHATH5APAY';
    const url = `/pay/submit`;
    const res = await this.post(url, {
      orderId,
      payType
    });
    return res.data.data;
  }

  /**
   * 支付
   */
  // static async wxPay(payment) {
  //   const url = encodeURIComponent(location.href.split('#')[0]);
  //   const urlData = `/wechat/getJsapiSignature`;
  //   const res = await this.get(urlData, {
  //     params: {
  //       url
  //     }
  //   });
  //   this.wxChooseWXPay(res.data.data, payment)
  // }
  static  wxPay(payment) {
    function onBridgeReady() {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": payment.appId, //公众号名称，由商户传入     
          "timeStamp": payment.timeStamp, //时间戳，自1970年以来的秒数     
          "nonceStr": payment.nonceStr, //随机串     
          "package": payment.package,
          "signType": payment.signType, //微信签名方式：     
          "paySign": payment.paySign //微信签名 
        },
        async function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            await play.startAudio(store.getters.getAudioInfo.columnId, store.getters.getAudioInfo.courseId, 'init')
            location.reload()
          } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
        }
      );
    }
    if (typeof WeixinJSBridge == "undefined") {
      if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
      } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
      }
    } else {
      onBridgeReady();
    }
  }

  // 预览
  static wxPreview(imgUrl) {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: [imgUrl] // 需要预览的图片http链接列表
    });
  }

  /**
   * 专栏详情
   */
  static async getColumnDetail(columnId) {
    console.log('专栏详情')
    const url = `/column/get`;
    const payment = await this.get(url, {
      params: {
        columnId
      }
    });
    return payment.data.data;
  }
  /**
   * 专栏列表
   */
  static async getColumnList(columnId) {
    console.log('专栏列表')
    const url = `/column/getCourses`;
    const payment = await this.get(url, {
      params: {
        columnId
      }
    });
    return payment.data.data;
  }
  /**
   * 专栏列表
   */
  static async getCourseDetail(courseId) {
    console.log('课程详情')
    const url = `/course/get`;
    const payment = await this.get(url, {
      params: {
        courseId
      }
    });
    return payment.data.data;
  }
  /**
   * 专栏列表
   */
  static async getCartList(params) {
    console.log('已购列表')
    const url = `/userItem/list`;
    const payment = await this.get(url, {
      params: params
    });
    return payment.data.data.lists;
  }


}

