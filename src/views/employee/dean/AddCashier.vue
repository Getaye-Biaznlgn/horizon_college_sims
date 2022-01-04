<template>
    <base-card class="px-3 mx-4 mt-3">
    <div class="d-flex justify-content-end">
    <button @click="addCashier()" class="btn btn-add text-white">Add New Cashier</button>
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
              <li><span @click="editCashier(cashier)" class="dropdown-item px-4 py-2">edit</span></li>
             <li><span @click="deleteCashier(cashier.id)" class="dropdown-item px-4 py-2">delete</span></li>
          </ul>
        </div>
    </td>
    </tr>
  </tbody>

</table>
    <div v-if="!cashiers.length" class="text-center">There is no added cashier</div>

</base-card>

    <!-- cashier registration form dialog-->
    <base-modal :is-Loading="isLoading" id="baseModal" :button-Type="buttonType" @edit="saveEditedCashier" @save="registerCashier">
    <template #modalBody>
    <div class="bg-white p-3">

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
    </div>
    <p class="ms-2 mt-3" :class="{success:isSuccessed,faild:isFaild}">{{resultNotifier}}</p>
 </template>    
  </base-modal>
</template>
<script>

import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import { required, email, minLength,alpha,numeric,helpers, maxLength} from '@vuelidate/validators'
export default {
   data() {
       return {
         v$:useValidate(),
           basemodal:null,
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
        first_name:{required: helpers.withMessage('first name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
        last_name:{required: helpers.withMessage('last name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
               phone_no:{
              required: helpers.withMessage('phone number can not be empty',required),
               numeric,
               min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
               max:helpers.withMessage('phone number should not be greter than 13 digits long',maxLength(13)),
               },
               email:{required:helpers.withMessage('email can not be empty',required),email}

      }
     }
   },
   mounted() {
     this.basemodal = new Modal(document.getElementById('baseModal'))
   },
   computed:{
     cashiers(){
       return this.$store.getters['dean/cashiers']
     },
   },
   methods: {
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
           this.resultNotifier = 'You register one Cashier succesfully'
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
         console.log('edit cashier')
         console.log(this.cashier)
         this.cashier.id = this.cashierId
       this.$store.dispatch('dean/updateCashier',this.cashier).then((response)=>{
         console.log(response)
         if(response.status === 200){
           this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'You have updated one cashier succesfully'
           this.isLoading = false
         }
          else{
         console.log('updated data faild validation ')
       }
       }).catch(e=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = e.error
       })
       }
       else{
         console.log('error occured')
       }
     },
     deleteCashier(id){
       this.$store.dispatch('dean/deleteCashier',id)
     }
   }, 
}
</script>
