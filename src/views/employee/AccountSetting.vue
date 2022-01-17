<template>
    <base-card class="px-3 mx-4 mt-3">
       <strong class="fw-bold d-block mb-3">Account Setting</strong> 
       <div class=" border-bottom mb-2"> <strong>Name</strong>  <span class="ms-5">{{user.first_name+' '+user.last_name}}</span></div>  
       <div class="border-bottom mb-2"><strong>Email</strong>  <span class="ms-5">{{user.email}}</span></div>
       <div class="border-bottom mb-2"><strong>Phone Number</strong>  <span class="ms-5">{{user.phone_no}}</span></div>
       <button @click="showChangePasswordDialog" class="btn d-block ms-auto btn-add text-white">Change Password</button>
    </base-card>

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
import {Modal} from 'bootstrap'
import useValidate from '@vuelidate/core'
import { required,helpers, sameAs} from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import apiClient from '../../resources/baseUrl'
export default {
    data(){
        return{
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
      ...mapGetters(['user'])
    },
    methods:{
       showChangePasswordDialog(){
         this.actionButtonType='add'
         this.addBaseModal.show()
       },
       clearModal(){
         this.password.newPassword=''
         this.password.oldPassword=''
         this.password.confirmPassword=''
         this.v$.$reset()
       },
    async save(){
        this.v$.$validate()
       if(!this.v$.$error){
           this.isSaving=true
         try{
          let response= await apiClient.post('api/change_password', {
              user_name:this.user.email,
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
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message='Faild to change password'
         }
         finally{
           this.isSaving=false
         }
         }
         else{
           console.log('form validation faild')
         }
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