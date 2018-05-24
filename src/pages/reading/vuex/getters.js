
export default {
    // 获取audio元素
	getAudioElement: state => state.audioelement,
	// 获取audio信息
	getAudioInfo: state => state.audio,
	// 获取音乐是否播放
	getIsPlaying: state => state.playing,
	// 获取音乐是否加载
	getIsWaiting: state => state.waiting,
	// 获取播放类型
	getMusicPlayType: state => state.playType,
	// 获取当前的播放进度
	getCurrentTime: state => state.currentTime,
	// 获取音乐的播放时长
	getMusicDuration: state => state.musicDuration,
	// 获取来源页面referer
	getReferer: state => state.referer
};
