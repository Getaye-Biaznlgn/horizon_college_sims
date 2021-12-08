<template>
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
</template>

    
</base-modal>
</template>
<script>
import BaseModal from '../../../components/BaseModal.vue'
import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import { required, email, minLength,alpha,numeric,helpers} from '@vuelidate/validators'
export default {
  components:{
    BaseModal
  },
   data() {
       return {
         v$:useValidate(),
           basemodal:null,
           newTeacher:false,
           isLoading:false,
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
        fname:{
               required: helpers.withMessage('first name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)
               },
        lname:{
               required: helpers.withMessage('last name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)
               },
        profession:{
               required: helpers.withMessage('profession can not be empty',required)
               },
        phoneNo:{
               required: helpers.withMessage('phone number can not be empty',required),
               numeric,
               min:minLength(13)
               },
        email:{
               required:helpers.withMessage('email can not be empty',required),email
               }
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
       this.$store.dispatch('setTeacher',JSON.stringify(this.teacher))
       }
       else{
         console.log('form faild validation ')
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
thead{
    background-color: #4285f4;
    border-color: #4285f4;
}
.warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;

  }
</style>