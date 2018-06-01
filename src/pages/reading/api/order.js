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
    if (!orderId) {
      return false;
    }
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

    if (!res.data.success) {
      location.href = '/reading.html#/index/home';
      return false;
    }
    return res.data.data;
  }

  /**
   * 预支付
   */
  static async wxPrePay({
    orderId
  }) {
    console.log('预支付')
    const payType = 'WECHATREADH5APAY';
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
  static wxPay(payment) {
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
        function (res) {
          // if (res.err_msg == "get_brand_wcpay_request:ok") {

          // } 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。

          function url_add_hash(url, key) {
            var key = (key || 't') + '='; //默认是"t"  
            var reg = new RegExp(key + '\\d+'); //正则：t=1472286066028  
            var timestamp = +new Date();
            if (url.indexOf(key) > -1) { //有时间戳，直接更新  
              return url.replace(reg, key + timestamp);
            } else { //没有时间戳，加上时间戳  
              if (url.indexOf('#') > -1) {
                return url.split('#')[0] + '?' + key + timestamp + location.hash;
              } else {
                return url + '?' + key + timestamp;
              }
            }
          }

          window.location.href = url_add_hash(window.location.href)
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

}

