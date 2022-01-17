<template>
     <div class=" col-sm-10 col-md-3 ms-auto me-auto border rounded-1 px-3 pt-3  mt-5">
        <!-- <h3 class="d-flex justify-content-center">Login </h3> -->
       <img src="../../assets/logo.png" class="mx-auto d-block" width="80" height="70" alt="">
       <form class="py-5" @submit.prevent="login">
        <div class="mb-2" :class="{warining:v$.userCrediantail.user_name.$error}">
          <label for="#name" class="form-label">Student ID</label>
          <input class="form-control" v-model="userCrediantail.user_name"  id="name" type="text" aria-label=".form-control-lg">
          <span class="error-msg mt-1"  v-for="(error, index) of v$.userCrediantail.user_name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-4" :class="{warining:v$.userCrediantail.password.$error}">
          <label for="#password" class="form-label">Password</label>
          <div class="d-flex position-relative">
              <input class="form-control" v-model="userCrediantail.password" id="password" :type="isPasswordVisible?'text':'password'"  aria-label=".form-control-lg">
              <i @click="toggleShowPassword" class="position-absolute end-0 mx-2 mt-2  far " :class="isPasswordVisible ? 'fa-eye': 'fa-eye-slash'"></i>
          </div>
          <span class="error-msg mt-1"  v-for="(error, index) of v$.userCrediantail.password.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
        <div class="d-grid gap-2">
           <button  class="btn text-white" type="submit">
             <span v-if="isLoging">
                <span  class="spinner-border spinner-border-sm mx-2" role="status" aria-hidden="true"></span>
                <span>Signing</span> 
             </span>
             <span v-else>Sign in</span> 
           </button>
           <p class="text-danger text-center small">{{notify}}</p>
        </div>
       </form>
    </div>
</template>
<script>
import {required,helpers} from '@vuelidate/validators'
import useValidate from '@vuelidate/core'
import apiClient from '../../resources/baseUrl'
export default {
    data(){
     return{
       v$:useValidate(),
       userCrediantail:{
         user_name:'',
         password:''
       },
       isPasswordVisible:false,
       isLoging:false,
       notify:''
     }
  },
  validations(){
      return{
        userCrediantail:{
          user_name:{
            required:helpers.withMessage('ID can\'t be empty', required )
          },
          password:{
            required:helpers.withMessage('Password can\'t be empty', required )
          }
        }
      }
  },
  methods:{
    toggleShowPassword(){
       this.isPasswordVisible=!this.isPasswordVisible
    },
   async login(){
     this.notify=''
     this.v$.$validate()
     if(!this.v$.$error){
        this.isLoging=true
        try{
          var response= await apiClient.post('/api/student_login', this.userCrediantail)
          if(response.status === 200){
           // let toPath= this.$route.query.to || '/staff'
      
        let user=response.data.user
        user.role=response.data.role
        apiClient.defaults.headers.common['Authorization'] =`Bearer ${response.data.access_token}`
        // this.$store.dispatch('setStudentToken', response.data.access_token)
        // this.$store.dispatch('setStudent', user)
        // this.$store.dispatch('setIsStudentAuthenticated', true)
        localStorage.setItem('studentToken', response.data.access_token)
        localStorage.setItem('student', JSON.stringify(user)) 
        let toPath= '/student-home'
         this.$router.push(toPath)
      }else{
        throw 'faild'+response.status
      }
    }catch{
      this.notify= 'Faild to login'
    }finally{
      this.isLoging=false
     }
    }
   }
  }
}
</script>
<style scoped>
  .btn{
      background-color: #3081b4;
  }
  .warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;
    font-size: 14px;
  }
form i {
    /* margin-bottom: -1000px; */
    cursor: pointer;
}
  
</style>