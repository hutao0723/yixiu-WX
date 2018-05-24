export function setDPR () {
  var viewport = document.querySelector('meta[name=viewport]');
  if (window.devicePixelRatio === 1) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no');
  }
  if (window.devicePixelRatio === 2) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no');
  }
  if (window.devicePixelRatio === 3) {
    viewport.setAttribute('content', 'width=device-width,initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no');
  }
}
export function remChange () {
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var widthProportion = function () {
    var doc = document.body || document.documentElement;
    var p = doc.clientWidth;
    return p / 10;
  };
  var changePage = function () {
    document.getElementsByTagName('html')[0].setAttribute('style', 'font-size:' + widthProportion() + 'px !important');
  };

  changePage();
  window.addEventListener(resizeEvt, changePage, false);
  // 定义聚钱购全局变量
  var ua = navigator.userAgent.toLowerCase();
  var isIos = ua.match(/iphone/ig) || ua.match(/ipad/ig) ? 'true' : false;
  window.JQG = {
    appId: window.mailaConfig && window.mailaConfig.appId || 1,
    fontSize: widthProportion(),
    isIos: isIos,
    homePage: {},
    order: {},
    wallet: {},
    myzone: {}
  };
}
