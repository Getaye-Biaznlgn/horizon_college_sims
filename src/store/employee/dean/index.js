import apiClient from "../baseUrl"

export default {
    state: {
        degreeDepartments:[],
        programs:[]
    },
    mutations: {
        setDegreeDepatments(state, degreeDepartments) {
            state.degreeDepartments = degreeDepartments
        },
        setPrograms(state, programs) {
            state.programs = programs
        },
    },
    getters: {
        degreeDepartments(state) {
            return state.degreeDepartments
        },
    },
    actions: {
        async fetchDegreeDepartments({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get()
                if (response.status === 200) {
                    commit('setDegreeDepartment','')
                } else {
                    throw 'faild to load perspective'
                }
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                commit('setIsLoading', false)
            }
        },

    }
}