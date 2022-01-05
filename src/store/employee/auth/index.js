export default{
    state: {
        isAuthenticated:false,
        token:'',
        user:''
    },
    getters:{
     token(state){
      return state.token
     },
     isAuthenticated(state){
       return state.isAuthenticated
     },
     user(state){
       return state.user
     }
    },
    mutations: {
      setIsAuthenticated(state, isAuth){
            state.isAuthenticated = isAuth
        },
      setUserData(state, data){
            state.userData=data
        },
      setToken(state, token){
        state.token=token
      },
      setUser(state, user){
        state.user=user
      }
    },
   
    actions: {
      setToken({commit},token){
       commit('setToken', token)
      },
      setIsAuthenticated({commit}, isAuth){
        commit('setIsAuthenticated', isAuth)
      },
     setUser({commit}, user){
       commit('setUser', user)
     },
     
    }
  }