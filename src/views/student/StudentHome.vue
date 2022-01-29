<template>
<div class="row">
  <div class="col-sm col-md-2 pe-0 sidbar-wrapper">
     <div class="header d-flex justify-content-between py-1 shadow-sm text-white px-2 md-px-3 mx-0">
        <span class=" fw-bold">       
          <img src="../../assets/logo.png" class=" align-self-center" height="51">
             Horizon College
        </span>
        <span role="button" @click="toggleMenu" id="menubar" class="d-sm-none me-2">
            <i class="fas fa-bars fw-bold fs-1"></i>
         </span>
     </div> 
     <div class="student-sidebar"  ref="sidebar" id="sidebar">
         <sidebar  @linkClicked='toggleMenu'></sidebar>
      </div>
  </div>
   <div class="col-sm col-md-10 content px-0 ">
     <div class="bg-white py-sm-4 py-md-3 px-3 shadow-sm fw-bold d-flex justify-content-between">
       <span>{{componentTitle}}</span> 
       <div class="dropdown">
         <a class="btn  dropdown-toggle p-0 m-0"  role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
           {{student?.name}}
         </a>
         <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
           <li><span role="button" @click="logout" class="dropdown-item">Logout</span></li>
            <li><span role="button" @click="showChangePasswordDialog" class="dropdown-item">Change Password</span></li>
         </ul>
       </div>
     </div>
     <div class="router-view">
        <router-view  @title='setTitle'/>
     </div>
  </div>
</div>
  <div v-if="isItemLoading" class="loading-screen route-loading p-0  position-fixed top-0 start-0 w-100 h-100">
      <div class="loading-spinner position-relative">
         <img src="../../assets/loading.gif" width="60" height="60"  alt="slow connection">
      </div>
  </div>  

  <base-modal @save="save" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType" @cancel="clearModal">
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3" :class="{warining:v$.password.oldPassword.$error}">
           <label for="#oldPassword" class="form-label">Old Password</label>
           <input class="form-control" v-model.trim="password.oldPassword" @blur="v$.password.oldPassword.$touch" id="oldPassword" type="password"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.password.oldPassword.$errors" :key="index">{{ error.$message+", " }}</span>
        </div> 
       
       <div class="mb-3" :class="{warining:v$.password.newPassword.$error}">
           <label for="#newPassword" class="form-label">New Password</label>
           <input class="form-control" v-model.trim="password.newPassword" @blur="v$.password.newPassword.$touch" id="newPassword" type="password" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.password.newPassword.$errors" :key="index">{{ error.$message+", " }}</span>
       </div> 
      
      <div class="mb-3" :class="{warining:v$.password.confirmPassword.$error}">
           <label for="#confirmPassword" class="form-label">Confirm Password</label>
           <input class="form-control" v-model.trim="password.confirmPassword" @blur="v$.password.confirmPassword.$touch" id="confirmPassword" type="password" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.password.confirmPassword.$errors" :key="index">{{ error.$message+", " }}</span>
       </div> 
      </form>
      <request-status-notifier :notificationMessage="requestStatus.message" :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>
