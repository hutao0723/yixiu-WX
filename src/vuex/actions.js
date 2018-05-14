
export default {
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
};
