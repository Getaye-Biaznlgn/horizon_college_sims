import apiClient from "../../baseUrl"

//import apiClient from '../../baseUrl'
export default {
    namespaced: true,
    state() {
        return {
            degreeStudents: [],
            tvetStudents: [],
            activeYearSemesters: [],
            acadamicYearMounths: [],
            levels: []

        }
    },
    getters: {
        degreeStudents(state) {
            return state.degreeStudents
        },
        tvetStudents(state) {
            return state.tvetStudents
        },
        activeYearSemesters(state) {
            return state.activeYearSemesters
        },
        acadamicYearMounths(state) {
            return state.acadamicYearMounths
        },
        levels(state) {
            return state.levels
        }
    },
    mutations: {
        setDegreeStudent(state, student) {
            state.degreeStudents = student
        },
        setTvetStudent(state, student) {
            state.tvetStudents = student
        },
        setActiveYearSemesters(state, semester) {
            state.activeYearSemesters = semester
        },
        setAcadamicYearMounths(state, mounth) {
            state.acadamicYearMounths = mounth
        },
        setLevels(state, level) {
            state.levels = level
        }

    },
    actions: {
        async fetchDegreeStudents({ commit, rootState }) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get('api/degree_students')
                if (response.status === 200) {
                    console.log('setDegreeStudent')
                    console.log(response.data)
                    commit('setDegreeStudent', response.data)
                } else {
                    throw 'faild to load Degree Students'
                }
            } catch (e) {
                console.log('error occurd')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchTvetStudents({ commit, rootState }) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get('api/tvet_students')
                if (response.status === 200) {
                    console.log('setTvetStudent')
                    console.log(response.data)
                    commit('setTvetStudent', response.data)
                } else {
                    throw 'faild to load Tvet Students'
                }
            } catch (e) {
                console.log('error occurd')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchActiveYearSemister({ commit, rootState }) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get('api/semesters')
                if (response.status === 200) {
                    console.log('setActiveYearSemesters')
                    console.log(response.data)
                    commit('setActiveYearSemesters', response.data)
                } else {
                    throw 'faild to load active year semesters'
                }
            } catch (e) {
                console.log('error occurd')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchAcadamicMounths({ commit, rootState }) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get('api/months')
                if (response.status === 200) {
                    console.log('setAcadamicYearMounth')
                    console.log(response.data)
                    commit('setAcadamicYearMounths', response.data)
                } else {
                    throw 'faild to load active year mounths'
                }
            } catch (e) {
                console.log('error occcured')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchLevels({ commit, rootState }) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get('api/levels')
                if (response.status === 200) {
                    console.log('setLevels')
                    console.log(response.data)
                    commit('setLevels', response.data)
                } else {
                    throw 'faild to load levels'
                }
            } catch (e) {
                console.log('error occcured')
            } finally {
                rootState.isLoading = false
            }
        }
    }
}