// 测面滑动菜单效果
const audioInfo = {
	state: {
		// audio元素
		audioelement: '',
		// audio信息
		audio: {
			id: 0,
			name: '',
			singer: '',
			url: 'http://www.daiwei.org/vue/music/%E6%9E%97%E4%BF%8A%E6%9D%B0,%E8%94%A1%E5%8D%93%E5%A6%8D%20-%20%E5%B0%8F%E9%85%92%E7%AA%9D.mp3',
			img_url: '',
			type: '',
			lyric: ''
		},
		// 是否正在播放
		playing: false,
		// 是否正在加载
		waiting: false,
		// 播放类型   1是自动播放  2是循环播放  3是随机播放
		playType: 1,
		// 当前播放的时间
		currentTime: 0,
		// 音乐的播放时长
		musicDuration: 0,
		// 音乐是否在加载
		musicLoadStart: false
	},
	getters: {
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
	},
	mutations: {
		// play设置
		play (state) {
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
		// 初始化音乐
		initAudio (state) {
			if (state.musicList) {
				alert(1)
			} else {
				alert(2)
			}
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
			let type = state.playType
			if (type === 1) {
				state.currentIndex ++
				const length = state.musicList.length
				if (state.currentIndex >= length) {
					state.currentIndex = 0
				}
				state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
				state.playing = true
				state.audioelement.load()
				state.audioelement.play()
			}
			if (type === 2) {
				state.audioelement.currentTime = 0
				state.playing = true
				state.audioelement.play()
			}
			if (type === 3) {
				const length = state.musicList.length
				state.currentIndex = Math.floor(Math.random() * length)
				state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
				state.playing = true
				state.audioelement.load()
				state.audioelement.play()
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
		}
	},
	actions: {
		set_AudioElement ({commit}, ele) {
			commit('setAudioElement', ele)
		},
		set_MusicDetail ({commit}, obj) {
			commit('setMusicDetail', obj)
		},
		set_CurrentTime ({commit}, obj) {
			commit('setCurrentTime', obj)
		},
		set_MusicDuration ({commit}, obj) {
			commit('setMusicDuration', obj)
		},
		play_Next ({commit}) {
			commit('playNext')
		},
		play_Prev ({commit}) {
			commit('playPrev')
		},
		play_Index ({commit}, obj) {
			commit('playIndex', obj)
		},
		play_Ended ({commit}) {
			commit('playEnded')
		}
	}
}
export default audioInfo
