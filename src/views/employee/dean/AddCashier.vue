<template>
    <base-card class="px-3 mx-4 mt-3">
    <div class="d-flex justify-content-end">
    <button @click="addCashier" class="btn btn-add text-white">Add New Cashier</button>
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
  <tbody>
     <tr v-for="(cashier,index) in cashiers" :key="cashier.id">
      <td>{{index+1}}</td>
      <td>{{cashier.first_name+" "+cashier.last_name}}</td>
      <td>{{cashier.phone_no}}</td>
      <td>{{cashier.email}}</td>
       <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu border rounded shadow-sm py-0" aria-labelledby="dropdownMenuLink">
              <li><span @click="editCashier(cashier)" class="dropdown-item px-4 py-2">Edit</span></li>
             <li><span @click="showDeleteModal(cashier)" class="dropdown-item px-4 py-2">Delete</span></li>
          </ul>
        </div>
    </td>
    </tr>
  </tbody>
</table>
    <div v-if="!cashiers.length" class="text-center mt-1">There is no added cashier</div>
</base-card>

    <!-- cashier registration form dialog-->
    <base-modal :is-Loading="isLoading" id="baseModal" :button-Type="buttonType" @edit="saveEditedCashier" @save="registerCashier" @cancel="clearAddModal">
    <template #modalBody>
    
    <form>
    <div class="mb-3" :class="{warining:v$.cashier.first_name.$error}">
  <label for="fname" class="form-label">First Name</label>
  <input type="text" class="form-control" id="fname" v-model.trim="cashier.first_name" @blur="v$.cashier.first_name.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.cashier.first_name.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.cashier.last_name.$error}">
  <label for="lname" class="form-label">Last Name</label>
  <input type="text" class="form-control" id="lname" v-model.trim="cashier.last_name" @blur="v$.cashier.last_name.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.cashier.last_name.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.cashier.phone_no.$error}">
  <label for="phoneNo" class="form-label">Phone Number</label>
  <input type="tel" class="form-control" id="phoneNo" v-model="cashier.phone_no" @blur="v$.cashier.phone_no.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.cashier.phone_no.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.cashier.email.$error}">
  <label for="email" class="form-label">Email address</label>
  <input type="email" class="form-control" id="email" v-model="cashier.email" @blur="v$.cashier.email.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.cashier.email.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
</form>
   
    <p class="ms-2 mt-3" :class="{'text-success':isSuccessed,'text-danger':isFaild}">{{resultNotifier}}</p>
 </template>    
  </base-modal>

  <!-- delete -->
<base-modal  id="deleteBaseModal" :button-type="buttonType" :isLoading="isLoading" @deleteItem="deleteItem" @cancel="clearDeleteModal">
   <template #modalBody>
      <div class="form-label fw-bold">Delete</div>
      <div class="my-3">Do you want to delete <i>{{deleteCashierTemp.first_name+' '+deleteCashierTemp.last_name}}</i>?</div>
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
           deleteCashierTemp:'',
           isLoading:false,
           isSuccessed:true,
           isFaild:false,
           resultNotifier:'',
           buttonType:'',
           isAnyError:null,
           cashierId:null,
           cashier:{
            first_name:'',
             last_name:'',
             phone_no:'',
             email:'',
             role:'cashier'
           }
       }
   },
   validations(){
     return {
      cashier:{
        first_name:{
              required: helpers.withMessage('first name can not be empty',required),
               },
        last_name:{
              required: helpers.withMessage('last name can not be empty',required),
               },
        phone_no:{
              required: helpers.withMessage('phone number can not be empty',required),
              numeric,
              min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
              max:helpers.withMessage('phone number should not be greter than 13 digits long',maxLength(13)),
               },
        email:{
            required:helpers.withMessage('email can not be empty',required),
            email
            }

      }
     }
   },
   mounted() {
     this.basemodal = new Modal(document.getElementById('baseModal'))
     this.deleteBaseModal=new Modal(document.getElementById('deleteBaseModal'))
   },
   computed:{
     cashiers(){
       return this.$store.getters['dean/cashiers']
     },
   },
   methods: {
     clearAddModal(){
         this.cashier={}
         this.resultNotifier=''
     },
     showDeleteModal(cashier){
           this.deleteCashierTemp={...cashier}
           this.buttonType='delete'
           this.deleteBaseModal.show()
      },
      clearDeleteModal(){
        this.resultNotifier=''
         this.deleteHead={}
      },

      addCashier(){
         this.basemodal.show();
         this.buttonType = 'add'
      } ,
      registerCashier(){
       this.v$.$validate()
       if(!this.v$.$error){
         this.isLoading = true
       this.$store.dispatch('dean/addCashier',JSON.stringify(this.cashier)).then((response)=>{
         if(response.status === 201){
           this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'You have registered one Cashier succesfully'
            this.basemodal.hide()
            this.v$.$reset()  
            this.resultNotifier=''
           this.isLoading = false
         }
         else{
         console.log('form faild validation ')
       }
       }).catch(e=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = e.error
       })
       }
      },
     editCashier(cashier){
        this.basemodal.show();
        this.buttonType = 'edit'        
        this.cashier.first_name = cashier.first_name
        this.cashier.last_name = cashier.last_name
        this.cashier.phone_no = cashier.phone_no
        this.cashier.profession = cashier.profession
        this.cashier.email = cashier.email
        this.cashierId = cashier.id
     },
     saveEditedCashier(){
       this.v$.$validate()
        if(!this.v$.$error){
          this.isLoading = true
          this.cashier.id = this.cashierId
          this.$store.dispatch('dean/updateCashier',this.cashier).then(()=>{
          this.basemodal.hide()
          this.v$.$reset()   
          this.resultNotifier=''
       }).catch(e=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = e.error
       }).finally(()=>{
            this.isLoading=true
       })
       }
      
     },
     deleteItem(){
       this.isLoading = true
       this.$store.dispatch('dean/deleteCashier',this.deleteCashierTemp.id).then((response)=>{
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
