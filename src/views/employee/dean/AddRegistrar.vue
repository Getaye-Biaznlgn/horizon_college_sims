<template>
    <base-card class="px-3 mx-4 mt-3">
    <div class="d-flex justify-content-end">
    <button @click="addregistrar" class="btn btn-add text-white px-2">Add New registrar</button>
    </div>
   <table class="mt-3">
  <thead>
    <tr>
      <th>NO</th>
      <th>Full Name</th>
      <th>Phone Number</th>
      <th>Email Address</th>
      <th><span class="sr-only">action</span></th>
    </tr>
  </thead>
     <tr v-for="(registrar,index) in registrars" :key="registrar.id">
      <td>{{index+1}}</td>
      <td>{{registrar.first_name+" "+registrar.last_name}}</td>
      <td>{{registrar.phone_no}}</td>
      <td>{{registrar.email}}</td>
      <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
             <li><span @click="editRegistrar(registrar)" class="dropdown-item px-4 py-2">Edit</span></li>
             <li><span @click="showDeleteModal(registrar)" class="dropdown-item px-4 py-2">Delete</span></li>
          </ul>
        </div>
    </td>
    </tr>
</table>
     <div v-if="!registrars.length" class="text-center mt-1">There is no added registrar</div>
</base-card>
    
    <!-- registrar registration form dialog-->
    <base-modal :is-loading="isLoading" id="baseModal" :button-type="buttonType" @edit="saveEditedRegistrar" @save="registerRegistrar" @cancel="clearAddModal">
    <template #modalBody>
   

    <form>
      <div class="mb-3" :class="{warining:v$.registrar.first_name.$error}">
         <label for="fname" class="form-label">First Name</label>
         <input type="text" class="form-control" id="fname" v-model.trim="registrar.first_name" @blur="v$.registrar.first_name.$touch">
         <span class="error-msg mt-1"  v-for="(error, index) of v$.registrar.first_name.$errors" :key="index">{{ error.$message+", " }}</span>
      </div>
      <div class="mb-3" :class="{warining:v$.registrar.last_name.$error}">
         <label for="lname" class="form-label">Last Name</label>
         <input type="text" class="form-control" id="lname" v-model.trim="registrar.last_name" @blur="v$.registrar.last_name.$touch">
         <span class="error-msg mt-1"  v-for="(error, index) of v$.registrar.last_name.$errors" :key="index">{{ error.$message+", " }}</span>
      </div>
      <div class="mb-3" :class="{warining:v$.registrar.phone_no.$error}">
  <label for="phoneNo" class="form-label">Phone Number</label>
  <input type="tel" class="form-control" id="phoneNo" v-model="registrar.phone_no" @blur="v$.registrar.phone_no.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.registrar.phone_no.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.registrar.email.$error}">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" v-model="registrar.email" @blur="v$.registrar.email.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.registrar.email.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
</form>
    <p class="text-center mt-3" :class="{'text-success':isSuccessed,'text-danger':isFaild}">{{resultNotifier}}</p>
 </template>    
  </base-modal>

  <!-- delete -->
<base-modal  id="deleteBaseModal" :button-type="buttonType" :isLoading="isLoading" @deleteItem="deleteItem" @cancel="clearDeleteModal">
   <template #modalBody>
      <div class="form-label fw-bold">Delete</div>
      <div class="my-3">Do you want to delete <i>{{registrarForDelete.first_name+' '+registrarForDelete.last_name}}</i>?</div>
      <p class="ms-2 mt-3" :class="{'text-success':isSuccessed,'text-danger':isFaild}">{{resultNotifier}}</p>
   </template>
</base-modal>

</template>
<script>
import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import { required, email, minLength,numeric,helpers, maxLength} from '@vuelidate/validators'
export default {
   data() {
       return {
         v$:useValidate(),
           basemodal:null,
           deleteBaseModal:null,
           isLoading:false,
           isSuccessed:true,
           isFaild:false,
           resultNotifier:'',
           registrarType:'',
           registrarForDelete:'',
           buttonType:'',
           registrarId:'',
           registrar:{
             first_name:'',
             last_name:'',
             phone_no:'',
             email:'',
             role:'registrar'
           }
       }
   },
   validations(){
     return {
      registrar:{
        first_name:{
          required: helpers.withMessage('first name can not be empty',required),
          },

        last_name:{required: helpers.withMessage('last name can not be empty',required)
        },             
        phone_no:{
           required: helpers.withMessage('phone number can not be empty',required),
           numeric,
           min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
           max:helpers.withMessage('phone number should not be greter than 13 digits long',maxLength(10)),
           },
         email:{
            required:helpers.withMessage('email can not be empty',required),email
          }
       }
     }
   },
   mounted() {
     this.basemodal = new Modal(document.getElementById('baseModal'))
     this.deleteBaseModal=new Modal(document.getElementById('deleteBaseModal'))
   },
   computed:{
     registrars(){
       return this.$store.getters['dean/registrars']
     }
   },
   methods: {
      addregistrar(){
         this.basemodal.show();
         this.buttonType = 'add'
      } ,
      clearAddModal(){
           this.registrar.first_name=''
           this.registrar.last_name=''
           this.registrar.phone_no=''
           this.registrar.email=''
           this.resultNotifier=''
           this.v$.$reset()
      },
      showDeleteModal(registrar){
           this.registrarForDelete={...registrar}
           this.buttonType='delete'
           this.deleteBaseModal.show()
      },
      clearDeleteModal(){
        this.resultNotifier=''
         this.registrarForDelete={}
      },
      registerRegistrar(){
        this.resultNotifier=''
       this.v$.$validate()
       if(!this.v$.$error){
         this.isLoading = true
       this.$store.dispatch('dean/addRegistrar',this.registrar).then((response)=>{
         if(response.status === 201){
          //  this.isFaild = false
          //  this.isSuccessed = true
          //  this.resultNotifier = 'You have registered one registrar succesfully'
          //  this.isLoading = false
          this.basemodal.hide()
         }
          else{
         console.log('form faild validation ')
       }
       }).catch(e=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = e.error
       }).finally(()=>{
           this.isLoading=false
       })
       }
      },
    
      editRegistrar(registrar){
        this.basemodal.show();
        this.buttonType = 'edit'        
        this.registrar.first_name = registrar.first_name
        this.registrar.last_name = registrar.last_name
        this.registrar.phone_no = registrar.phone_no
        this.registrar.profession = registrar.profession
        this.registrar.email = registrar.email
        this.registrarId = registrar.id
      },
      
      saveEditedRegistrar(){
        this.resultNotifier=''
        this.v$.$validate()
         if(!this.v$.$error){
           this.isLoading = true
         this.registrar.id = this.registrarId
         this.$store.dispatch('dean/updateRegistrar',this.registrar).then((response)=>{ 
         if(response.status === 200){
           this.basemodal.hide()
         }
      else{
        throw ''
      }
       }).catch(()=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = 'Faild to update registrar'
       }).finally(()=>{
         this.isLoading = false
       })
       }
      },
      deleteItem(){
        
         this.isLoading = true

       this.$store.dispatch('dean/deleteRegistrar',this.registrarForDelete.id).then((response)=>{
         if(response.status === 200){
          
           this.deleteBaseModal.hide()
           this.clearAddModal()
         }
       }).catch(()=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = 'Faild to delete head'
       }).finally(()=>{
         this.isLoading = false
       })
      }
   }, 
}
</script>

