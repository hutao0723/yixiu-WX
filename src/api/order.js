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
    const url = `/api/order/submit`;
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
    const url = `/api/pay/submit`;
    const res = await this.post(url, {
      orderId,
      payType
    });
    return res.data.data;
  }

  /**
   * 支付
   */
  static wxPay(obj) {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId": obj.appId, //公众号名称，由商户传入     
        "timeStamp": obj.timeStamp, //时间戳，自1970年以来的秒数     
        "nonceStr": obj.nonceStr, //随机串     
        "package": obj.package,
        "signType": obj.signType, //微信签名方式：     
        "paySign": obj.paySign //微信签名 
      },
      function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          self.$goRouter('./NewIsStopCar')
        } // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
      }
    );
  }

  static async wxShare(url){
    console.log('分享')
    const urlData = `/api/wechat/getJsapiSignature`;
    const res = await this.post(urlData, {
      url
    });
    wxOnMenuShareTimeline(res.data.data)
  }
  static wxOnMenuShareTimeline(obj) {
    wx.config({
      // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      debug: false,
      // 必填，公众号的唯一标识
      appId: obj.appId,
      // 必填，生成签名的时间戳
      timestamp: obj.timestamp,
      // 必填，生成签名的随机串
      nonceStr: obj.noncestr,
      // 必填，签名，见附录1
      signature: obj.signature,
      // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      jsApiList: ['onMenuShareTimeline']
    });
    wx.error(function (res) {
      console.log("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    });
    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: ['onMenuShareTimeline'],
        success: function (res) {

        }
      });

      wx.onMenuShareTimeline({
        title: '分享测试标题', // 分享标题
        link: '分享链接', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: '', // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
        },
        cancel: function () {
          // 用户取消分享后执行的回调函数
        }
      });

    });
  }

  static async wxPreview(url,imgUrl){
    console.log('预览')
    const urlData = `/api/wechat/getJsapiSignature`;
    const res = await this.post(urlData, {
      url
    });
    wxPreviewImage(res.data.data,imgUrl)
  }
  static wxPreviewImage(obj,imgUrl) {
    wx.config({
      // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      debug: false,
      // 必填，公众号的唯一标识
      appId: obj.appId,
      // 必填，生成签名的时间戳
      timestamp: obj.timestamp,
      // 必填，生成签名的随机串
      nonceStr: obj.noncestr,
      // 必填，签名，见附录1
      signature: obj.signature,
      // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      jsApiList: ['previewImage']
    });
    wx.error(function (res) {
      console.log("出错了：" + res.errMsg); //这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
    });
    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: ['previewImage'],
        success: function (res) {

        }
      });

      wx.previewImage({
        current: imgUrl, // 当前显示图片的http链接
        urls: [] // 需要预览的图片http链接列表
        });

    });
  }
  /**
   * 专栏详情
   */
  static async getColumnDetail(columnId) {
    console.log('专栏详情')
    const url = `/api/column/get`;
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
    const url = `/api/column/getCourses`;
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
    const url = `/api/course/get`;
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
    const url = `/api/userItem/list`;
    const payment = await this.get(url, {
      params: params
    });
    return payment.data.data.lists;
  }


}

