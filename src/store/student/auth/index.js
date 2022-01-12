export default{
    namespaced:true,
    state:{
        isStudentAuthenticated:false,
        studentToken:'',
        student:''
    },
    getters:{
     studentToken(state){
      return state.studentToken
     },
     isStudentAuthenticated(state){
       return state.isStudentAuthenticated
     },
     student(state){
       return state.student
     }
    },

    mutations:{
      setIsStudentAuthenticated(state, isAuth){
            state.isStudentAuthenticated = isAuth
        },
      setStudentToken(state, token){
        state.studentToken=token
      },
      setStudent(state, student){
        state.student=student
      }
    },
    actions: {
      setStudentToken({commit},token){
       commit('setStudentToken', token)
      },
      setIsStudentAuthenticated({commit}, isAuth){
        commit('setIsStudentAuthenticated', isAuth)
      },
     setStudent({commit}, student){
       commit('setStudent', student)
     },
   }
  }