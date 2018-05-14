  import store from '../vuex/store'

  export default {
      
    methods: {
      /**
       * 处理跳转到播放列表页
       */
      routeToAudioList() {
        console.log(1222)
        this.$router.push(`/list`)
      },
      /**
       * 处理跳转到课程／专栏详情
       */
      routeToCourse(data) {
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
       * 处理图标点击事件
       */
      routeByIconAction(goods) {
        const {itemType, watchable, price, checkPower, columnId, courseId} = goods;
        let that = this;
        // 根据课程状态进行相关处理
        switch (+itemType) {
          // 课程处理逻辑
          case 1:
            if (checkPower || !price) {
              // 播放
              this.$emit('playAudio', columnId, courseId);
            } else {
              if (watchable) {
                // 试听
                this.$root.$navigate(`/pages/play/audio_detail?courseId=${courseId}`);
              } else {
                // 购买
                this.$root.$navigate(`/pages/course/course_detail?courseId=${courseId}`);
              }
            }
            break;
          // 专栏处理逻辑
          case 2:
            if (checkPower || !price) {
              // 播放
              this.$emit('playAudio', columnId, courseId);
            } else {
              if (watchable) {
                // 试听
                store.getters.getAudioElement.setAttribute('src', store.getters.getAudioInfo.src);
                store.getters.getAudioElement.setAttribute('title', store.getters.getAudioInfo.title); 
                store.commit('play');
                this.$router.push(`/audioindex`)
              } else {
                // 购买
                this.$root.$navigate(`/pages/column/column_detail?columnId=${columnId}&isbuy=${false}`);
              }
            }
            break;
        }
      },
      /**
       * 处理区块点击事件
       */
      routeByBlockAction(item) {
        const {linkType, linkDataJson} = item;
        // 根据动作进行路由
        let linkData = JSON.parse(linkDataJson);
        switch (linkType) {
          case 1:
            // 跳转商品
            if (linkData.courseType == 1) this.$root.$navigate(`/pages/course/course_detail?courseId=${linkData.id}`);
            if (!linkData.courseType || linkData.courseType == 2) this.$root.$navigate(`/pages/column/column_detail?columnId=${linkData.id}`);
            break;
          case 2:
            // 跳转webview
            let url = encodeURIComponent(linkData.linkUrl)
            this.$root.$navigate(`/pages/activity/web?url=${url}`);
            break;
          case 3:
            // 小程序链接
            if (linkData.courseType == 1) {
              if (linkData.linkUrl == '/pages/home/tmp_home' || linkData.linkUrl == '/pages/cart/cart' || linkData.linkUrl == '/pages/user/user') {
                this.$root.$switch(linkData.linkUrl);
              } else {
                this.$root.$navigate(linkData.linkUrl);
              }
            }
            if (linkData.courseType == 2) {
              wepy.navigateToMiniProgram({
                appId: linkData.appId,
                path: linkData.linkUrl
              })
            }
            break;
        }
      }
    }
  }
