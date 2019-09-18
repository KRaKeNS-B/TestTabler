import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    schedules: []
  },
  mutations: {
    setSchedules (state, schedules) {
      console.log(schedules)
      state.schedules = schedules
    }
  },
  actions: {

  }
})
