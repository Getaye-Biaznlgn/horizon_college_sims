import apiClient from "../../baseUrl"
import axios from 'axios'
import url from "../../url"
export default {
    namespace:true,
    state: {
        degreeDepartments:[],
        tvetDepartments:[],
        courses:[],
        modules:[],
        degreePrograms:[],
        tvetPrograms:[],
        teachers: [],
        registrars: [],
        departmentHeads: [],
        cashiers: [],
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
        tvetDepartments(state) {
            return state.tvetDepartments
        },
        courses(state){
            return state.courses
        },
        modules(state){
            return state.modules
        },
        degreePrograms(state){
            return state.degreePrograms
        },
        tvetPrograms(state){
            return state.tvetPrograms
        },
    },
    mutations: {
        setDegreeDepartments(state, degreeDepartments) {
            state.degreeDepartments = degreeDepartments
        },
        setTvetDepartments(state, tvetDepartments) {
            state.tvetDepartments = tvetDepartments
        },
       
        setCourses(state, courses){
            state.courses=courses
        },
        setModules(state, modules){
            state.modules=modules
            
        },
        setDegreePrograms(state, degreePrograms){
            state.degreePrograms=degreePrograms
        },
        setTvetPrograms(state, tvetPrograms){
            state.tvetPrograms=tvetPrograms
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
        }
    },

    actions: {
        async fetchDegreeDepartments({ commit, }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(url.baseUrl+"/api/degree_departments")
                if (response.status === 200) {
                    commit('setDegreeDepartments', response.data)
                    console.log('degree_department', response.data)
                } else {
                    throw 'faild to load degree department'
                }
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                commit('setIsLoading', false)
            }
        },

        async addDegreeDepartment(context, degreeDepartment) {
            try {
                var response = await axios.post(url.baseUrl+'/api/degree_departments', JSON.stringify(degreeDepartment),
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                console.log('add degree department ---' + response.status)
                if (response.status === 200) {
                    var previousData = context.getters.degreeDepartments
                    previousData.push(response.data)
                    context.commit('setDegreeDepartments', previousData)
                } else {
                    throw 'faild to add'
                }
            } catch (e) {
                console.log(e)
                throw e
            }
        },
        async updateDegreeDepartment (context, paylod) {
            try {
              var response = await axios.put(url.baseUrl+'/api/degree_departments/'+ paylod.id, JSON.stringify(paylod),
              {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
              console.log('update degree department response status'+ response.status)
              if (response.status === 200) {
                var previousData = context.getters.degreeDepartments
              const editedIndex =  previousData.findIndex((department)=>{
                   return department.id === paylod.id
                })
                previousData[editedIndex] = response.data
                console.log('response data DegDep', response.data)
                context.commit('setDegreeDepartments', previousData)
              }else{
                throw 'faild to add update degree'
              }
            } catch (e) {
              console.log(e)
              throw e
            }
          },

          async assignDepartmentHead (context, paylod) {
            try {
              var response = await axios.post(url.baseUrl+'/api/assign_degree_department_head',paylod,
              {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
              console.log('update degree department response status'+ response.status)
              if (response.status === 200) {
                var previousData = context.getters.degreeDepartments
              const editedIndex =  previousData.findIndex((department)=>{
                   return department.id === paylod.department_id
                })
                previousData[editedIndex] = response.data
                console.log('response assign dep', response.data)
                context.commit('setDegreeDepartments', previousData)
              }else{
                throw 'faild to add update degree'
              }
            } catch (e) {
              console.log(e)
              throw e
            }
          },
        async fetchTvetDepartments({ commit, }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(url.baseUrl+"/api/tvet_departments")
                if (response.status === 200) {
                    commit('setTvetDepartments', response.data)
                    console.log('tvet_department', response.data)
                } else {
                    throw 'faild to load degree department'
                }
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                commit('setIsLoading', false)
            }
        },
        async addTvetDepartment(context, tvetDepartment) {
            try {
                var response = await axios.post(url.baseUrl+'/api/tvet_departments', JSON.stringify(tvetDepartment),
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                console.log('add degree department ---' + response.status)
                if (response.status === 200) {
                    var previousData = context.getters.tvetDepartments
                    previousData.push(response.data)
                    console.log('tvet_department', response.data)
                    context.commit('setTvetDepartments', previousData)
                } else {
                    throw 'faild to add'
                }
            } catch (e) {
                console.log(e)
                throw e
            }
        },
        async updateTvetDepartment (context, paylod) {
            
            try {
              var response = await axios.put(url.baseUrl+'/api/tvet_departments/'+ paylod.id, JSON.stringify(paylod),
              {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
              console.log('update tvet department response status'+ response.status)
              if (response.status === 200) {
                var previousData = context.getters.tvetDepartments
              const editedIndex =  previousData.findIndex((department)=>{
                   return department.id === paylod.id
                })
                previousData[editedIndex] = response.data
                context.commit('setTvetDepartments', previousData)
                
              }else{
                throw 'faild to update tvet department'
              }
            } catch (e) {
              console.log(e)
              throw e
            }
          },
          async assignTvetDepartmentHead (context, paylod) {
            try {
              var response = await axios.post(url.baseUrl+'/api/assign_tvet_department_head',paylod,
              {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
              console.log('update degree department response status'+ response.status)
              if (response.status === 200) {
                var previousData = context.getters.tvetDepartments
              const editedIndex =  previousData.findIndex((department)=>{
                   return department.id === paylod.department_id
                })
                previousData[editedIndex] = response.data
                console.log('response assign dep', response.data)
                context.commit('setTvetDepartments', previousData)
              }else{
                throw 'faild to add update degree'
              }
            } catch (e) {
              console.log(e)
              throw e
            }
          },
        async fetchCourses({ commit, }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(url.baseUrl+"/api/courses")
                if (response.status === 200) {
                    commit('setCourses', response.data)
                    console.log('tvet_courses', response.data)
                } else {
                    throw 'faild to load degree department'
                }
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                commit('setIsLoading', false)
            }
        },
        async addCourse(context, course) {
            try {
                var response = await axios.post(url.baseUrl+'/api/courses', JSON.stringify(course),
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                console.log('add courses ---' + response.status)
                if (response.status === 200) {
                    var previousData = context.getters.courses
                    previousData.push(response.data)
                    context.commit('setCourses', previousData)
                    console.log('addedCourses', response.data)
                } else {
                    throw 'faild to add'
                }
            } catch (e) {
                console.log(e)
                throw e
            }
        },
        async updateCourse (context, paylod) {
            try {
              var response = await axios.put(url.baseUrl+'/api/courses/'+ paylod.id, JSON.stringify(paylod),
              {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
              console.log('update courses response status'+ response.status)
              if (response.status === 200) {
                var previousData = context.getters.courses
              const editedIndex =  previousData.findIndex((course)=>{
                   return course.id === paylod.id
                })
                previousData[editedIndex] = response.data
                context.commit('setCourses', previousData)
              }else{
                throw 'faild to update tvet course'
              }
            } catch (e) {
              console.log(e)
              throw e
            }
          },
        async fetchModules({ commit, }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(url.baseUrl+"/api/modules")
                if (response.status === 200) {
                    commit('setModules', response.data)
                    console.log('modules', response.data)
                } else {
                    throw 'faild to load modules'
                }
            } catch (e) {
                console.log(e.response)
                throw e
            } finally {
                commit('setIsLoading', false)
            }
        },
        async addModule(context, tvetModule) {
            try {
                var response = await axios.post(url.baseUrl+'/api/modules', JSON.stringify(tvetModule),
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                console.log('add modules ---' + response.status)
                if (response.status === 201) {
                    var previousData = context.getters.modules
                    previousData.push(response.data)
                    context.commit('setModules', previousData)
                } else {
                    throw 'faild to add'
                }
            } catch (e) {
                console.log(e)
                throw e
            }
        },
        async updateModule (context, paylod) {
            try {
              var response = await axios.put(url.baseUrl+'/api/modules/'+ paylod.id, JSON.stringify(paylod),
              {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
              console.log('update module response status'+ response.status)
              if (response.status === 200) {
                var previousData = context.getters.modules
              const editedIndex =  previousData.findIndex((module)=>{
                   return module.id === paylod.id
                })
                previousData[editedIndex] = response.data
                context.commit('setModules', previousData)
                console.log('module update', response.data)
              }else{
                throw 'faild to update module'
              }
            } catch (e) {
              console.log(e)
              throw e
            }
          },
          
        async fetchDegreePrograms({ commit, }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(url.baseUrl+"/api/degree_programs")
                if (response.status === 200) {
                    commit('setDegreePrograms', response.data)
                    console.log('DegreePrograms', response.data)
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
        async fetchTvetPrograms({ commit, }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(url.baseUrl+"/api/tvet_programs")
                if (response.status === 200) {
                    commit('setTvetPrograms', response.data)
                    console.log('tvetPrograms', response.data)
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
        async fetchDepartmentHead({ commit }) {
            try {
                commit('setIsLoading', true)
                var response = await apiClient.get(url.baseUrl+"/api/department_heads")
                if (response.status === 200) {
                    commit('setDepartmentHeads', response.data)
                    console.log('department head', response.data)
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