
export default {
    // 获取audio元素
	getAudioElement: state => state.audioelement,
	// 获取audio信息
	getAudioInfo: state => state.audio,
	// 获取当前播放的索引
	getCurrentIndex: state => state.currentIndex,
	// 获取音乐播放列表信息
	getMusicList: state => state.musicList,
	// 获取音乐全部信息
	getMusicAllList: state => state.musicAllList,
	// 获取音乐是否播放
	getIsPlaying: state => state.playing,
	// 获取音乐是否加载
	getIsWaiting: state => state.waiting,
	// 获取音乐是否打开底部音乐列表
	getMusicDetail: state => state.showMusicDetail,
	// 获取播放类型
	getMusicPlayType: state => state.playType,
	// 获取当前的播放进度
	getCurrentTime: state => state.currentTime,
	// 获取音乐的播放时长
	getMusicDuration: state => state.musicDuration,
	// 音乐开始加载
	getIsLoadStart: state => state.musicLoadStart,
	// 获取歌单列表的显示状态
	getIsShowSongSheet: state => state.showSongSheet,
	// 获取歌单信息
	getMusicSheetList: state => state.musicSheetList,
	// 获取歌单图片颜色
	getSongSheetImageColor: state => state.songSheetImageColor,
	// 获取音乐歌单类型
	getMusiSheetType: state => state.musicSheetType,
	// 获取音乐歌词当前播放的索引
	getLyricIndex: state => state.lyricIndex
};
