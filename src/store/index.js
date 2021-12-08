import { createStore } from 'vuex'
import apiClient from "./baseUrl"

export default createStore({
  state: {
    programs:[]
  },
  mutations:{
    setPrograms(state, programs){
      state.programs = programs
    }
  },
  getters:{
     programs(state){
       return state.programs
     }
  },
  actions: {
      async fetchPrograms({ commit }) {
          try {
              // commit('setIsLoading', true)
              var response = await apiClient.get()
              if (response.status === 200) {
                  commit('setPrograms',response.data)
              } else {
                  throw 'faild to load programs'
              }
          } catch (e) {
              console.log(e.response)
              throw e
          } finally {
              // commit('setIsLoading', false)
          }
      }
    },
  modules: {
  }
})
