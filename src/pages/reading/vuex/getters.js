
export default {
    // 获取audio元素
	getAudioElement: state => state.audioelement,
	// 获取audio信息
	getAudioInfo: state => state.readAudio,
	// 获取播放列表ids
	getReadIds: state => state.readIds,
	// 获取音乐是否播放
	getIsPlaying: state => state.readPlaying,
	// 获取音乐是否加载
	getIsWaiting: state => state.readWaiting,
	// 获取当前的播放进度
	getCurrentTime: state => state.readCurrentTime,
	// 获取音乐的播放时长
	getMusicDuration: state => state.readDuration,
	// 获取来源页面referer
	getReferer: state => state.referer,
    getEnterTime: state => state.enterTime,
    // h5分享获取当前的播放进度
	getShareCurrentTime: state => state.shareCurrentTime,
	// h5分享获取音乐的播放时长
	getShareMusicDuration: state => state.shareDuration,
};
