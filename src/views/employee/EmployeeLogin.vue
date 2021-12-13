<template>
     <div class="w-25 ms-auto me-auto border rounded-1 px-3 pt-3 mt-5">
            <h3 class=" d-flex justify-content-center">Login </h3>
       <form class="py-5" @submit.prevent="login">
        <div class="mb-2">
          <label for="#name" class="form-label">Email</label>
          <input class="form-control" v-model="userCrediantail.email"  id="name" type="text" aria-label=".form-control-lg">
        </div>
         <div class="mb-4">
          <label for="#password" class="form-label">Password</label>
          <input class="form-control" v-model="userCrediantail.password" id="password" type="password" aria-label=".form-control-lg">
        </div>
        
        <div class="d-grid gap-2">
           <button  class="btn text-white" type="submit">
             <span v-if="isLoging">
                <span  class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                <span>Signing</span> 
             </span>
             <span v-else>Sign in</span> 
           </button>
        </div>
       </form>
    </div>
</template>

<script>
import apiClient from '../../store/baseUrl'
export default {
    data(){
     return{
       userCrediantail:{},
       isLoging:false,
       notify:''
     }
  },
  methods:{
   async login(){
       this.isLoging=true
       this.notify=''
    try{
      var response= await apiClient.post('/api/login', this.userCrediantail)
      if(response.status === 200){
        let toPath= this.$route.query.to || 'staff/'
        this.$router.push(toPath)
        console.log('user----')
        console.log(response.data.user)
        
        
        apiClient.defaults.headers.common['Authorization'] =`Bearer ${response.data.access_token}`
        this.$store.dispatch('setToken', response.data.access_token)
        this.$store.dispatch('setUser', response.data.user)
        this.$store.dispatch('setIsAuthenticated', true)
         let user=response.data.user
        // localStorage.removeItem('token')  
        // localStorage.removeItem('')
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(user)) 
       
      
      }else{
        throw 'faild'+response.status
      }
    }catch(e){
      console.log(e)
      this.notify= 'Faild to login'
    }finally{
      this.isLoging=false
    }
    }
  
  }
}
</script>
<style scoped>
  .btn{
      background-color: #fcc561;
  }
</style>