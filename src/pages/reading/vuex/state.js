
export default {
    // audio元素
	audioelement: '',
	// 是否有在读课程
	readMission: true,
	// audio信息
	readaudio: {
		columnId: '',
		courseId: '',
		current: '',
		isNext: '',
		isPrev: '',
		lateralCover:"",
		lecturerId: '',
		lecturerName: '',
		playbackProgress: '',
		powerLevel: '',
		src: "",
		timeLength: '',
		title: "",
		verticalCover: "",
		watchable: ''
	},
	// 是否正在播放
	readplaying: false,
	// 是否正在加载
	readwaiting: false,
	// 当前播放的时间
	readcurrentTime: 0,
	// 音乐的播放时长
	readDuration: 0,
	// 音乐是否在加载
	readLoadStart: false,
	// 曝光参数相关
	referer: ''
};
