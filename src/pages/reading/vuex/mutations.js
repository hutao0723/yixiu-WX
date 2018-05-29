import play from '../api/play'
export default {
    // play设置
	play (state) {
		state.readPlaying = true;
		state.audioelement.play()
	},
	// 暂停设置
	pause (state) {
		state.readPlaying = false
		state.audioelement.pause()
	},
	togglePlay (state) {
		if (state.readPlaying) {
			state.readPlaying = false
			state.audioelement.pause()
		} else {
			state.readPlaying = true
			state.audioelement.play()
		};
		play.syncProgress(state.readAudio.readId, state.readAudio.courseId, state.readCurrentTime)
	},
	// 更新音乐数据
	setAudio (state, obj) {
		state.readAudio = obj.readAudio
	},
	// 更新播放id列表
	setReadIds(state, obj) {
		state.readIds = obj.readIds
	},
	// 更新播放列表
	setReadList (state, obj) {
		state.readList = obj.readList
	},
	// 获取音乐元素 Dom
	setAudioElement (state, ele) {
		state.audioelement = ele
	},
	// 设置音乐结束自动播放播放类型的歌曲
	playEnded (state) {
		if (state.readAudio.clockState){
          if (state.readAudio.isNext) {
				play.audioNext()
			} else {
				play.syncProgress(state.readAudio.readId, state.readAudio.courseId, state.readCurrentTime)
				state.audioelement.load()
				state.audioelement.pause()
			}
		} else {
			state.showCardModal = true;
			play.syncProgress(state.readAudio.readId, state.readAudio.courseId, state.readCurrentTime)
			state.audioelement.load()
			state.audioelement.pause()
		}	
	},
	setCurrentTime (state, obj) {
		state.readCurrentTime = obj.time
	},
	setReadDuration (state, obj) {
		state.readDuration = obj.duration
	},
	// 设置音乐是否正在加载
	setReadLoadStart (state, obj) {
		state.readLoadStart = obj.isloadstart;
	},
	// 设置音乐停止播放状态
	setPlaying (state) {
		state.readPlaying = false;
	},
	// 重置打卡弹窗
	resetShowCardModal (state) {
		state.showCardModal = false;
	},
    // 曝光参数设置
    // 设置referer
    setReferer (state, obj) {
    	state.referer = obj.referer;
    },
    setBottomNavType(state, obj) {
      state.bottomNavType = obj.bottomNavType;
    },
    setBottomNavToggle(state, obj) {
      state.bottomNavToggle = obj.bottomNavToggle;
    }
}

