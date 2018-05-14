import base from './base';
import play from './play';

export default class config extends base {

  
  /**
   * 获取首页布局视图
   */
  static layout() {
    const url = `/floor/page?isHome=true`;
    return this.get(url, { params: {} }).then(data => { return data });
  }

  /**
   * 获取活动页布局视图
   */
  static layoutAc(pageId) {
    const id = pageId;
    const url = `/floor/page?isHome=false`;
    return this.get(url, { id }).then(data => { return data });
  }
  /**
   * 获取模块数据
   */
  static async component(floorType, componentId) {
    const url = `/floor/${floorType}/${componentId}`;
    return this.get(url);
  }

  // *** 数据处理方法
  /**
   * 处理页面
   */
  static processPage(layout, page) {
    if (page == null || page == '') {
      return null;
    }
    const components = this.processComponents(page);
    const params = this.processPageParam(layout);
    return {
      components, params
    }
  }

  /**
   * 处理页面的配置参数
   */
  static processPageParam(layout) {
    if (layout == null || layout == '') {
      return {};
    } else {
      const { pageTitle, backgroundColor } = layout;
      const { shareDescribe, sharePictureUrl } = layout;
      const navigation = { pageTitle, backgroundColor };
      const shareConfig = { shareDescribe, sharePictureUrl };
      const params = { navigation, shareConfig };
      return params;
    }
  }

  /**
   * 处理页面的组件
   */
  static processComponents(page) {
    page.map(component => {
      // 处理轮播模块数据
      if (component.componentType === 'SWIPER') {
        component.tabs.forEach(tab => {
          tab.fillType = component.fillType;
          tab.pictureUrl = 'https:' + tab.pictureUrl;
        })
      }
      // 处理商品组模块数据
      if (component.componentType === 'GOODSBOX') {
        // let audioData = wepy.$instance.globalData.audioData;
        component.tabs.forEach(tab => {
          tab.goods.forEach(good => {
            // 图片填充方式
            good.fillType = component.fillType;
            // 展示文案
            if (good.checkPower || !good.price) {
              good.fetchText = '播放';
            } else {
              if (good.watchable) {
                good.fetchText = '试听';
              } else {
                good.fetchText = '购买';
              }
            };
            // 价格处理
            if (good.price) good.price = (+good.price / 100).toFixed(2);
            // 音频时长处理
            good.duration = play.fmtTime(good.timeLength)
            // 播放状态
            // if (audioData && audioData.columnId) {
            //   if (good.itemType == 2 && good.columnId == audioData.columnId)  good.playing = true;
            // } else if (audioData && !audioData.columnId) {
            //   if (good.itemType == 1 && good.courseId == audioData.courseId)  good.playing = true;
            // }
          });
          // 展示商品个数
          if (!tab.showAll) tab.goods = tab.goods.slice(0, tab.showLimitNumber);
        })
      }
    })
    return page;
  }



}
