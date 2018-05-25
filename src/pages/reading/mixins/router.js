  import store from '../vuex/store'
  import play from '../api/play'
  // import { clickHandler } from '../components/utils/clickHandler';
  export default {
      
    methods: {
      /**
       * 处理跳转到播放列表页
       */
      routeToAudioList() {
        this.$router.push(`/audio/list`)
      },
      /**
       * 处理跳转到课程／专栏详情
       */
      routeToCourse(data, monitorLog) {
        // clickHandler(monitorLog);
        const {columnId, courseId} = data;
        if (columnId) {
          // if (powerLevel || checkPower || !price) {
          //   // this.$root.$navigate(`/pages/column/column_detail?columnId=${columnId}&isbuy=${true}`);
          //   this.$router.push(`/column/${columnId}`)
          // } else {
            // this.$root.$navigate(`/pages/column/column_detail?columnId=${columnId}&isbuy=${false}`);
            this.$router.push(`/column/${columnId}`)
          // }
        } else {         
          this.$router.push(`/course/${courseId}`)
        } 
      },
      /**
       * 播放或试听点击事件
       */
       playClick(columnId, courseId, isTry) {
         play.startAudio(columnId,courseId,'init');
         store.commit('play');
         if (isTry) this.$router.push(`/audio/index`);
       },
      /**
       * 处理图标点击事件
       */
      routeByIconAction(goods, monitorLog) {
        // clickHandler(monitorLog);
        const {itemType, watchable, price, checkPower, columnId, courseId} = goods;
        let that = this;
        // 根据课程状态进行相关处理
        switch (+itemType) {
          // 课程处理逻辑
          case 1:
            if (checkPower || !price) {
              // 播放
              play.startAudio(columnId,courseId,'init')
              store.commit('play');
            } else {
              if (watchable) {
                // 试听
                play.startAudio(columnId,courseId,'init')
                store.commit('play');
                this.$router.push(`/audio/index`);
              } else {
                // 购买
                this.$router.push(`/course/${courseId}`);
              }
            }
            break;
          // 专栏处理逻辑
          case 2:
            if (checkPower || !price) {
              // 播放
              play.startAudio(columnId,courseId,'init')
              store.commit('play');
            } else {
              if (watchable) {
                // 试听
                play.startAudio(columnId,courseId,'init')
                store.commit('play');
                this.$router.push(`/audio/index`);
              } else {
                // 购买
                this.$router.push(`/column/${columnId}`)
              }
            }
            break;
        }
      },
      /**
       * 处理区块点击事件
       */
      routeByBlockAction(item,monitorLog) {
        // clickHandler(monitorLog);
        const {linkType, linkDataJson} = item;
        // 根据动作进行路由
        let linkData = JSON.parse(linkDataJson);
        switch (linkType) {
          case 1:
            // 跳转商品
            if (linkData.courseType == 1) this.$router.push(`/course/${linkData.id}`);
            if (!linkData.courseType || linkData.courseType == 2) this.$router.push(`/column/${linkData.id}`);
            break;
          case 2:
            // 跳转外链
            window.location.href=`${linkData.linkUrl}`;
            break;
          case 3:
            // 小程序链接
            if (linkData.courseType == 1) {
              this.$router.push(`${linkData.linkUrl}`);
            }
            if (linkData.courseType == 2) {
              // wepy.navigateToMiniProgram({
              //   appId: linkData.appId,
              //   path: linkData.linkUrl
              // })
            }
            break;
        }
      }
    }
  }
