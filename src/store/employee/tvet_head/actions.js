import apiClient from "../../baseUrl"
export default{
    async fetchModules(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get("/api/department_modules")
            if (response.status === 200) {
                context.commit('setModules', response.data)
                console.log('department modules', response.data)
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
            var response = await apiClient.get("/api/tvet_sections")
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

    async fetchStudentInLevel(context) {
        context.rootState.isLoading = true
        try {
            var response = await apiClient.get("/api/students2")
            if (response.status === 200) {
                context.commit('setStudentInLevel', response.data)
                console.log('set student in level', response.data)
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
    
//add sectiondegree_head
    async addSection(context, payload) {
        try {
            var response = await apiClient.post('/api/level_sections', JSON.stringify(payload), {
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
            var response = await apiClient.put('/api/tvet_sections/' + paylod.id, JSON.stringify(paylod), {
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
            var response = await apiClient.delete('/api/tvet_sections/' + payload)
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
