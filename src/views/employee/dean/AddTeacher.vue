<template>
    <div class="wraper border rounded shadow-sm p-3 m-2 bg-white">
    <div class="d-flex justify-content-between">
    <div class="d-flex justify-content-between">
   <div class="form-check ms-5 me-3">
  <input class="form-check-input" type="radio" name="teachertype" value="all" id="all" checked v-model="teacherType">
  <label class="form-check-label" for="teachertype1">
    All
  </label>
</div>
    <div class="form-check me-3">
  <input class="form-check-input" type="radio" name="teachertype" value="regular" id="regular" v-model="teacherType">
  <label class="form-check-label" for="teachertype1">
    Regular
  </label>
</div>
    <div class="form-check me-3">
  <input class="form-check-input" type="radio" name="teachertype" value="partime" id="partime" v-model="teacherType">
  <label class="form-check-label" for="teachertype1">
    Partime
  </label>
</div>
    </div>
    <div>
    <button @click="addTeacher()" class="btn addbtn">Add New Teacher</button>
    </div>
    </div>
    <table class="table table-bordered mt-3">
  <thead>
    <tr>
      <th scope="col">NO</th>
      <th scope="col">Full Name</th>
      <th scope="col">Phone Number</th>
      <th scope="col">Email Address</th>
      <th scope="col">Type</th>
      <th scope="col">Profession</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="n in 10" :key="n">
      <td>1</td>
      <td>Endalu Belachew</td>
      <td>0912345221</td>
      <td>endalu@gmail.com</td>
      <td>Regular</td>
      <td>Database Teacher</td>
    </tr>
  </tbody>
</table>

    </div>
    <!-- teracher registration form dialog-->
    <fixed-dialog v-if="newTeacher">
    <div class="addTeacherDialog shadow-sm ms-auto me-auto p-5 mt-5 mb-5 bg-white">
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
<div class="d-flex justify-content-between mt-5">
<button type="button" class="btn commenbtn" @click="cancelDialog()">Cancel</button>
<button type="button" class="btn commenbtn" @click="registerTeacher()">Add</button>
</div>
    </form>
    </div>
    </fixed-dialog>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required, email, minLength,alpha,numeric,helpers} from '@vuelidate/validators'
export default {
   data() {
       return {
         v$:useValidate(),
           teacherType:'',
           newTeacher:false,
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
        fname:{required: helpers.withMessage('first name cannot be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
        lname:{required: helpers.withMessage('last name cannot be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
               profession:{required: helpers.withMessage('profession cannot be empty',required)},
               phoneNo:{required: helpers.withMessage('phone number can not be empty',required),
               numeric,min:minLength(13)},
               email:{required:helpers.withMessage('email is required',required),email}

      }
     }
   },
   watch:{},
   methods: {
      addTeacher(){
         this.newTeacher = true;
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
          this.newTeacher = false;
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
.addTeacherDialog{
  width: 35%;
}
.warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;

  }
</style>