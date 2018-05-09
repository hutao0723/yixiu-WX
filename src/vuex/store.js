import Vue from 'vue';
import Vuex from 'vuex';
import AudioInfo from './modules/audio.js'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    allInfo: []
  },
  getters: {
    getAllInfo: state => state.allInfo
  },
  mutations: {
    setAllInfo (state, obj) {
      state.allInfo = obj
    }
  },
  actions: {
    set_AllInfo ({ commit }, obj) {
      commit('setAllInfo', obj)
    }
  },

  modules: {
    audioInfo: AudioInfo
  },
  plugins: [createPersistedState()]
})

export default store
