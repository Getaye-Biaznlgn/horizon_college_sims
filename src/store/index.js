import { createStore } from 'vuex'
import apiClient from "./baseUrl"
import dean from './employee/dean'
export default createStore({
   modules: {
    dean
  },
  state: {
    programs:[],// still im not using it
    isItemLoading:'',
    isLoading:'',//loading for entry page
  },
  mutations:{
    setPrograms(state, programs){
      state.programs = programs
    },
    setIsItemLoading(state, isItemLoading){
      state.isItemLoading = isItemLoading
    },
    setIsLoading(state, isLoading){
      state.isLoading = isLoading
    }
  },
  getters:{
     programs(state){
       return state.programs
     },
     isItemLoading(state){
       return state.isItemLoading
     },
     isLoading(state){
      return state.isLoading
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
  
})
