
export default {
    // audio元素
	audioelement: '',
	// audio信息
	audio: {
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
	musicLoadStart: false,
	// 曝光参数相关
	referer: ''
};
