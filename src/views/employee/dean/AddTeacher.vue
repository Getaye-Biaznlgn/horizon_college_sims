<template>
    <div class="wraper border rounded shadow-sm p-3 m-2 bg-white">
    <div class="d-flex justify-content-between">
    <div class="d-flex justify-content-between">
   <div class="form-check ms-5 me-3">
  <input class="form-check-input" type="radio" name="teachertyperadio" value="all" id="all" checked v-model="teacherType">
  <label class="form-check-label" for="all">
    All
  </label>
</div>
    <div class="form-check me-3">
  <input class="form-check-input" type="radio" name="teachertyperadio" value="regular" id="regular" v-model="teacherType">
  <label class="form-check-label" for="regular">
    Regular
  </label>
</div>
    <div class="form-check me-3">
  <input class="form-check-input" type="radio" name="teachertyperadio" value="partime" id="partime" v-model="teacherType">
  <label class="form-check-label" for="partime">
    Partime
  </label>
</div>
    </div>
    <div>
    <button @click="addTeacher()" class="btn addbtn">Add New Teacher</button>
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
      <th class="text-white">Profession</th>
      <th><span class="sr-only">action</span></th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="n in 10" :key="n">
      <td>1</td>
      <td>Kassahun Worku</td>
      <td>0912345221</td>
      <td>endalu@gmail.com</td>
      <td>Regular</td>
      <td>Database Teacher</td>
      <td>edit</td>
    </tr>
  </tbody>
</table>

    </div>
    <!-- teracher registration form dialog-->
    <base-modal @save="registerTeacher" :is-loading="isLoading">
    <template #modalBody>
    <div class="bg-white p-3">

    <form>
    <div class="mb-3" :class="{warining:v$.teacher.fname.$error}">
  <label for="fname" class="form-label">First Name</label>
  <input type="text" class="form-control" id="fname" v-model.trim="teacher.fname" @blur="v$.teacher.fname.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.fname.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.teacher.lname.$error}">
  <label for="lname" class="form-label">Last Name</label>
  <input type="text" class="form-control" id="lname" v-model.trim="teacher.lname" @blur="v$.teacher.lname.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.lname.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.teacher.profession.$error}">
  <label for="profession" class="form-label">Profession</label>
  <input type="text" class="form-control" id="profession" v-model.trim="teacher.profession" @blur="v$.teacher.profession.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.profession.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.teacher.phoneNo.$error}">
  <label for="phoneNo" class="form-label">Phone Number</label>
  <input type="tel" class="form-control" id="phoneNo" v-model="teacher.phoneNo" @blur="v$.teacher.phoneNo.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.phoneNo.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.teacher.email.$error}">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" v-model="teacher.email" @blur="v$.teacher.email.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.email.$errors" :key="index">{{ error.$message+", " }}</span>
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
           teacher:{
             fname:'',
             lname:'',
             phoneNo:'',
             email:'',
             profession:''
           }
       }
   },
   validations(){
     return {
      teacher:{
        fname:{required: helpers.withMessage('first name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
        lname:{required: helpers.withMessage('last name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
               profession:{required: helpers.withMessage('profession can not be empty',required)},
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
      addTeacher(){
         this.basemodal.show();
      } ,
      registerTeacher(){
       this.v$.$validate()
       if(!this.v$.error){
       this.$store.dispatch('setTeacher',JSON.stringify(this.teacher)).then((response)=>{
         if(response.status === 200){
           this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'You register one teacher succesfully'
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