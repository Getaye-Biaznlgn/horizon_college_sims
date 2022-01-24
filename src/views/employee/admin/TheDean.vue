<template>
  <base-card class="px-3 mx-4 mt-3">
    <button @click="showAddBaseModal" class="btn btn-add d-block ms-auto text-white">Add Dean</button>
    <table class="mt-2">
        <tr>
           <th>No</th>
           <th>Full Name</th> 
           <th>Phone No</th>
           <th>Email</th>
           <th class="sr-only">Action</th>
        </tr>
        <tr v-for="(dean, index) in deans" :key="dean.id">
            <td>{{index+1}}</td>
            <td>{{dean.first_name+' '+dean.last_name}}</td>
            <td>{{dean.phone_no}}</td>
            <td>{{dean.email}}</td>
            <td>
               <div class="dropdown">
                  <a class="btn py-0" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <span><i class="fas fa-ellipsis-v"></i></span>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li @click="showEditModal(dean)"> <span role="button"  class="dropdown-item">Edit</span></li>
                    <li @click="showDeleteModal(dean)"><span  role="button"  class="dropdown-item">Delete</span></li>
                    <li @click="showResetModal(dean)"><span  role="button"  class="dropdown-item">Reset Password</span></li>
                  </ul>
               </div>
            </td>
        </tr>
    </table>
    <p v-if="!deans.length" class="text-center mt-1">Dean is not added yet!</p>
</base-card>

<base-modal @save="save"  @edit="edit" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType" @cancel="clearModal">
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3" :class="{warining:v$.dean.first_name.$error}">
           <label for="#first_name" class="form-label">First Name</label>
           <input class="form-control" v-model.trim="dean.first_name" @blur="v$.dean.first_name.$touch" id="first_name" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.dean.first_name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.dean.last_name.$error}">
           <label for="#last_name" class="form-label">Last Name</label>
           <input class="form-control" v-model.trim="dean.last_name" @blur="v$.dean.last_name.$touch" id="last_name" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.dean.last_name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.dean.email.$error}">
           <label for="#email" class="form-label">Email</label>
           <input class="form-control" v-model.trim="dean.email" @blur="v$.dean.email.$touch" id="email" type="email"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.dean.email.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
         <div class="mb-3" :class="{warining:v$.dean.phone_no.$error}">
           <label for="#phone_no" class="form-label">Phone No</label>
           <input class="form-control" v-model.trim="dean.phone_no" @blur="v$.dean.phone_no.$touch" id="phone_no" type="text"  aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.dean.phone_no.$errors" :key="index">{{ error.$message+", " }}</span>
        </div>
      </form>
      <request-status-notifier :notificationMessage="requestStatus.message" :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>

<!-- Delete base modal -->
<base-modal @deleteItem="deleteDean" :isLoading="isSaving" id="deleteBaseModal" :button-type="actionButtonType" @cancel="clearModal">
   <template #modalBody>
      <div class="fw-bold">DELETE</div>
      <div class="my-3">Do you want to delete <i>{{this.dean.first_name+' '+this.dean.last_name}}</i>'s account?
      </div>
      <request-status-notifier :notificationMessage='requestStatus.message' :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>

<vue-modal :modalState="resetModalState">
     <div class="modal-content ms-auto me-auto bg-white p-3">
        <div class="header">
            <button @click="dismissVueModal"  class="btn fs-5 position-absolute end-0 top-0"><i class="fas fa-times"></i></button>   
        </div>
        <div class="body">
             <strong class="fw-bold d-block fs-5">Reset</strong>
             <p class="my-4">Do you want to reset <b><i>{{dean.first_name+' '+dean.last_name}}'s</i></b> password?</p>
        </div>
         <div class="footer d-flex">
             <request-status-notifier class="" :notificationMessage='requestStatus.message' :isNotSucceed="requestStatus.isNotSucceed" ></request-status-notifier>
             <button  type="button" @click="resetPassword" class="btn d-block ms-auto  btn-add text-white ">
             <span v-if="isSaving">
               <span  class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  Reseting
               </span>      
              <span v-else>Reset</span>   
          </button>
       </div>
     </div>
  </vue-modal>
</template>

