
export default {
  // audio元素
		audioelement: '',
		// audio信息
		audio: {
			columnId:"",
			courseId:10,
			current:5,
			isNext:false,
			isPrev:false,
			lateralCover:"https://yun.duiba.com.cn/youfen/images/pwtwohkgvh.jpg",
			lecturerId:8,
			lecturerName:undefined,
			playbackProgress: 20,
			powerLevel:1,
			src:"http://mp3.qqmusic.cc/yq/208662441.mp3",
			timeLength:803,
			title:"当他不回你消息在想什么",
			verticalCover:"",
			watchable:30
		},
		// 是否正在播放
		playing: false,
		// 是否正在加载
		waiting: false,
		// 播放类型   1是正序  2是倒序 
		playType: 1,
		// 当前播放的时间
		currentTime: 0,
		// 音乐的播放时长
		musicDuration: 0,
		// 音乐是否在加载
		musicLoadStart: false
};