</template>
<script>
import Sidebar from '../../components/student/Sidebar.vue'
import apiClient from '../../resources/baseUrl'
import {mapGetters} from 'vuex'
import {Modal} from 'bootstrap'
import useValidate from '@vuelidate/core'
import { required,helpers, sameAs} from '@vuelidate/validators'
export default {
   components:{Sidebar},
   data(){
      return{
          sidebarShown:false,
          componentTitle:'',
          v$:useValidate(),
            password:{
                newPassword:'',
                oldPassword:'',
                confirmPassword:''
            },
            
            addBaseModal:null,
            actionButtonType:'',
            isSaving:false,
            requestStatus:{
                isNotSucceed:'',
                message:''
            }
      }
   },
   computed:{
      ...mapGetters({student:'studentAuth/student',isItemLoading:'isItemLoading'})
   },
  
   methods:{
     setTitle(title){
      this.componentTitle=title
     },
      toggleMenu(){
         var element = document.getElementById('menubar')
         var style = window.getComputedStyle(element)
         var display = style.getPropertyValue('display');
         if(display==='none')
           return;
          
           this.sidebarShown=!this.sidebarShown
           let vm=this
           if(this.sidebarShown){
              vm.$refs.sidebar.style.display='block'
           }else{
              vm.$refs.sidebar.style.display='none'
          }
      },
      myEventHandler() {
         if(Number(window.innerWidth)>590){
            this.$refs.sidebar.style.display='block'
         }
       },
       showChangePasswordDialog(){
         this.actionButtonType='add'
         this.addBaseModal.show()
       },
       clearModal(){
         this.password.newPassword=''
         this.password.oldPassword=''
         this.password.confirmPassword=''
         this.requestStatus.message=''
         this.v$.$reset()
       },
    async save(){
        this.v$.$validate()
       if(!this.v$.$error){
           this.isSaving=true
         try{
          let response= await apiClient.post('api/change_password', {
              user_name:this.student.student_id,
              new_password:this.password.newPassword,
              old_password:this.password.oldPassword
          })
            if(response.status===200){
               this.requestStatus.isNotSucceed=false,
               this.requestStatus.message="Password is changed successfully"
             }else{
                throw''
             }
         }
         catch{
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message='Faild to change password'
         }
         finally{
           this.isSaving=false
         }
         }
       
       },

        async logout () {
            try {
              var response = await apiClient.post('/api/logout')
              if (response.status === 200) {
                apiClient.defaults.headers.common['Authorization'] =null
                this.$store.dispatch('studentAuth/setStudentToken','')
                this.$store.dispatch('studentAuth/setStudent')
                this.$store.dispatch('studentAuth/setIsStudentAuthenticated', false)        
                localStorage.removeItem('student')
                localStorage.removeItem('studentToken')  
                this.$router.push({name:'StudentLogin'})
               }else{
                throw 'faild'
              }
            } catch (e) {
              console.log(e)
              throw e
            }
          },
   },
   created(){
      window.addEventListener("resize", this.myEventHandler);
   },
   unmounted() {
      window.removeEventListener("resize", this.myEventHandler);
   },
   beforeCreate(){
     if(localStorage.getItem('studentToken')){
         let token=localStorage.getItem('studentToken')
         this.$store.dispatch('studentAuth/setStudentToken', token)
         this.$store.dispatch('studentAuth/setIsStudentAuthenticated', true)
         apiClient.defaults.headers.common['Authorization'] =`Bearer ${token}`
     } 
     if(localStorage.getItem('student')){
        let user=localStorage.getItem('student')
        this.$store.dispatch('studentAuth/setStudent', JSON.parse(user))
     }
  
   },
    
    validations(){
       return{
         password:{
             newPassword:{
                required: helpers.withMessage('New password can not be empty',required),
               },
             oldPassword:{
                 required:helpers.withMessage('Old password can not be empty', required)
             },
              confirmPassword:{
                 required:helpers.withMessage('Confirmation password is required', required),
                 sameAs:helpers.withMessage('Faild to confirm', sameAs(this.password.newPassword)) 
            }   
        }
     }
  },
  mounted(){
      this.addBaseModal=new Modal(document.getElementById('addBaseModal'))
  }
}
</script>
<style scoped>
.header{
   background-color: #088dc5;
}
.content{
   background-color: #f5f6fa;
   min-height: 100vh;
}

.student-sidebar{
    background-color: #3081b4;
    min-height: 100vh;
}
.warining input, .warining textarea{
    border: 1px red solid;
  }
.warining span{
    display: inline;
    color: red;
    font-size: 14px;
  }
.loading-spinner{
  top: 10%;
  left: 48%;
  /* transform:translate(-50%, -50%); */
}
.route-loading{
  background-color: rgba(0, 0, 0, 0.5);;
}

@media (max-width: 576px) {
 .student-sidebar {
  position: absolute;  
  z-index: 2;
  display: none;
 }
 .router-view{
   overflow-x:scroll !important;
   min-height: 90vh;
  }
.content{
   background-color: #fff;
  }
.loading-spinner{
  left: 35%;
 }
}
</style>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}
th{
  text-align: left;
  padding: 8px;
  background-color: #3081b4;
}
tr,td,th{
  border: 2px solid #f1f1f1
}
td{
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
</style>
