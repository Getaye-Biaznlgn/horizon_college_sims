import apiClient from "../../../resources/baseUrl"
export default{
    namespaced:true,
    state:{
        mySections:[]
    },
    mutations:{
        setMySections(state, mySections){
            state.mySections=mySections
        }
    },
    getters:{
        mySections(state){
            return state.mySections
        },
        sectionById(state){
            return (id,courseId)=>{  
                return state.mySections.find((section)=>{
                    return Number(section.id)===Number(id) && Number(section.course_id)===Number(courseId)
                })
            }
        }
    },
    actions:{
        async fetchMySections(context, id) {
            context.rootState.isLoading = true
            try {
                var response = await apiClient.get("/api/teacher_sections/"+id)
                if (response.status === 200) {
                    context.commit('setMySections', response.data)
                    console.log('sections', response.data)
                } else {
                    throw 'faild to load degree department'
                }
            } finally {
                context.rootState.isLoading = false
            }
        }
    }

}