<script>
import useVueliade from '@vuelidate/core'
import {email, required, helpers} from '@vuelidate/validators'
import apiClient from '../../../resources/baseUrl'
import {Modal} from 'bootstrap'
import VueModal from '../../../components/VueModal.vue'
export default {
  components:{VueModal},
    data(){
        return{
          v$:useVueliade(),
            deans:[],
            dean:{
                id:'',
                phone_no:'',
                email:'',
                first_name:'',
                last_name:''
            },
            requestStatus:{
                message:'',
                isNotSucceed:''
            },
            addBaseModal:null,
            deleteBaseModal:null,
            actionButtonType:'',
            isSaving:false,
            resetModalState:false
        }
    },
    methods:{
      dismissVueModal(){
        this.dean={}
        this.requestStatus.message=''
        this.resetModalState=false
      },
      showEditModal(dean){
       this.actionButtonType='edit'
       this.dean={...dean}
       this.addBaseModal.show()
1      },
      showDeleteModal(dean){
        this.actionButtonType='delete'
         this.dean={...dean}
         this.deleteBaseModal.show()
      },
      showAddBaseModal(){
        this.actionButtonType='add'
        this.addBaseModal.show()
      },
      showResetModal(dean){
        this.dean={...dean}
        this.resetModalState=true
      },
      clearModal(){
        this.v$.$reset()
        this.dean={}
        this.requestStatus.message=''
      },
      async resetPassword(){
        this.isSaving=true
         try{
          let response= await apiClient.post('api/reset_employee_password', {user_name:this.dean.email})
            if(response.status===200){
               this.resetModalState=false
             }else{
                throw''
            }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to change password"
         }
         finally{
           this.isSaving=false
         }
      },
      async deleteDean(){
          this.isSaving=true
          try{
             let response=  await apiClient.delete('api/employees/'+this.dean.id)
               if(response.status===200){
                 const index=this.deans.findIndex((dean)=>{
                   return dean.id===this.dean.id
                 })
                 
                 this.deans.splice(index,1)
                  this.deleteBaseModal.hide()
                  this.clearModal()
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to add dean"
         }
         finally{
           this.isSaving=false
         }
        
       },
      async edit(){
          this.v$.$validate()
          if(!this.v$.$error){
             this.isSaving=true
          try{
             let response=  await apiClient.put('api/employees/'+this.dean.id, this.dean)
               if(response.status===200){
                 const index=this.deans.findIndex((dean)=>{
                   return dean.id===this.dean.id
                 })
                 this.deans[index]=response.data
                  this.addBaseModal.hide()
                  this.clearModal()
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to add dean"
         }
         finally{
           this.isSaving=false
         }
         }
        
       },
    async fetchDean(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/get_deans")
            if (response.status === 200) {
              this.deans=response.data
            } else {
              throw 'Failed to fetch dean'
            }
        } catch (e) {
            console.log(e.response)
        } finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
      async save(){
        this.requestStatus.message=''
          this.v$.$validate()
          if(!this.v$.$error){
             this.isSaving=true
          try{
             this.dean.role='dean'
             let response=  await apiClient.post('api/employees', this.dean)
               if(response.status===201){
                  this.deans.unshift(response.data)
                  console.log('dean ', response.data)
                  this.addBaseModal.hide()
                  this.clearModal()
             }else{
                throw''
             }
         }
         catch(e){
             this.requestStatus.isNotSucceed=true,
             this.requestStatus.message="Failed to add dean"
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
    created(){
       this.fetchDean()
    },
    mounted(){
       this.addBaseModal=new Modal(document.getElementById('addBaseModal'))
       this.deleteBaseModal=new Modal(document.getElementById('deleteBaseModal'))
    },
    validations(){
      return {
        dean:{
          email:{
             email:helpers.withMessage('Value should be an an email', email),
             required:helpers.withMessage('Email shouldn\'t be empty', required)
          },
            phone_no:{
             required:helpers.withMessage('Phone no shouldn\'t be empty', required)
          },
            last_name:{
             required:helpers.withMessage('Last name shouldn\'t be empty', required)
          },
            first_name:{
             required:helpers.withMessage('First name shouldn\'t be empty', required)
          },
        }
      }
    }
}
</script>

<style scoped>
.modal-content{
   width: 30%;
 }
</style>