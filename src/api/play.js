import base from './base';
import list from './audio_list';
import store from '../vuex/store'
export default class play extends base {

  /**
   * 获取音频地址
   */
  static async getAudioUrl(columnId, courseId) {
    const url = `/course/getAccessUrl`;
    let params = {};
    if (columnId) {
      params = {
        columnId: columnId,
        courseId: courseId
      }
    } else {
      params = {
        courseId: courseId
      }
    }
    const res = await this.get(url, {params});
    return res.body.data;
  }
  
  
  /**
   * 同步播放次数
   */
  static async syncPlaytimes(courseId) {
    const url = `/course/playTimesIncrement`;
    this.post(url, {courseId});
  }

  /**
   * 同步播放进度
   */
  static async syncProgress(columnId, courseId, current) {
    let params = {};
    if (columnId) {
      params = {
        itemId: columnId,
        currentColumnCourseId: courseId,
        playbackProgress: current
      }
    } else {
      params = {
        itemId: courseId,
        playbackProgress: current
      }
    }
    const url = `/userItem/progress`;
    const isOk = await this.post(url, params);
    return isOk;
  }

  /**
   * 初始化音频
   */
  static async audioInit(columnId,courseId) {
    let cat = await list.getVideoList(columnId,courseId);
    return  cat.getVideoMsg();
  }
  
  /**
   * 下一曲音频
   */
  static async audioNext(columnId,courseId) {
    let cat = list.getVideoList(columnId,courseId);
    return cat.getNext(courseId);
  }
  
  /**
   * 上一曲音频
   */
  static async audioPrev(columnId,courseId) {
    let cat = list.getVideoList(columnId,courseId);
    return cat.getPrev(courseId);
  }
  
  /**
   * 更新并播放音频
   */
  static async startAudio(columnId,courseId,action) {
    let audio = {};
    if ( action === 'init') audio =  await this.audioInit(columnId, courseId);
    if ( action === 'next') audio =  await this.audioNext(columnId, courseId);
    if ( action === 'prev') audio =  await this.audioPrev(columnId, courseId);
    console.log(audio)
    let colId = audio.columnId,
        couId = audio.courseId;
    // audio.src = await this.getAudioUrl(colId, couId);
    audio.src = 'http://mp3.qqmusic.cc/yq/208662441.mp3'
    store.commit({
      type: 'setAudio',
      audio: audio
    });
    store.getters.getAudioElement.setAttribute('src', store.getters.getAudioInfo.src);
    store.getters.getAudioElement.setAttribute('title', store.getters.getAudioInfo.title); 
    store.commit('play');
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


