import { createStore } from 'vuex'
import apiClient from "../resources/baseUrl"
import dean from './employee/dean'
import auth from './employee/auth'
import degreeHead from './employee/degree_head/index'
import registrar from './employee/registrar'
import cashier from './employee/cashier'
import tvetHead from './employee/tvet_head/index'
import studentAuth from './student/auth'
import teacher from './employee/teacher'
export default createStore({
    modules: {
        studentAuth,
        dean,
        registrar,
        cashier,
        // auth,
        // degreeHead,

        auth, //staff auth
        degreeHead,
        tvetHead,
        teacher
    },
    state: {
        programs: [], // still im not using it
        isItemLoading: '',
        isLoading: null, //loading for entry page,
        academicYears: [],
        selectedAcademicYearId: '',
        acYearId: '',
        notifications: null
    },
    mutations: {
        setPrograms(state, programs) {
            state.programs = programs
        },
        setIsItemLoading(state, isItemLoading) {
            state.isItemLoading = isItemLoading
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading
        },
        setAcademicYears(state, payload) {
            state.academicYears = payload
        },
        setSelectedAcademicYearId(state, payload) {
            state.selectedAcademicYearId = payload
        },
        setSelectedAcYearId(state, year) {
            state.acYearId = year
        },
        setNotifications(state, value) {
            state.notifications = value
        }

    },
    getters: {
        programs(state) {
            return state.programs
        },
        isItemLoading(state) {
            return state.isItemLoading
        },
        isLoading(state) {
            return state.isLoading
        },
        academicYears(state) {
            return state.academicYears
        },
        selectedAcademicYearId(state) {
            return state.selectedAcademicYearId
        },
        acYearId(state) {
            return state.acYearId
        },
        // selectedAcademicYear(state) {
        //     return state.selectedAcademicYear
        // },
        notifications(state) {
            return state.notifications
        },
        getYearById(state) {
            return function(id) {
                let year
                state.academicYears.forEach((item) => {
                    if (item.id === Number(id))
                        year = item
                })
                return year
            }
        }

    },
    actions: {
        async fetchPrograms({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get('/api/programs')
                if (response.status === 200) {
                    commit('setPrograms', response.data)
                } else {
                    throw 'faild to load programs'
                }
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchAcademicYears({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get('/api/academic_years')
                if (response.status === 200) {
                    commit('setAcademicYears', response.data)
                    console.log('fetch year', response.data)
                } else {
                    throw 'faild to load AcademicYears'
                }
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                commit('setIsLoading', false)
            }
        }
    },
})