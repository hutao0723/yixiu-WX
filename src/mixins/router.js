  import store from '../vuex/store'
  import play from '../api/play'
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
              // this.$emit('playAudio', columnId, courseId);
              play.startAudio(columnId,courseId,'init')
            } else {
              if (watchable) {
                // 试听
                // this.$root.$navigate(`/pages/play/audio_detail?courseId=${courseId}`);
                // store.getters.getAudioElement.setAttribute('src', store.getters.getAudioInfo.src);
                // store.getters.getAudioElement.setAttribute('title', store.getters.getAudioInfo.title); 
                // store.commit('play');
                play.startAudio(columnId,courseId,'init')
                this.$router.push(`/audio/index`);
              } else {
                // 购买
                // this.$root.$navigate(`/pages/course/course_detail?courseId=${courseId}`);
                this.$router.push(`/course/${courseId}`);
              }
            }
            break;
          // 专栏处理逻辑
          case 2:
            if (checkPower || !price) {
              // 播放
              play.startAudio(columnId,courseId,'init')
            } else {
              if (watchable) {
                // 试听
                play.startAudio(columnId,courseId,'init')
                this.$router.push(`/audio/index`);
              } else {
                // 购买
                // this.$root.$navigate(`/pages/column/column_detail?columnId=${columnId}&isbuy=${false}`);
                this.$router.push(`/column/${columnId}`)
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
