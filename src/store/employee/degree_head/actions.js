import apiClient from "../../baseUrl"
export default{
    async fetchCourses(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get("/api/department_courses")
            if (response.status === 200) {
                context.commit('setCourses', response.data)
                console.log('department courses', response.data)
            } else {
                throw 'faild to load degree department'
            }
        } catch (e) {
            console.log(e.response)
            throw e
        } finally {
            context.rootState.isLoading = false
        }
    },

    async fetchSections(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get("/api/degree_sections")
            if (response.status === 200) {
                context.commit('setSections', response.data)
                console.log('set sections head', response.data)
            } else {
                throw 'faild to load degree department'
            }
        } catch (e) {
            console.log(e.response)
            throw e
        } finally {
            context.rootState.isLoading = false
        }
    },
    async fetchStudents(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get("/api/degree_students_by_department")
            if (response.status === 200) {
                context.commit('setStudents', response.data)
                console.log('set courses head', response.data)
            } else {
                throw 'faild to load degree department'
            }
        } catch (e) {
            console.log(e.response)
            throw e
        } finally {
            context.rootState.isLoading = false
        }
    },
    async fetchStudentInSemesters(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get("/api/student2")
            if (response.status === 200) {
                context.commit('setStudentInSemesters', response.data)
                console.log('set student head', response.data)
            } else {
                throw 'faild to load degree department'
            }
        } catch (e) {
            console.log(e.response)
            throw e
        } finally {
            context.rootState.isLoading = false
        }
    },
    async fetchSlips(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get("/api/degree_departments")
            if (response.status === 200) {
                context.commit('setSlips', response.data)
                console.log('set slips head', response.data)
            } else {
                throw 'faild to load degree department'
            }
        } catch (e) {
            console.log(e.response)
            throw e
        } finally {
            context.rootState.isLoading = false
        }
    },
    //grade reports
    async fetchGrades(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get("/api/degree_departments")
            if (response.status === 200) {
                context.commit('setGrades', response.data)
                console.log('set grades', response.data)
            } else {
                throw 'faild to load grades'
            }
        } catch (e) {
            console.log(e.response)
            throw e
        } finally {
            context.rootState.isLoading = false
        }
    },
    
//add sectiondegree_head
    async addSection(context, payload) {
        try {
            var response = await apiClient.post('/api/degree_sections', JSON.stringify(payload), {
            })
            if (response.status === 201) {
                var previousData = context.getters.sections
                previousData.push(response.data)
                context.commit('setSections', previousData)
            } else {
                throw 'faild to add'
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    },
     
    async updateSection(context, paylod) {
        try {
            var response = await apiClient.put('/api/degree_sections/' + paylod.id, JSON.stringify(paylod), {
            })
            console.log('update section response status' + response.status)
            if (response.status === 200) {
                var previousData = context.getters.sections
                const editedIndex = previousData.findIndex((section) => {
                    return section.id === paylod.id
                })
                previousData[editedIndex] = response.data
                context.commit('setSections', previousData)
            } else {
                throw 'faild to add update degree'
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    },
    async deleteSection(context, payload) {
        try {
            var response = await apiClient.delete('/api/degree_sections/' + payload)
            console.log('delete sections response status' + response.status)
            if (response.status === 200) {
                var previousData = context.getters.sections
                const deletedIndex =  previousData.findIndex((dep)=>{
                  return dep.id === payload.id
               })
                previousData.splice(deletedIndex,1)
                context.commit('setSections', previousData)
            } else {
                throw 'faild to add delete degree'
            }
        } catch (e) {
            console.log(e)
            throw e
        }
    },
}
