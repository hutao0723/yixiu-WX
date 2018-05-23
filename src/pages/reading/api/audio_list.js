import base from './base';
import order from './order';
export default class play extends base {

  static getVideoList(colId, couId,reverseTs) {
    console.log(1, colId, couId,reverseTs)
    let videoMsg = {} // 最后return
    let videoList = [] // 播放列表数组
    let isNext = false; // 上一首开关
    let isPrev = false; // 下一首开关

    let obj = new Object();
    obj.getVideoMsg = async function () {
      if (!colId) {
        // 单课程列表

        let objs = await order.getCourseDetail(couId);

        videoList = [objs];
        const {
          timeLength, // 时长
          freeTime, // 试听时长
          title, // 标题
          lecturerId, // 讲师id
          lecturerName, // 讲师名称
          playbackProgress, // 播放进度
          powerLevel, // 是否购买
          lateralCover, // 宽图
          verticalCover, // 竖图
          price,
          subTitle,
          
        } = objs;
        videoMsg = {
          columnId: null, // 课程id
          courseId: couId, // 专栏id
          timeLength, // 时长
          watchable: powerLevel == 1 ? timeLength : freeTime, // 试听时常 0正常播放 >0试听时常
          title, // 标题
          lecturerId, // 讲师id
          lecturerName, // 讲师名称
          playbackProgress, // 播放进度
          lateralCover, // 宽图
          verticalCover, // 竖图
          isNext: isNext,
          isPrev: isPrev,
          powerLevel: price == 0 ?1:powerLevel,
          price,
          subTitle,
          
        };
        return videoMsg;
      } else {
        // 组件列表
        let objs = await order.getColumnList(colId);

        videoList = objs.filter((item) => {
          return item.powerLevel == 1 || item.watchable == 1;
        });

        if(reverseTs){
          videoList = videoList.reverse()
        }

        let videoTs = null;
        let isTs = false;
        
        for (let i = 0; i < videoList.length; i++) {
          const element = videoList[i];
          if (element.powerLevel == 1 || element.watchable ==1) {
            if(couId&&element.id != couId){
              continue
            }
            const {
              timeLength, // 时长
              freeTime, // 试听时长
              title, // 标题
              lecturerId, // 讲师id
              lecturerName, // 讲师名称
              playbackProgress, // 播放进度
              powerLevel, // 是否购买
              lateralCover, // 宽图
              verticalCover, // 竖图
              id,
              price,
              watchable,
              subTitle,
              
            } = element;
            videoTs = {
              columnId: colId, // 课程id
              courseId: id, // 专栏id
              timeLength, // 时长
              watchable: powerLevel == 1 || watchable == 1 ? timeLength : freeTime, // 试听时常 0正常播放 >0试听时常
              title, // 标题
              lecturerId, // 讲师id
              lecturerName, // 讲师名称
              playbackProgress, // 播放进度
              lateralCover, // 宽图
              verticalCover, // 竖图
              isNext: i != videoList.length-1,
              isPrev: i != 0,
              powerLevel: price == 0 ?1:powerLevel,
              price,
              subTitle,
              
            };
            break
          }
        }
        

        return videoTs
      }
    };

    obj.getPrev = async function (cId) {

      let objs = await order.getColumnList(colId);
      videoList = objs
      if(reverseTs){
        videoList = videoList.reverse()
      }
      let tsElement = null
      for (let i = 0; i < videoList.length; i++) {
        console.log(i)
        const element = videoList[i];
        if (cId == element.id) {
          if (!tsElement) {
            tsElement = element
            continue;
          }
          const {
            id,
            timeLength, // 时长
            freeTime, // 试听时长
            title, // 标题
            lecturerId, // 讲师id
            lecturerName, // 讲师名称
            playbackProgress, // 播放进度
            powerLevel, // 是否购买
            lateralCover, // 宽图
            verticalCover, // 竖图
            price,
            watchable,
            subTitle,
            
          } = tsElement;
          tsElement = {
            columnId: colId, // 课程id
            courseId: id, // 专栏id
            timeLength, // 时长
            watchable: powerLevel == 1 || watchable == 1 ? timeLength : freeTime, // 试听时常 0正常播放 >0试听时常
            title, // 标题
            lecturerId, // 讲师id
            lecturerName, // 讲师名称
            playbackProgress, // 播放进度
            lateralCover, // 宽图
            verticalCover, // 竖图
            isNext: true,
            isPrev: i != 1,
            powerLevel: price == 0 ?1:powerLevel,
            price,
            subTitle,
            
          };
          console.log('getPrev', tsElement)
          return tsElement;
        }
        if (element.powerLevel == 1 || element.watchable == 1) {
          tsElement = element
        }
      }
    };
    obj.getNext = async function (cId) {

      let objs = await order.getColumnList(colId);
      videoList = objs
      if(reverseTs){
        videoList = videoList.reverse()
      }
      for (let i = 0; i < videoList.length; i++) {
        console.log(1,i)
        const element = videoList[i];
        if (cId == element.id) {
          isNext = true;
          continue;
        }
        if (isNext) {
          if (element.powerLevel == 1 || element.watchable == 1) {
            const {
              id,
              timeLength, // 时长
              freeTime, // 试听时长
              title, // 标题
              lecturerId, // 讲师id
              lecturerName, // 讲师名称
              playbackProgress, // 播放进度
              powerLevel, // 是否购买
              lateralCover, // 宽图
              verticalCover, // 竖图
              price,
              watchable,
              subTitle,
            } = element;
            videoMsg = {
              columnId: colId, // 课程id
              courseId: id, // 专栏id
              timeLength, // 时长
              watchable: powerLevel == 1 || watchable == 1 ? timeLength : freeTime, // 试听时常 0正常播放 >0试听时常
              title, // 标题
              lecturerId, // 讲师id
              lecturerName, // 讲师名称
              playbackProgress, // 播放进度
              lateralCover, // 宽图
              verticalCover, // 竖图
              isPrev: true,
              isNext: i != videoList.length - 1,
              powerLevel: price == 0 ?1:powerLevel,
              price,
              subTitle,
              
            };
            console.log('getNext', videoMsg)

            return videoMsg;
          }
        }
      }
    };
    return obj;
  }

}


