import base from './base';

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
    console.log(res.data.data)
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
  static async wxPay(payment) {
    const url = location.href.split('#')[0];
    const urlData = `/wechat/getJsapiSignature`;
    const res = await this.get(urlData, {
      params: {
        url
      }
    });
    this.wxChooseWXPay(res.data.data, payment)
  }
  static wxChooseWXPay(obj, payment) {
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
          if (res.err_msg == "get_brand_wcpay_request:ok") {

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

  // 初始化jdk获取权限
  static async getApiRules(arr) {
    console.log('初始化jdk')
    const url = location.href.split('#')[0];
    const urlData = `/wechat/getJsapiSignature`;
    const obj = await this.get(urlData, {
      params: {
        url
      }
    });
    wx.config({
      // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      debug: false,
      // 必填，公众号的唯一标识
      appId: obj.appid,
      // 必填，生成签名的时间戳
      timestamp: obj.timestamp,
      // 必填，生成签名的随机串
      nonceStr: obj.noncestr,
      // 必填，签名，见附录1
      signature: obj.signature,
      // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      jsApiList: arr
    });
    wx.ready(function () {
      wx.onMenuShareAppMessage({
        title: '这是分享给朋友标题', // 分享标题  
        desc: '这是分享给朋友描述', // 分享描述  
        link: '这是分享给朋友链接', // 分享链接  
        imgUrl: 'https://pic1.zhimg.com/da8e974dc_s.jpg', // 分享图标  
        type: '', // 分享类型,music、video或link，不填默认为link  
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空  
        success: function () {
          // 用户确认分享后执行的回调函数  
          alert("分享给朋友成功");
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数  
          alert("分享给朋友失败");
        }
      });
    });
  }

  // 分享
  static wxShare() {

  }

  // 预览
  static wxPreview() {
    wx.previewImage({
      current: '', // 当前显示图片的http链接
      urls: ['https://yun.duiba.com.cn/yoofans/images/201804/miniapp/ask-que.png'] // 需要预览的图片http链接列表
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

