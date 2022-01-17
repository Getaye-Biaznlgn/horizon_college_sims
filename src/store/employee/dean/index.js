import apiClient from "../../../resources/baseUrl"
export default {
    namespaced: true,
    state: {
        degreeDepartments: [],
        tvetDepartments: [],
        courses: [],
        modules: [],
        degreePrograms: [],
        tvetPrograms: [],
        teachers: [],
        registrars: [],
        departmentHeads: [],
        cashiers: [],
        yearMonths:[],
        dashboardData:{}
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
        tvetDepartments(state) {
            return state.tvetDepartments
        },
        courses(state) {
            return state.courses
        },
        modules(state) {
            return state.modules
        },
        degreePrograms(state) {
            return state.degreePrograms
        },
        tvetPrograms(state) {
            return state.tvetPrograms
        },
        dashboardData(state) {
            return state.dashboardData
        },
        yearMonths(state){
           return state.yearMonths
       }
    },
    mutations: {
        setYearMonths(state, months){
           state.yearMonths=months
        },
        setDegreeDepartments(state, degreeDepartments) {
            state.degreeDepartments = degreeDepartments
        },
        setTvetDepartments(state, tvetDepartments) {
            state.tvetDepartments = tvetDepartments
        },

        setCourses(state, courses) {
            state.courses = courses
        },
        setModules(state, modules) {
            state.modules = modules

        },
        setDegreePrograms(state, degreePrograms) {
            state.degreePrograms = degreePrograms
        },
        setTvetPrograms(state, tvetPrograms) {
            state.tvetPrograms = tvetPrograms
        },
        setTeacher(state, teacher) {
            state.teachers = teacher
        },
        setDepartmentHeads(state, depHad) {
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
        setDegreeDepatments(state, degreeDepartments) {
            state.degreeDepartments = degreeDepartments
        },
        setDashboardData(state, dashboardData){
            state.dashboardData=dashboardData
        },
    },

    actions: {
        async fetchDashboardData(context) {
            context.rootState.isLoading = true
            try {
                var response = await apiClient.get("/api/dean_dashboard")
                if (response.status === 200) {
                    context.commit('setDashboardData', response.data)
                } else {
                    throw 'faild to load degree department'
                }
            } finally {
                context.rootState.isLoading = false
            }
        },
        async fetchDegreeDepartments(context) {
            context.rootState.isLoading = true
            try {
                var response = await apiClient.get("/api/degree_departments")
                if (response.status === 200) {
                    context.commit('setDegreeDepartments', response.data)
                } else {
                    throw 'faild to load degree department'
                }
            } finally {
                context.rootState.isLoading = false
            }
        },
        async addDegreeDepartment(context, degreeDepartment) {
                var response = await apiClient.post('/api/degree_departments', JSON.stringify(degreeDepartment))
                if (response.status === 201) {
                    var previousData = context.getters.degreeDepartments
                    previousData.unshift(response.data)
                    context.commit('setDegreeDepartments', previousData)
                } else {
                    throw 'faild to add'
                }
        },
        async updateDegreeDepartment(context, paylode) {
                var response = await apiClient.put('/api/degree_departments/' + paylode.id, JSON.stringify(paylode), {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                console.log('update degree department response status' + response.status)
                if (response.status === 200) {
                    var previousData = context.getters.degreeDepartments
                    const editedIndex = previousData.findIndex((department) => {
                        return department.id === paylode.id
                    })
                    previousData[editedIndex] = response.data
                    context.commit('setDegreeDepartments', previousData)
                } else {
                    throw 'faild to add update degree'
                }
           
        },
        async deleteDegreeDepartment(context, id) {
                var response = await apiClient.delete('/api/degree_departments/' + id)
                console.log('delete degree department response status' + response.status)
                if (response.status === 200) {
                    var previousData = context.getters.degreeDepartments
                    const deletedIndex =  previousData.findIndex((dep)=>{
                      return dep.id === id
                   })
                    previousData.splice(deletedIndex,1)
                    context.commit('setDegreeDepartments', previousData)
                } else {
                    throw 'faild to add delete degree'
                }
        
        },
        async assignDepartmentHead(context, payload) {
                var response = await apiClient.post('/api/assign_degree_department_head', payload)
                if (response.status === 200) {
                    var previousData = context.getters.degreeDepartments
                    const editedIndex = previousData.findIndex((department) => {
                        return department.id === payload.department_id
                    })
                    previousData[editedIndex] = response.data
                    context.commit('setDegreeDepartments', previousData)
                } else {
                    throw 'faild to add update degree'
                }
        },
        async unAssignDegreeHead(context, payload) {
            var response = await apiClient.post('/api/unassign_degree_department_head', payload)
                if (response.status === 200) {
                    var previousData = context.getters.degreeDepartments
                    const editedIndex = previousData.findIndex((department) => {
                        return department.id === payload.department_id
                    })
                    previousData[editedIndex] = response.data
                    context.commit('setDegreeDepartments', previousData)
                } else {
                    throw 'faild to add update degree'
                }
        },
        async fetchTvetDepartments(context) {
            try {
                context.rootState.isLoading = true
                var response = await apiClient.get("/api/tvet_departments")
                if (response.status === 200) {
                    context.commit('setTvetDepartments', response.data)
                    console.log('tvet_department', response.data)
                } else {
                    throw 'faild to load degree department'
                }
            } finally {
                context.rootState.isLoading = false
            }
        },
        async deleteTvetDepartment(context, id) {
                var response = await apiClient.delete('/api/tvet_departments/'+id)
                if (response.status === 200) {
                    var previousData = context.getters.tvetDepartments
                    const deletedIndex =  previousData.findIndex((dep)=>{
                      return dep.id === id
                   })
                    previousData.splice(deletedIndex,1)
                    context.commit('setTvetDepartments', previousData)
                } else {
                    throw 'faild to add delete degree'
                }
           
        },
        async addTvetDepartment(context, tvetDepartment) {
                var response = await apiClient.post('/api/tvet_departments', JSON.stringify(tvetDepartment))
                if (response.status === 201) {
                    var previousData = context.getters.tvetDepartments
                    previousData.unshift(response.data)
                    context.commit('setTvetDepartments', previousData)
                } else {
                    throw 'faild to add'
                }
           
        },
        async updateTvetDepartment(context, paylode) {
                var response = await apiClient.put('/api/tvet_departments/' + paylode.id, JSON.stringify(paylode))
                console.log('update tvet department response status' + response.status)
                if (response.status === 200) {
                    var previousData = context.getters.tvetDepartments
                    const editedIndex = previousData.findIndex((department) => {
                        return department.id === paylode.id
                    })
                    previousData[editedIndex] = response.data
                    context.commit('setTvetDepartments', previousData)

                } else {
                    throw 'faild to update tvet department'
                }
           
        },
        async assignTvetDepartmentHead(context, paylode) {
                var response = await apiClient.post('/api/assign_tvet_department_head', paylode)
                if (response.status === 200) {
                    var previousData = context.getters.tvetDepartments
                    const editedIndex = previousData.findIndex((department) => {
                        return department.id === paylode.department_id
                    })
                    previousData[editedIndex] = response.data
                    context.commit('setTvetDepartments', previousData)
                } else {
                    throw 'faild to add update degree'
                }
        },
        async unAssignTvetHead(context, payload) {
            var response = await apiClient.post('/api/unassign_tvet_department_head', payload)
            if (response.status === 200) {
                var previousData = context.getters.tvetDepartments
                const editedIndex = previousData.findIndex((department) => {
                    return department.id === payload.department_id
                })
                previousData[editedIndex] = response.data
                context.commit('setTvetDepartments', previousData)
            } else {
                throw 'faild to add update degree'
            }
         },
        async fetchCourses(context) {
            try {
                context.rootState.isLoading = true
                var response = await apiClient.get("/api/courses")
                if (response.status === 200) {
                    context.commit('setCourses', response.data)
                    console.log('here courses', response.data)
                } else {
                    throw 'faild to load degree department'
                }
            }  finally {
                context.rootState.isLoading = false
            }
        },
        async addCourse(context, course) {
                var response = await apiClient.post('/api/courses', JSON.stringify(course))
                if (response.status === 200) {
                    var previousData = context.getters.courses
                    previousData.unshift(response.data)
                    context.commit('setCourses', previousData)
                } else {
                    throw 'faild to add'
                }
        },
        async deleteCourse(context, id) {
                var response = await apiClient.delete('/api/courses/' + id)
                if (response.status === 200) {
                    var previousData = context.getters.courses
                    const deletedIndex =  previousData.findIndex((course)=>{
                      return course.id === id
                   })
                    previousData.splice(deletedIndex,1)
                    context.commit('setCourses', previousData)
                } else {
                    throw 'faild to delete courses'
                }
        },
        async updateCourse(context, paylode) {
            try {
                var response = await apiClient.put( '/api/courses/' + paylode.id, JSON.stringify(paylode), {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                console.log('update courses response status' + response.status)
                if (response.status === 200) {
                    var previousData = context.getters.courses
                    const editedIndex = previousData.findIndex((course) => {
                        return course.id === paylode.id
                    })
                    previousData[editedIndex] = response.data
                    context.commit('setCourses', previousData)
                } else {
                    throw 'faild to update tvet course'
                }
            } catch (e) {
                console.log(e)
                throw e
            }
        },
        async fetchYearMonths(context) {
            try {
                context.rootState.isLoading = true
                var response = await apiClient.get("/api/months")
                if (response.status === 200) {
                    context.commit('setYearMonths', response.data)
                } else {
                    throw 'faild to '
                }
            } finally {
                context.rootState.isLoading = false
            }
        },
        async fetchModules({ commit, rootState }) {
            try {
                rootState.isLoading = true
                var response = await apiClient.get("/api/modules")
                if (response.status === 200) {
                    commit('setModules', response.data)
                } else {
                    throw 'faild to load modules'
                }
            } finally {
                rootState.isLoading = false
            }
        },
        async addModule(context, tvetModule) {
                var response = await apiClient.post('/api/modules', JSON.stringify(tvetModule))
                if (response.status === 200) {
                    var previousData = context.getters.modules
                    previousData.unshift(response.data)
                    context.commit('setModules', previousData)
                } else {
                    throw 'faild to add'
                }
        },
        async updateModule(context, paylode) {  
                var response = await apiClient.put( '/api/modules/' + paylode.id, JSON.stringify(paylode))
                if (response.status === 200) {
                    var previousData = context.getters.modules
                    const editedIndex = previousData.findIndex((module) => {
                        return module.id === paylode.id
                    })
                    previousData[editedIndex] = response.data
                    context.commit('setModules', previousData)
                } else {
                    throw 'faild to update module'
                }
            
        },
        async deleteModule(context, id) {
                var response = await apiClient.delete('/api/modules/' + id)
                console.log('delete module response status' + response.status)
                if (response.status === 200) {
                    var previousData = context.getters.modules
                    const deletedIndex =  previousData.findIndex((dep)=>{
                      return dep.id === id
                   })
                    previousData.splice(deletedIndex,1)
                    context.commit('setModules', previousData)
                } else {
                    throw 'faild to delete module'
                }
           
        },
        // async fetchDegreePrograms({ commit, rootState }) {
        //     try {
        //         rootState.isLoading = true
        //         var response = await apiClient.get("/api/degree_programs")
        //         if (response.status === 200) {
        //             commit('setDegreePrograms', response.data)
        //             console.log('DegreePrograms', response.data)
        //         } else {
        //             throw 'faild to load programs'
        //         }
        //     } catch (e) {
        //         console.log(e.response)
        //         throw e
        //     } finally {
        //         rootState.isLoading = false
        //     }
        // },
        // async fetchTvetPrograms({ commit, rootState }) {

        //     try {
        //         rootState.isLoading = true
        //         var response = await apiClient.get("/api/tvet_programs")
        //         if (response.status === 200) {
        //             commit('setTvetPrograms', response.data)
        //             console.log('tvetPrograms', response.data)
        //         } else {
        //             throw 'faild to load programs'
        //         }
        //     } catch (e) {
        //         console.log(e.response)
        //         throw e
        //     } finally {
        //         rootState.isLoading = false

        //     }
        // },
        async fetchTeachers({ commit, rootState }) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get('api/teachers')
                if (response.status === 200) {
                    commit('setTeacher', response.data)
                    console.log('Teachers', response.data)
                } else {
                    throw 'faild to load teacher list'
                }
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchDepartmentHeads({ commit, rootState }) {
            try {
                rootState.isLoading = true
                var response = await apiClient.get('api/department_heads')
                if (response.status === 200) {
                    commit('setDepartmentHeads', response.data)
                } else {
                    throw 'faild to load Department head list'

                }
            } finally {
                rootState.isLoading = true
            }
        },
        async fetchRegistrars({ commit, rootState }) {
            try {
                rootState.isLoading = true
                var response = await apiClient.get('api/get_registrars')
                if (response.status === 200) {
                    commit('setRegistrar', response.data)
                } else {
                    throw 'faild to load registrar list'
                }
        
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchCashiers({ commit, rootState }) {
            try {
                rootState.isLoading = true
                var response = await apiClient.get('api/get_cashiers')
                if (response.status === 200) {
                    commit('setCashier', response.data)
                } else {
                    throw 'faild to load Cashier list'
                }
         
            } finally {
                rootState.isLoading = false
            }
        },
        async addTeachers(context, teacher) {
            try {
                var response = await apiClient.post('/api/teachers', teacher)
                if (response.status === 201) {
                    
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
            }
        },
        async addDepartmentHead(context, deptHead) {
            try {
                var response = await apiClient.post('api/employees', deptHead)
                if (response.status === 201) {
                  var previousDeptHead = context.getters.departmentHeads
                    previousDeptHead.push(response.data)
                    context.commit('setDepartmentHeads', previousDeptHead)
                } else {
                    throw 'faild to register Department head'
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            }
        },
        async addCashier(context, cashier) {
            try {
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
            }
        },
        async addRegistrar(context, registrar) {
            try {
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
            }
        },
        async updateTeacher(context, teacher) {
            console.log('inside update actions')
            try {
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
            }
        },
        async updateDepartmentHead(context, departmentHead) {
            console.log('inside update actions')
            console.log(departmentHead)
            try {
                var response = await apiClient.put('api/employees/' + departmentHead.id, departmentHead)
                if (response.status === 200) {
                    console.log('update departmentHead from server')
                    console.log(response.data)
                    var previousdepartmentHead = context.getters.departmentHeads
                    var index = previousdepartmentHead.findIndex((deptHead) => {
                        return deptHead.id === departmentHead.id
                    })
                    previousdepartmentHead[index] = response.data
                    context.commit('setDepartmentHeads', previousdepartmentHead)
                } else {
                    throw 'faild to update department head '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            }
        },
        async updateRegistrar(context, registrar) {
            console.log('inside update actions')
            console.log(registrar)
            try {
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
            }
        },
        async updateCashier(context, cashier) {
            console.log('inside update actions')
            console.log(cashier)
            try {
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
            }
        },
        async deleteTeacher(context, teacherId) {
            console.log('inside delete teacher actions')
            console.log(teacherId)
            try {
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
            }
        },
        async deleteDepartmentHead(context, deptHeadId) {
            console.log('inside delete department head actions')
            console.log(deptHeadId)
            try {
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
                    context.commit('setDepartmentHeads', previousDeptHead)
                } else {
                    throw 'faild to delete department head '
                }
                return response
            } catch (e) {
                console.log(e.response)
                throw e
            }
        },
        async deleteRegistrar(context, registrarId) {
            console.log('inside delete registrar actions')
            console.log(registrarId)
            try {
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
            }
        },
        async deleteCashier(context, cashierId) {
            console.log('inside delete cashier actions')
            console.log(cashierId)
            try {
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
            }
        },

    }
}
