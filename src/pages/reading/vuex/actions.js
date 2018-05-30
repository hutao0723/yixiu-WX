
export default {
	set_AudioElement ({commit}, ele) {
		commit('setAudioElement', ele)
	},
	set_Audio ({commit}, obj) {
		commit('setAudio', obj)
	},
	set_CurrentTime ({commit}, obj) {
		commit('setCurrentTime', obj)
	},
	set_ReadDuration ({commit}, obj) {
		commit('setReadDuration', obj)
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
	},
	set_Referer ({commit}, obj) {
		commit('setReferer')
	}
};
