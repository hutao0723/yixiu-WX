import base from './base';
import store from '../vuex/store'
export default class play extends base {

  /**
   * 获取音频地址
   */
  static async getAudioUrl(readId, courseId) {
    const url = `/course/getAccessUrl`;
    let courseType = 3;
    let params = { readId,courseId,courseType}
    const res = await this.get(url, {params});
    return res.body.data;
  }
  
  /**
   * 获取文稿
   */
  static async getCourseSketch(courseId) {
    const url = `/course/getCourseSketch`;
    let params = { courseId }
    const res = await this.get(url, {params});
    return res.body.data;
  } 

  /**
   * 获取打卡人数
   */
  static async getClockCount(readId, courseId) {
    const url = `/comment/clockCount`;
    let params = { readId, courseId }
    const res = await this.get(url, {params});
    return res.body.data;
  } 

  /**
   * 同步播放时间
   */
  static async syncPlaytimes() {
    const url = `/user/stat/changeListens`;
    this.get(url);
  }

  /**
   * 同步播放进度
   */
  static async syncProgress(readId, courseId, current) {
    let params = {
      readId,
      itemId: courseId,
      playbackProgress: current
    }
    const url = `/userItem/progress`;
    this.post(url, params);
  }

  /**
   * 获取课程详情
   */
  static async getReadDetail(readId, courseId) {
    const url = `/readBookCourse/courseDetail`;
    let params = { readId, courseId }
    const res = await this.get(url, {params});
    return res.body.data;
  }

  /**
   * 获取播放列表
   */
  static async getReadList(readId) {
    const url = `/read/getReadPlanCourseList`;
    let params = { readId };
    const res = await this.get(url, {params});
    let readList = res.body.data;
    // 丰富播放信息
    readList.forEach((item) => {
        item.duration = this.fmtTime(+item.timeLength);
        let percent = Math.floor((+item.playbackProgress ? +item.playbackProgress : 0) / +item.timeLength * 100);
        item.percent = (percent > 100 ? 100 : percent) + "%";
        item.readId = readId;
      })
    // 获取播放列表id集合
    let readIds = readList.map(item => {
      return item.id
    });
    // 更新vx数据
    store.commit({ type: 'setReadIds', readIds: readIds });
    store.commit({ type: 'setReadList', readList: readList });
  } 

  /**
   * 初始化音频
   */
  static async audioInit(readId, courseId, refresh, self) {
    // 这里，很迷
    store.commit('play');
    // 是否更新播放列表
    if (refresh) await this.getReadList(readId);
    // 获取课程详情
    let readAudio = await this.getReadDetail(readId, courseId);
    readAudio.index = store.getters.getReadIds.indexOf(courseId);
    readAudio.isPrev = readAudio.index == 0 ? false : true;
    readAudio.isNext = readAudio.index == (store.getters.getReadIds.length - 1) ? false : true;
    // 获取播放地址
    readAudio.src = await this.getAudioUrl(readId,courseId);
    // 更新vx数据
    store.commit({ type: 'setAudio', readAudio: readAudio });
    // 设置播放元素数据
    store.getters.getAudioElement.setAttribute('src', store.getters.getAudioInfo.src);
    store.getters.getAudioElement.setAttribute('title', store.getters.getAudioInfo.title); 
    // 这里，很迷，触发播放
    store.commit('play');
    document.title = store.getters.getAudioInfo.courseTitle;
    self.$router.push(`/audio/index`);
  }
  
  /**
   * 下一曲音频
   */
  static audioNext() {
    // 更新当前课程进度
    play.syncProgress(store.getters.getAudioInfo.courseId, store.getters.getCurrentTime)
    // 获取播放列表中下一个课程
    let courseId = store.getters.getReadIds[(store.getters.getAudioInfo.index + 1)],
        readId = store.getters.getAudioInfo.readId;
    this.audioInit(readId, courseId, false)
  }
  
  /**
   * 上一曲音频
   */
  static audioPrev() {
    // 更新当前课程进度
    play.syncProgress(store.getters.getAudioInfo.courseId, store.getters.getCurrentTime)
    // 获取播放列表中上一个课程
    let courseId = store.getters.getReadIds[(store.getters.getAudioInfo.index - 1)],
        readId = store.getters.getAudioInfo.readId;
    this.audioInit(readId, courseId, false)
  }
  

  /**
   * 时间格式化
   */
  static fmtTime(time) {
    let hh = Math.floor(time / 3600) || 0;
    let mm = Math.floor((time % 3600) / 60) || 0;
    let ss = time % 60 || 0;
    let hour = this.formatTime(hh) === '00' ? '' : (this.formatTime(hh) + ':');
    return hour + this.formatTime(mm) + ':' + this.formatTime(ss);
  }

  static formatTime(val) {
    return val < 10 ? '0'+ val : val;
  }

}

