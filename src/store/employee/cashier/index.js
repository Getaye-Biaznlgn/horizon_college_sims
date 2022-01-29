import apiClient from "../../../resources/baseUrl"
export default {
    namespaced: true,
    state() {
        return {
            degreeStudentFees: [],
            tvetStudentFees: [],
            degreeStudentFeeDetails: [],
            tvetStudentFeeDetails: [],
            studentFeelists: [],
            paidStudentsLists: [],
            calenders: [],
            paymentTypes: []
        }
    },
    getters: {
        degreeStudentFees(state) {
            return state.degreeStudentFees
        },
        tvetStudentFees(state) {
            return state.tvetStudentFees
        },
        degreeStudentFeeDetails(state) {
            return state.degreeStudentFeeDetails
        },
        tvetStudentFeeDetails(state) {
            return state.tvetStudentFeeDetails
        },
        studentFeelists(state) {
            return state.studentFeelists
        },
        paidStudentsLists(state) {
            return state.paidStudentsLists
        },
        calenders(state) {
            return state.calenders
        },
        paymentTypes(state) {
            return state.paymentTypes
        }
    },
    mutations: {
        setDegreeStudentFees(state, student) {
            state.degreeStudentFees = student
        },
        setTvetStudentFees(state, student) {
            state.tvetStudentFees = student
        },
        setDegreeStudentFeeDetails(state, detailData) {
            state.degreeStudentFeeDetails = detailData
        },
        steTvetStudentFeeDetails(state, detailData) {
            state.tvetStudentFeeDetails = detailData
        },
        setStudentFeelist(state, feeList) {
            state.studentFeelists = feeList
        },
        setPaidStudentsLists(state, paidStudents) {
            state.paidStudentsLists = paidStudents
        },
        setCalenders(state, calender) {
            state.calenders = calender
        },
        setPymentTypes(state, paymentType) {
            state.paymentTypes = paymentType
        }
    },
    actions: {
        async fetchDegreeStudentFee({ commit, rootState }, queryObject) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get(queryObject.path + '?page=' + queryObject.page + '&per_page=' + queryObject.per_page + '&search_id=' + queryObject.search_id + '&academic_year_id=' + queryObject.academic_year_id)
                if (response.status === 200) {
                    console.log('fetchDegreeStudent fee')
                    console.log(response.data)
                    commit('setDegreeStudentFees', response.data)
                } else {
                    throw 'faild to load Degree fee status'
                }
            } catch (e) {
                console.log('error occurd')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchTvetStudentFee({ commit, rootState }, queryObject) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get(queryObject.path + '?page=' + queryObject.page + '&per_page=' + queryObject.per_page + '&search_id=' + queryObject.search_id + '&academic_year_id=' + queryObject.academic_year_id)
                if (response.status === 200) {
                    console.log('fetchTvetStudent fee')
                    console.log(response.data)
                    commit('setTvetStudentFees', response.data)
                } else {
                    throw 'faild to load Tvet fee status'
                }
            } catch (e) {
                console.log('error occurd')
            } finally {
                rootState.isLoading = false
            }
        },
        async degreeStudentFeeDetails({ commit, rootState }, studId) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get('api/degree_student_fees/' + studId)
                if (response.status === 200) {
                    console.log('fetchDegreeStudent fee detail')
                    console.log(response.data)
                    commit('setDegreeStudentFeeDetails', response.data)
                } else {
                    throw 'faild to load degree student fee detail'
                }
            } catch (e) {
                console.log('error occurd')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchTvetStudentFeeDetails({ commit, rootState }, studId) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get('api/tvet_student_fees/' + studId)
                if (response.status === 200) {
                    console.log('fetchTvetStudent fee detail')
                    console.log(response.data)
                    commit('steTvetStudentFeeDetails', response.data)
                } else {
                    throw 'faild to load tvet student fee detail'
                }
            } catch (e) {
                console.log('error occurd')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchStudentFeelist({ commit }, student) {
            try {
                var response = await apiClient.post('api/student_tuition_detail/' + student.id, student)
                if (response.status === 200) {
                    console.log('fetch StudentFeelist ')
                    console.log(response.data)
                    commit('setStudentFeelist', response.data)
                } else {
                    throw 'faild to load StudentFeelist'
                }
                return response
            } catch (e) {
                console.log('error occurd')
            }
        },
        // async addNewStudentFee(context, studentFee) {

        // },
        async fetchPaidStudents({ commit }, queryObject) {
            try {
                var response = await apiClient.get(queryObject.path + '?page=' + queryObject.page + '&per_page=' + queryObject.per_page + '&search_query=' + queryObject.search_id + '&date_between_query=' + queryObject.date_between + '&payment_type_query=' + queryObject.payment_type + '&date_query=' + queryObject.date_query + '&academic_year_id=' + queryObject.academic_year_id)
                if (response.status === 200) {
                    console.log('fetch paid months and semesters ')
                    console.log(response.data)
                    commit('setPaidStudentsLists', response.data)
                } else {
                    throw 'faild to load paid Students'
                }
                return response
            } catch (e) {
                console.log('error occurd')
            }
        },
        async fetchCalender({ commit, rootState }) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get('api/academic_years')
                if (response.status === 200) {
                    console.log('fetch Calenders ')
                    console.log(response.data)
                    commit('setCalenders', response.data)
                } else {
                    throw 'faild to load Calenders'
                }
            } catch (e) {
                console.log('error occurd')
            } finally {
                rootState.isLoading = false
            }
        },
        async fetchPaymentTypes({ commit, rootState }, yearId) {
            rootState.isLoading = true
            try {
                var response = await apiClient.get(`api/get_academic_fees?academic_year_id=${yearId}`)
                if (response.status === 200) {
                    console.log('fetch fee types')
                    console.log(response.data)
                    commit('setPymentTypes', response.data)
                } else {
                    throw 'faild to load  fee types'
                }
            } catch (e) {
                console.log('error occurd')
            } finally {
                rootState.isLoading = false
            }
        },
    }
}