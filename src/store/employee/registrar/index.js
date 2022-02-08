import apiClient from "../../../resources/baseUrl"

//import apiClient from '../../baseUrl'
export default {
    namespaced: true,
    state() {
        return {
            degreeStudents: [],
            tvetStudents: [],
            activeYearSemesters: [],
            acadamicYearMounths: [],
            levels: [],
            resultNotifier: '',
            isSuccessed: false,
            isUploading: false,
            isFaild: false,
            tvetStudentFees: [],
            degreeStudentFees: [],
            degreeStudentDetail: {},
            tvetStudentDetail: {},
            cocs: [],
            cocTakerStudents: [],
            degreeGraduates: [],
            tvetGraduates: []

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
        },
        resultNotifier(state) {
            return state.resultNotifier
        },
        isSuccessed(state) {
            return state.isSuccessed
        },
        isUploading(state) {
            return state.isUploading
        },
        isFaild(state) {
            return state.isFaild
        },
        tvetStudentFees(state) {
            return state.tvetStudentFees
        },
        degreeStudentFees(state) {
            return state.degreeStudentFees
        },
        tvetStudentDetail(state) {
            return state.tvetStudentDetail
        },
        degreeStudentDetail(state) {
            return state.degreeStudentDetail
        },
        cocs(state) {
            return state.cocs
        },
        cocTakerStudents(state) {
            return state.cocTakerStudents
        },
        tvetGraduates(state) {
            return state.tvetGraduates
        },
        degreeGraduates(state) {
            return state.degreeGraduates
        },

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
        },
        setResultNotifier(state, notifiy) {
            state.resultNotifier = notifiy
        },
        setIsSuccessed(state, isSuccess) {
            state.isSuccessed = isSuccess
        },
        setIsUploading(state, isuploading) {
            state.isUploading = isuploading
        },
        setIsFaild(state, isFaild) {
            state.isFaild = isFaild
        },
        setTvetStudentFees(state, feeList) {
            state.tvetStudentFees = feeList
        },
        setDegreeStudentFees(state, feeList) {
            state.degreeStudentFees = feeList
        },
        setDegreeStudentDetails(state, data) {
            state.degreeStudentDetail = data
        },
        setTvetStudentDetails(state, data) {
            state.tvetStudentDetail = data
        },
        setCocs(state, coc) {
            state.cocs = coc
        },
        setCocTakerStudents(state, student) {
            state.cocTakerStudents = student
        },
        setDegreeGraduates(state, student) {
            state.degreeGraduates = student
        },
        setTvetGraduates(state, student) {
            state.tvetGraduates = student
        }

    },
    actions: {
        async fetchDegreeStudents({ commit, rootState }, queryData) {
            rootState.isLoading = true
            console.log('academic year id =inside action=')
            try {
                var response = await apiClient.get(`api/degree_yearly_arranged_students?academic_year_id=${queryData.academic_year_id}&year_no=${queryData.year_no}`)
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
        async fetchTvetStudents({ commit, rootState }, queryData) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get(`api/tvet_yearly_arranged_students?academic_year_id=${queryData.academic_year_id}&level_no=${queryData.level_no}`)
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
        async fetchActiveYearSemisters({ commit, rootState }, yearId) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get(`api/semesters?academic_year_id=${yearId}`)
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
                    commit('setLevels', response.data)
                } else {
                    throw 'faild to load levels'
                }
            } catch (e) {
                console.log('error occcured')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchDegreeStudentFeesLists({ commit, rootState }, queryObject) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get(`${queryObject.path}?page=${queryObject.page}&per_page=${queryObject.per_page}&search_id=${queryObject.search_id}&academic_year_id=${queryObject.academic_year_id}`)
                if (response.status === 200) {
                    console.log('degree student fee list')
                    console.log(response.data)
                    commit('setDegreeStudentFees', response.data)
                } else {
                    throw 'faild to load levels'
                }
            } catch (e) {
                console.log('error occcured')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchTvetStudentFees({ commit, rootState }, queryObject) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get(`${queryObject.path}?page=${queryObject.page}&per_page=${queryObject.per_page}&search_id=${queryObject.search_id}&academic_year_id=${queryObject.academic_year_id}`)
                if (response.status === 200) {
                    console.log('tvet student fee list')
                    console.log(response.data)
                    commit('setTvetStudentFees', response.data)
                } else {
                    throw 'faild to load tvet student fee list'
                }
            } catch (e) {
                console.log('error occcured')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchDegreeStudentDetail({ commit, rootState }, id) {
            rootState.isItemLoading = true
            try {
                var response = await apiClient.get('api/student_semesters/' + id)
                if (response.status === 200) {
                    console.log('response student semester  ', response.data)
                    commit('setDegreeStudentDetails', response.data)
                }
            } catch (e) {
                console.log('error')
            } finally {
                rootState.isItemLoading = false
            }
        },
        async fetchTvetStudentDetail({ commit, rootState }, id) {
            rootState.isItemLoading = true
            try {
                var response = await apiClient.get('api/student_levels/' + id)
                if (response.status === 200) {
                    console.log('tvetlevels ----', response.data)
                    commit('setTvetStudentDetails', response.data)
                }
            } catch (e) {
                console.log('error')
            } finally {
                rootState.isItemLoading = false
            }
        },
        async fetchCocStudents({ commit, rootState }, queryObject) {
            rootState.isItemLoading = true
            console.log('coc id ==== ', queryObject)
            try {
                var response = await apiClient.get(`${queryObject.path}?coc_id=${queryObject.cocId}&page=${queryObject.page}&per_page=${queryObject.per_page}`)
                console.log('responce code = ' + response.status)
                if (response.status === 200) {
                    console.log('coc takere student lists from server')
                    console.log(response.data)
                    commit('setCocTakerStudents', response.data)
                }
            } catch (e) {
                console.log('error ---')
                console.log(e)
            } finally {
                rootState.isItemLoading = false
            }
        },
        async addCocs(context, newCoc) {
            try {
                var response = await apiClient.post('api/cocs', newCoc)
                if (response.status === 201) {
                    console.log('Add new coc ')
                    console.log(response.data)
                    var previousCocs = context.getters.cocs
                    previousCocs.push(response.data)
                    context.commit('setCocs', previousCocs)
                } else {
                    throw 'faild to add coc'
                }
                return response
            } catch (e) {
                console.log('error occurd')
            }
        },
        async deleteCoc(context, cocId) {
            try {
                var response = await apiClient.delete('api/cocs/' + cocId)
                if (response.status === 200) {
                    console.log('Delete coc ')
                    console.log(response.data)
                    var previousCocs = context.getters.cocs
                    var index = previousCocs.findIndex(coc => {
                        return coc.id = cocId
                    })
                    previousCocs.splice(index, 1)
                    context.commit('setCocs', previousCocs)
                } else {
                    throw 'faild to add coc'
                }
                return response
            } catch (e) {
                console.log('error occurd')
            }
        },
        async updateCocs(context, newValue) {
            try {
                var response = await apiClient.put('api/cocs/' + newValue.id, newValue)
                if (response.status === 200) {
                    console.log('update coc ')
                    console.log(response.data)
                    var previousCocs = context.getters.cocs
                    var index = previousCocs.findIndex(coc => {
                        return coc.id === newValue.id
                    })
                    previousCocs[index] = response.data
                    context.commit('setCocs', previousCocs)
                } else {
                    throw 'faild to add coc'
                }
                return response
            } catch (e) {
                console.log('error occurd')
            }
        },
        async addNewExternalStudent(context, newExternalStudent) {
            try {
                console.log('registerd student sent to server')
                console.log(newExternalStudent)
                var response = await apiClient.post('api/register_external_student', newExternalStudent)
                if (response.status === 201) {
                    console.log('Add new external coc taker ')
                    console.log(response.data)
                    var previousCocs = context.getters.cocTakerStudents
                    previousCocs.push(response.data)
                    context.commit('setCocTakerStudents', previousCocs)
                } else {
                    throw 'faild to register student to coc'
                }
                return response
            } catch (e) {
                console.log('error occurd')
            }
        },
        async deleteStudentFromCoc(context, deletedStudent) {
            try {
                var response = await apiClient.delete(`api/coc_students/${deletedStudent.id}?type=${deletedStudent.type}&coc_id=${deletedStudent.coc_id}`)
                console.log('status = ', response.status)
                if (response.status === 200) {
                    console.log('Deleteed data from seerver')
                    console.log(response.data)
                    var previousStudent = context.getters.cocTakerStudents
                    var index = previousStudent.data.findIndex(student => {
                        return student.student_id === deletedStudent.id
                    })
                    previousStudent.data.splice(index, 1)
                    context.commit('setCocTakerStudents', previousStudent)
                } else {
                    throw 'faild to delet student from coc'
                }
                //return response
            } catch (e) {
                console.log('error occurd')
            }
        },
        async deleteDegreeStudent(context, payload) {
            try {
                console.log('pyload data = ', payload)
                var response = await apiClient.delete(`api/degree_students/${payload.id}?semester_id=${payload.semester_id}`)
                console.log('status = ', response.status)
                if (response.status === 200) {
                    console.log('Deleteed student from seerver olala')
                    console.log(response.data)
                    var previousStudent = context.getters.degreeStudents
                    var index1;
                    var index2;
                    index1 = previousStudent.findIndex((semester) => {
                        return semester.semester_no === payload.semester_no
                    })
                    console.log('index1 = ', index1)
                    index2 = previousStudent[index1].students.findIndex(student => {
                        return student.id = payload.id
                    })
                    console.log('index2 = ', index2)
                    previousStudent[index1].students.splice(index2, 1)
                    context.commit('setDegreeStudent', previousStudent)
                } else {
                    throw 'faild to delet student from coc'
                }
                //return response
            } catch (e) {
                console.log('error occurd')
            }
        },
        async deleteTvetStudent(context, payload) {
            try {
                var response = await apiClient.delete(`api/tvet_students/${payload.id}?level_id=${payload.level_id}`)
                console.log('status = ', response.status)
                if (response.status === 200) {
                    console.log('Deleteed student from seerver olala')
                    console.log(response.data)
                    var previousStudent = context.getters.tvetStudents
                    var index = previousStudent.students.findIndex(student => {
                        return student.id === payload.id
                    })
                    previousStudent.students.splice(index, 1)
                    context.commit('setTvetStudent', previousStudent)
                } else {
                    throw 'faild to delet student from coc'
                }
                //return response
            } catch (e) {
                console.log('error occurd')
            }
        }

    },
}