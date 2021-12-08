<template>
    <div class="wraper border rounded shadow-sm p-3 m-2 bg-white">
    <div class="d-flex justify-content-between">
    <div class="d-flex justify-content-between">
   <div class="form-check ms-5 me-3">
  <input class="form-check-input" type="radio" name="Cashiertype" value="all" id="all" checked v-model="CashierType">
  <label class="form-check-label" for="all">
    All
  </label>
</div>
    <div class="form-check me-3">
  <input class="form-check-input" type="radio" name="Cashiertype" value="regular" id="regular" v-model="CashierType">
  <label class="form-check-label" for="regular">
    Regular
  </label>
</div>
    <div class="form-check me-3">
  <input class="form-check-input" type="radio" name="Cashiertype" value="partime" id="partime" v-model="CashierType">
  <label class="form-check-label" for="partime">
    Partime
  </label>
</div>
    </div>
    <div>
    <button @click="addCashier()" class="btn addbtn">Add New Cashier</button>
    </div>
    </div>
    <table class="mt-3">
  <thead>
    <tr class="table-header">
      <th class="text-white">NO</th>
      <th class="text-white">Full Name</th>
      <th class="text-white">Phone Number</th>
      <th class="text-white">Email Address</th>
      <th class="text-white">Type</th>
      <th><span class="sr-only">action</span></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="n in 10" :key="n">
      <td>1</td>
      <td>Endalu Belachew</td>
      <td>0912345221</td>
      <td>endalu@gmail.com</td>
      <td>Regular</td>
      <td>edit</td>
    </tr>
  </tbody>
</table>

    </div>
    <!-- teracher registration form dialog-->
    <base-modal @save="registerCashier" :is-loading="isLoading">
    <template #modalBody>
    <div class="bg-white p-3">

    <form>
    <div class="mb-3" :class="{warining:v$.cashier.fname.$error}">
  <label for="fname" class="form-label">First Name</label>
  <input type="text" class="form-control" id="fname" v-model.trim="cashier.fname" @blur="v$.cashier.fname.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.cashier.fname.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.cashier.lname.$error}">
  <label for="lname" class="form-label">Last Name</label>
  <input type="text" class="form-control" id="lname" v-model.trim="cashier.lname" @blur="v$.cashier.lname.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.cashier.lname.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.cashier.phoneNo.$error}">
  <label for="phoneNo" class="form-label">Phone Number</label>
  <input type="tel" class="form-control" id="phoneNo" v-model="cashier.phoneNo" @blur="v$.cashier.phoneNo.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.cashier.phoneNo.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.cashier.email.$error}">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" v-model="cashier.email" @blur="v$.Cashier.email.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.cashier.email.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
</form>
    </div>
    <p class="ms-2 mt-3" :class="{success:isSuccessed,faild:isFaild}">This is Errors from server</p>
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
           teacherType:null,
           cashier:{
             fname:'',
             lname:'',
             phoneNo:'',
             email:''
           }
       }
   },
   validations(){
     return {
      cashier:{
        fname:{required: helpers.withMessage('first name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
        lname:{required: helpers.withMessage('last name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
               phoneNo:{
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
   methods: {
      addCashier(){
         this.basemodal.show();
      } ,
      registerCashier(){
       this.v$.$validate()
       if(!this.v$.error){
       this.$store.dispatch('setCashier',JSON.stringify(this.cashier)).then((response)=>{
         if(response.status === 200){
           this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'You register one Cashier succesfully'
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
      cancelDialog(){
          this.basemodal.hide();
      }
   }, 
}
</script>
<style scoped>
.wraper{
    position: relative;
}
.addbtn{
    background-color: #ff9500;
    color: #fff;
    width: 10em;

}
.commenbtn{
  background-color: #ff9500;
    color: #fff;
    width: 7em;  
}
.btn:hover{
    background-color:#eca643 ;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
.table-header{
    background-color:#4285fa ;
    border-radius: 5px;
}
th{
  text-align: left;
  padding: 8px;
  
}
td{
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  vertical-align: top;
}
.warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;

  }
  .success{
    color: green;
  }
  .faild{
    color: red;
  }
</style>