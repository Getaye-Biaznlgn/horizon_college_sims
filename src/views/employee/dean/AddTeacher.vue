<template>
    <base-card class="px-3 mx-4 mt-3">
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
    <button @click="addTeacher()" class="btn btn-add text-white px-2">Add New Teacher</button>
    </div>
    </div>
    <table class="mt-3">
  <thead>
    <tr>
      <th>NO</th>
      <th>Full Name</th>
      <th>Phone Number</th>
      <th>Email Address</th>
      <th>Type</th>
      <th>Profession</th>
      <th><span class="sr-only">action</span></th>
    </tr>
  </thead>
  <tbody v-if="teacherList?.length">
     <tr v-for="(teacher,index) in teacherList" :key="teacher.id">
      <td>{{index+1}}</td>
      <td>{{teacher.first_name+" "+teacher.last_name}}</td>
      <td>{{teacher.phone_no}}</td>
      <td>{{teacher.email}}</td>
      <td>{{teacher.type}}</td>
      <td>{{teacher.profession}}</td>
       <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink border rounded shadow-sm">
             <li><span @click="editTeacher(teacher,'edit')" class="dropdown-item px-4 py-2">edit</span></li>
             <li><span @click="deleteTeacher(teacher.id)" class="dropdown-item px-4 py-2">delete</span></li>
          </ul>
        </div>
    </td>
    </tr>
  </tbody>
   <div v-else class="mt-5 mb-5 text-center text-danger">There is no Teachers found please try again</div>
 </table>
    <div v-if="!teacherList.length" class="text-center">There isnot added teacher</div>

</base-card>

    <!-- teracher registration form dialog-->
    <base-modal :is-loading= "isLoading" id="baseModal" :button-type="buttonType" @edit="saveEditedTeacher" @save="registerTeacher">
    <template #modalBody>
    <div class="bg-white p-3">

    <form>
    <div class="mb-3" :class="{warining:v$.teacher.first_name.$error}">
  <label for="fname" class="form-label">First Name</label>
  <input type="text" class="form-control" id="fname" v-model.trim="teacher.first_name" @blur="v$.teacher.first_name.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.first_name.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.teacher.last_name.$error}">
  <label for="lname" class="form-label">Last Name</label>
  <input type="text" class="form-control" id="lname" v-model.trim="teacher.last_name" @blur="v$.teacher.last_name.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.last_name.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.teacher.profession.$error}">
  <label for="profession" class="form-label">Profession</label>
  <input type="text" class="form-control" id="profession" v-model.trim="teacher.profession" @blur="v$.teacher.profession.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.profession.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3">
<label for="profession" class="form-label">Type</label>
<select class="form-select" aria-label="Default select example" v-model="teacher.type">
  <option selected value="regular">Regular</option>
  <option value="partime">Partime</option>
  </select>
</div>
<div class="mb-3" :class="{warining:v$.teacher.phone_no.$error}">
  <label for="phoneNo" class="form-label">Phone Number</label>
  <input type="tel" class="form-control" id="phoneNo" v-model="teacher.phone_no" @blur="v$.teacher.phone_no.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.phone_no.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.teacher.email.$error}">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" v-model="teacher.email" @blur="v$.teacher.email.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.email.$errors" :key="index">{{ error.$message+", " }}</span>
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
  props:['type'],
   data() {
       return {
         v$:useValidate(),
           basemodal:null,
           modalId:'',
           isLoading:false,
           isSuccessed:true,
           isFaild:false,
           resultNotifier:'',
           teacherType:null,
           buttonType:'',
           isInvalid:null,
           teacherId:null,
           teacherList:[],
           teacher:{
             first_name:'',
             last_name:'',
             phone_no:'',
             email:'',
             profession:'',
             type:'',
           }
       }
   },
   validations(){
     return {
      teacher:{
        first_name:{required: helpers.withMessage('first name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
        last_name:{required: helpers.withMessage('last name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)},
               profession:{required: helpers.withMessage('profession can not be empty',required)},
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
     this.modalId = 'baseModal'
     this.basemodal = new Modal(document.getElementById('baseModal'))
   },
   computed:{
     teachers(){
       return this.$store.getters['dean/teachers']
     },
   },
   created() {
     this.teacherList = this.teachers
     if(this.type){
       this.filterTeacher(this.type)
       this.teacherType=this.type
     }
        
   },
   watch:{
    teacherType(newValue){
      this.filterTeacher(newValue)
    }
   },
   methods: {
      addTeacher(){
         this.basemodal.show();
         this.buttonType='add'
      } ,
      registerTeacher(){
       this.v$.$validate()
       if(!this.v$.$error){
         this.isLoading = true
       this.$store.dispatch('dean/addTeachers',this.teacher).then((response)=>{
         if(response.status === 201){
           this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'You have registered one teacher succesfully'
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
       else{
         console.log('error occured')
       }
      },
      cancelDialog(){
          this.basemodal.hide();
      },
      editTeacher(teacher){
        this.basemodal.show();
        this.buttonType = 'edit'        
        this.teacher.first_name = teacher.first_name
        this.teacher.last_name = teacher.last_name
        this.teacher.phone_no = teacher.phone_no
        this.teacher.profession = teacher.profession
        this.teacher.email = teacher.email
        this.teacherId = teacher.id
         
      },
      saveEditedTeacher(){
        this.v$.$validate()
        if(!this.v$.$error){
          this.isLoading = true
         console.log('edit teacher')
         console.log(this.teacher)
         this.teacher.id = this.teacherId
       this.$store.dispatch('dean/updateTeacher',this.teacher).then((response)=>{
         console.log(response)
         if(response.status === 200){
           this.isFaild = false
           this.isSuccessed = true
           this.resultNotifier = 'You have updated one teacher succesfully'
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
        console.log('you have edited teacher')
      },
      deleteTeacher(id){
         this.$store.dispatch('dean/deleteTeacher',id)
      },
      filterTeacher(value){
        if(value === 'all'){
          this.teacherList = this.teachers
        }
        else{
          this.teacherList = this.teachers.filter(teacher=>{
          return value === teacher.type
        })
        }
        
      },
           
   }, 
}
</script>
<style scoped>
.wraper{
    position: relative;
}
.addbtn{
    background-color: #2f4587;
    color: #fff;
    width: 10em;

}
.addbtn:hover{
    background-color:#366ad9 ;
}
.dropdown ul{
  background-color: #f5f6fa;
}
ul li{
    cursor: pointer;
  }
 a span:hover{
   color: #ff9500;
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
