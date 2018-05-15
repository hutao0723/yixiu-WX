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
			}
		},
		// 开关显示底部列表
		toggerMusicDetail (state) {
			state.showMusicDetail = !state.showMusicDetail
		},
		// 更新音乐数据
		setAudio (state, obj) {
			state.audio = obj.audio
		},
		// 插入播放列表信息
		setMusicList (state, obj) {
			state.musicList = obj.list
		},
		// 插入所有音乐信息
		setMusicAllList (state, obj) {
			state.musicAllList = obj
			state.musicList = obj.all
		},
		// 获取音乐元素 Dom
		setAudioElement (state, ele) {
			state.audioelement = ele
		},
		// 关闭底部列表
		setMusicDetail (state, obj) {
			state.showMusicDetail = obj.isShow
		},
		setPlayType (state) {
			if (state.playType === 3) {
				state.playType = 1
			} else {
				state.playType ++
			}
		},
		// 播放下一曲
		playNext (state) {
			state.currentIndex ++
			const length = state.musicList.length
			if (state.currentIndex >= length) {
				state.currentIndex = 0
			}
			state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.playing = true
			state.audioelement.load()
			state.audioelement.play()
		},

		// 播放下一曲
		playPrev (state) {
			state.currentIndex --
			const length = state.musicList.length
			if (state.currentIndex < 0) {
				state.currentIndex = length - 1
			}
			state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.playing = true
			state.audioelement.load()
			state.audioelement.play()
		},

		// 设置当前的播放索引
		playIndex (state, obj) {
			state.currentIndex = obj.index
			state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.playing = true
			state.audioelement.load()
			state.audioelement.play()
		},

		// 设置音乐结束自动播放播放类型的歌曲
		playEnded (state) {
			if (state.audio.isNext) {
				state.audioelement.load()
				state.audioelement.play()
			} else {
				// state.audioelement.load()
				// state.audioelement.pause()
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
			state.musicLoadStart = obj.isloadstart
		},
		// 设置音乐试听结束
		setMusicTryEnd (state) {
			state.audio.musicTryEnd = true;
		}
}
