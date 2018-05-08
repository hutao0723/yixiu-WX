import base from './base';

export default class play extends base {

  /**
   * 获取音频数据
   */
  static async getAudioUrl({columnId, courseId}) {
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
    const data = await this.get(url,params);
    return data;
  }
  
  
  /**
   * 同步播放次数
   */
  static async syncPlaytimes(courseId) {
    const url = `/course/playTimesIncrement`;
    await this.post(url, {courseId});
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


