import apiClient from "../../../resources/baseUrl"
export default{
    async fetchCourses(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get("/api/department_courses")
            if (response.status === 200) {
                context.commit('setCourses', response.data)
            } else {
                throw 'faild to load degree department'
            }
        } finally {
            context.rootState.isLoading = false
        }
    },

    async fetchSections(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get(`/api/degree_sections?academic_year_id=${context.rootState.selectedAcademicYearId}`)
            if (response.status === 200) {
                context.commit('setSections', response.data)
            } else {
                throw 'faild to load degree department'
            }
        } finally {
            context.rootState.isLoading = false
        }
    },

    async fetchStudentInSemesters(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get(`/api/students2?academic_year_id=${context.rootState.selectedAcademicYearId}`)
            if (response.status === 200) {
                context.commit('setStudentInSemesters', response.data)
            } else {
                throw 'faild to load degree department'
            }
        } finally {
            context.rootState.isLoading = false
        }
    },
    
//add sectiondegree_head
    async addSection(context, payload) {
            var response = await apiClient.post('/api/degree_sections', JSON.stringify(payload), {
            })
            if (response.status === 201) {
                var previousData = context.getters.sections
                previousData.push(response.data)
                context.commit('setSections', previousData)
            } else {
                throw 'faild to add'
            }
        
    },
     
    async updateSection(context, paylod) {
            var response = await apiClient.put('/api/degree_sections/' + paylod.id, JSON.stringify(paylod))
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
        
    },
    async deleteSection(context, payload) {
        try {
            var response = await apiClient.delete('/api/degree_sections/' + payload)
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
