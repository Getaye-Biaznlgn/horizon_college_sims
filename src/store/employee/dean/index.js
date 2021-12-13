import apiClient from "../../baseUrl"
import axios from "axios"

export default {
    namespaced: true,
    state() {
        return {
            teachers: [],
            registrars: [],
            departmentHeads: [],
            cashiers: [],
            employees: [],
            isLoading: null,
            degreeDepartments: []
        }
    },
    getters: {
        teachers(state) {
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
        employees(state) {
            return state.employees
        },
        isLoading(state) {
            return state.isLoading
        },
        degreeDepartments(state) {
            return state.degreeDepartments
        },
    },
    mutations: {
        setTeacher(state, teacher) {
            state.teachers = teacher
        },
        setDepartmentHead(state, depHad) {
            state.departmentHeads = depHad
        },
        setRegistrar(state, registrar) {
            state.registrars = registrar
        },
        setCashier(state, cashier) {
            state.cashiers = cashier
        },
        setEmployee(state, employee) {
            state.employees = employee
        },
        setIsLoading(state, value) {
            state.isLoading = value
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
                var response = await apiClient.get('api/teachers')
                if (response.status === 200) {
                    console.log('teachers from server')
                    console.log(response.data)
                    commit('setTeacher', response.data)
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
        async fetchDepartmentHeads({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get('api/department_heads')
                if (response.status === 200) {
                    commit('setDepartmentHead', response.data)
                } else {
                    throw 'faild to load Department head list'
                }
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchRegistrars({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get('api/get_registrars')
                if (response.status === 200) {
                    commit('setRegistrar', response.data)
                } else {
                    throw 'faild to load registrar list'
                }
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                commit('setIsLoading', false)
            }
        },
        async fetchCashiers({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get('api/get_cashiers')
                if (response.status === 200) {
                    commit('setCashier', response.data)
                } else {
                    throw 'faild to load Cashier list'
                }
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                commit('setIsLoading', false)
            }
        },
        async addTeachers(context, teacher) {
            console.log('inside teacher registration actions')
            console.log(teacher)
            try {
                context.commit('setIsLoading', true)
                var response = await axios.post('http://192.168.1.8:8000/api/teachers', teacher)
                if (response.status === 201) {
                    console.log('added teacher from server')
                    console.log(response.data)
                    var previousTeacher = context.getters.teachers
                    previousTeacher.push(response.data)
                    context.commit('setTeacher', previousTeacher)
                } else {
                    throw 'faild to register teacher '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async addDepartmentHead(context, deptHead) {
            try {
                context.commit('setIsLoading', true)
                console.log(deptHead)
                var response = await apiClient.post('api/employees', deptHead)
                console.log('response.status' + response.status)
                if (response.status === 201) {
                    console.log('response from server')
                    console.log(response.data)
                    var previousDeptHead = context.getters.departmentHeads
                    previousDeptHead.push(response.data)
                    context.commit('setDepartmentHead', previousDeptHead)
                } else {
                    throw 'faild to register Department head'
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async addCashier(context, cashier) {
            try {
                context.commit('setIsLoading', true)
                var response = await apiClient.post('api/employees', cashier)
                if (response.status === 201) {
                    console.log('response from server')
                    console.log(response.data)
                    var previousCashier = context.getters.cashiers
                    previousCashier.push(response.data)
                    context.commit('setCashier', previousCashier)
                } else {
                    throw 'faild to register Department head'
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async addRegistrar(context, registrar) {
            try {
                context.commit('setIsLoading', true)
                var response = await apiClient.post('api/employees', registrar)
                if (response.status === 201) {
                    console.log('response adding registrar from server')
                    console.log(response.data)
                    var previousRegistrar = context.getters.registrars
                    previousRegistrar.push(response.data)
                    context.commit('setRegistrar', previousRegistrar)
                } else {
                    throw 'faild to register registrar'
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async updateTeacher(context, teacher) {
            console.log('inside update actions')
            try {
                context.commit('setIsLoading', true)
                var response = await apiClient.put('api/teachers/' + teacher.id, teacher)
                console.log('status code =' + response.status)
                if (response.status === 200) {
                    console.log('update teacher from server')
                    console.log(response.data)
                    var previousTeacher = context.getters.teachers
                    var index = previousTeacher.findIndex((oneTeacher) => {
                        return oneTeacher.id === teacher.id
                    })
                    previousTeacher[index] = response.data
                    context.commit('setTeacher', previousTeacher)
                } else {
                    throw 'faild to update teacher '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async updateDepartmentHead(context, departmentHead) {
            console.log('inside update actions')
            console.log(departmentHead)
            try {
                context.commit('setIsLoading', true)
                var response = await apiClient.put('api/employees/' + departmentHead.id, departmentHead)
                if (response.status === 200) {
                    console.log('update departmentHead from server')
                    console.log(response.data)
                    var previousdepartmentHead = context.getters.departmentHeads
                    var index = previousdepartmentHead.findIndex((deptHead) => {
                        return deptHead.id === departmentHead.id
                    })
                    previousdepartmentHead[index] = response.data
                    context.commit('setDepartmentHead', previousdepartmentHead)
                } else {
                    throw 'faild to update department head '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async updateRegistrar(context, registrar) {
            console.log('inside update actions')
            console.log(registrar)
            try {
                context.commit('setIsLoading', true)
                var response = await apiClient.put('api/employees/' + registrar.id, registrar)
                if (response.status === 200) {
                    console.log('update registrar from server')
                    console.log(response.data)
                    var previousregistrar = context.getters.registrars
                    var index = previousregistrar.findIndex((oneRegistrar) => {
                        return oneRegistrar.id === registrar.id
                    })
                    previousregistrar[index] = response.data
                    context.commit('setRegistrar', previousregistrar)
                } else {
                    throw 'faild to update department head '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async updateCashier(context, cashier) {
            console.log('inside update actions')
            console.log(cashier)
            try {
                context.commit('setIsLoading', true)
                var response = await apiClient.put('api/employees/' + cashier.id, cashier)
                if (response.status === 200) {
                    console.log('update cashier from server')
                    console.log(response.data)
                    var previousCashier = context.getters.cashiers
                    var index = previousCashier.findIndex((onecashier) => {
                        return onecashier.id === cashier.id
                    })
                    previousCashier[index] = response.data
                    context.commit('setCashier', previousCashier)
                } else {
                    throw 'faild to update department head '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async deleteTeacher(context, teacherId) {
            console.log('inside delete teacher actions')
            console.log(teacherId)
            try {
                context.commit('setIsLoading', true)
                var response = await apiClient.delete('api/teachers/' + teacherId)
                if (response.status === 200) {
                    console.log('delete teacher from server')
                    console.log(response.data)
                    var previousTeacher = context.getters.teachers
                    var index = previousTeacher.findIndex((oneTeacher) => {
                        return oneTeacher.id === teacherId
                    })
                    previousTeacher.splice(index, 1)
                    context.commit('setTeacher', previousTeacher)
                } else {
                    throw 'faild to delete teacher '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async deleteDepartmentHead(context, deptHeadId) {
            console.log('inside delete department head actions')
            console.log(deptHeadId)
            try {
                context.commit('setIsLoading', true)
                var response = await apiClient.delete('api/employees/' + deptHeadId)
                console.log('response code')
                console.log(response.status)
                if (response.status === 200) {
                    console.log('delete department head from server')
                    console.log(response.data)
                    var previousDeptHead = context.getters.departmentHeads
                    var index = previousDeptHead.findIndex((oneTeacher) => {
                        return oneTeacher.id === deptHeadId
                    })
                    previousDeptHead.splice(index, 1)
                    context.commit('setDepartmentHead', previousDeptHead)
                } else {
                    throw 'faild to delete department head '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async deleteRegistrar(context, registrarId) {
            console.log('inside delete registrar actions')
            console.log(registrarId)
            try {
                context.commit('setIsLoading', true)
                var response = await apiClient.delete('api/employees/' + registrarId)
                if (response.status === 200) {
                    console.log('delete registrar from server')
                    console.log(response.data)
                    var previousRegistrar = context.getters.registrars
                    var index = previousRegistrar.findIndex((oneRegistrar) => {
                        return oneRegistrar.id === registrarId
                    })
                    previousRegistrar.splice(index, 1)
                    context.commit('setRegistrar', previousRegistrar)
                } else {
                    throw 'faild to delete registrar '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
        async deleteCashier(context, cashierId) {
            console.log('inside delete cashier actions')
            console.log(cashierId)
            try {
                context.commit('setIsLoading', true)
                var response = await apiClient.delete('api/employees/' + cashierId)
                if (response.status === 200) {
                    console.log('delete cashiers from server')
                    console.log(response.data)
                    var previousCashier = context.getters.cashiers
                    var index = previousCashier.findIndex((onecashier) => {
                        return onecashier.id === cashierId
                    })
                    previousCashier.splice(index, 1)
                    context.commit('setCashier', previousCashier)
                } else {
                    throw 'faild to delete cashier '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                context.commit('setIsLoading', false)
            }
        },
    }
}