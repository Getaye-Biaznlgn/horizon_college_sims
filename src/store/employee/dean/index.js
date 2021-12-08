import apiClient from "../baseUrl"

export default {
    state() {
        return {
            teachers: [],
            registrars: [],
            departmentHeads: [],
            cashiers: [],
            degreeDepartments: []
        }
    },
    getters: {
        teacher(state) {
            return state.teachers
        },
        departmentHeads(state) {
            return state.departmentHeads
        },
        registrars(state) {
            return state.registrars
        },
        cashiers(state) {
            return state.cashiers
        },
        degreeDepartments(state) {
            return state.degreeDepartments
        },
    },
    mutations: {
        setTeacher(state, teacher) {
            state.teachers = teacher
        },
        setDepartmentHed(state, depHad) {
            state.departmentHeads = depHad
        },
        setRegistrar(state, registrar) {
            state.registrars = registrar
        },
        setCashier(state, cashier) {
            state.cashiers = cashier
        },
        setDegreeDepatments(state, degreeDepartments) {
            state.degreeDepartments = degreeDepartments
        },
    },

    actions: {
        async fetchDegreeDepartments({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get()
                if (response.status === 200) {
                    commit('setDegreeDepartment', '')
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
        async fetchTeachers({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get()
                if (response.status === 200) {
                    commit('setTeachers', response.data)
                } else {
                    throw 'faild to load teacher list'
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