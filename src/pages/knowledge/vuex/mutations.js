import play from '../api/play'
export default {
    // play设置
		play (state) {
			state.audio.musicTryEnd = false
			state.playing = true
			state.audioelement.play()
		},
		// 暂停设置
		pause (state) {
			state.playing = false
			state.audioelement.pause()
		},
		togglePlay (state) {
			if (state.playing) {
				state.playing = false
				state.audioelement.pause()
			} else {
				state.playing = true
				state.audioelement.play()
			};
			if (state.audio.columnId) {
				    if (state.audio.powerLevel) play.syncProgress(state.audio.columnId,state.audio.courseId,state.currentTime)
				} else {
					if (state.audio.powerLevel && state.audio.price) play.syncProgress(state.audio.columnId,state.audio.courseId,state.currentTime)
				}
		},
		// 更新音乐数据
		setAudio (state, obj) {
			state.audio = obj.audio
		},
		// 获取音乐元素 Dom
		setAudioElement (state, ele) {
			state.audioelement = ele
		},
		setPlayType (state) {
			if (state.playType === 3) {
				state.playType = 1
			} else {
				state.playType ++
			}
		},
		// 设置音乐结束自动播放播放类型的歌曲
		playEnded (state) {
			if (state.audio.isNext) {
				play.startAudio(state.audio.columnId, state.audio.courseId, 'next')
			} else {
				if (state.audio.columnId) {
				    if (state.audio.powerLevel) play.syncProgress(state.audio.columnId,state.audio.courseId,state.currentTime)
				} else {
					if (state.audio.powerLevel && state.audio.price) play.syncProgress(state.audio.columnId,state.audio.courseId,state.currentTime)
				}
				state.audioelement.load()
				state.audioelement.pause()
			}	
		},
		setCurrentTime (state, obj) {
			state.currentTime = obj.time
		},
		setMusicDuration (state, obj) {
			state.musicDuration = obj.duration
		},
		// 设置音乐是否正在加载
		setMusicLoadStart (state, obj) {
			state.musicLoadStart = obj.isloadstart;
			if (state.audioelement.currentTime === 0 && state.audio.playbackProgress < state.musicDuration) state.audioelement.currentTime = state.audio.playbackProgress;
		},
		// 设置音乐试听结束
		setMusicTryEnd (state) {
			state.audio.musicTryEnd = true;
		},
		// 设置音乐停止播放状态
		setPlaying (state) {
			state.playing = false;
		},
	// 曝光参数设置
	    // 设置referer
	    setReferer (state, obj) {
	    	state.referer = obj.referer;
	    }
}
