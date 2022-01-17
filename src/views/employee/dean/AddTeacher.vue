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
      <th>Qualification</th>
      <th>GPA</th>
      <th><span class="sr-only">action</span></th>
    </tr>
  </thead>
  <tbody>
     <tr v-for="(teacher,index) in filteredTeachers" :key="teacher.id">
      <td>{{index+1}}</td>
      <td>{{teacher.first_name+" "+teacher.last_name}}</td>
      <td>{{teacher.phone_no}}</td>
      <td>{{teacher.email}}</td>
      <td>{{teacher.type}}</td>
      <td>{{teacher.qualification}}</td>
      <td>{{teacher.gpa}}</td>
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
 </table>
    <div v-if="!teachers.length" class="text-center">Teacher isnot added</div>

</base-card>

    <!-- teracher registration form dialog-->
    <base-modal :is-loading= "isLoading" id="baseModal" :button-type="buttonType" @edit="saveEditedTeacher" @save="registerTeacher" @cancel="clearAddModal">
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
<div class="mb-3" :class="{warining:v$.teacher.qualification.$error}">
  <label for="qualification" class="form-label">qualification</label>
  <input type="text" class="form-control" id="qualification" v-model.trim="teacher.qualification" @blur="v$.teacher.qualification.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.qualification.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3" :class="{warining:v$.teacher.gpa.$error}">
  <label for="gpa" class="form-label">GPA</label>
  <input type="number" max="4" class="form-control" id="gpa" v-model.trim="teacher.gpa" @blur="v$.teacher.gpa.$touch">
  <span class="error-msg mt-1"  v-for="(error, index) of v$.teacher.gpa.$errors" :key="index">{{ error.$message+", " }}</span>
</div>
<div class="mb-3">
<label for="qualification" class="form-label">Type</label>
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
<p class="ms-2 mt-3" :class="{'text-success':isSuccessed,'text-danger':isFaild}">{{resultNotifier}}</p>
  </template>    
  </base-modal>
</template>
<script>
import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import { required, email, minLength,numeric,helpers, maxLength} from '@vuelidate/validators'
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
           teacherType:'all',
           buttonType:'',
           isInvalid:null,
           teacherId:null,
           ist:[],
           teacher:{
             first_name:'',
             last_name:'',
             phone_no:'',
             email:'',
             qualification:'',
             gpa:'',
             type:'',
           }
       }
   },
   validations(){
     return {
      teacher:{
        first_name:{
               required: helpers.withMessage('first name can not be empty',required),
               },
        last_name:{
               required: helpers.withMessage('last name can not be empty',required),
               },
               qualification:{
                 required: helpers.withMessage('qualification can not be empty',required)},

               phone_no:{
              required: helpers.withMessage('phone number can not be empty',required),
               numeric,
               min:helpers.withMessage('phone number should be at least 10 digits long',minLength(10)),
               max:helpers.withMessage('phone number should not be greter than 13 digits long',maxLength(13)),
               },
               email:{required:helpers.withMessage('email can not be empty',required),email},
               gpa:{
                 numeric,
                 required:helpers.withMessage('GPA field can not be empty',required),
                 }
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
        filteredTeachers(){
          var ist
        if(this.teacherType === 'all'){
          ist = this.teachers
        }
        else{
          ist = this.teachers.filter(teacher=>{
          return this.teacherType === teacher.type
        })
        }
        return ist
      },
   },
   created() {
     this.ist = this.teachers
     if(this.type){
       this.teacherType=this.type
     }
   },

   methods: {
      addTeacher(){
         this.basemodal.show();
         this.buttonType='add'
      } ,
      registerTeacher(){
        this.resultNotifier=''
       this.v$.$validate()
       if(!this.v$.$error){
         this.isLoading = true
       this.$store.dispatch('dean/addTeachers',this.teacher).then((response)=>{
         if(response.status === 201){
           this.basemodal.hide()
           this.clearAddModal()
         }
          else{
            throw ''
       }
       }).catch(()=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier ='Faild to add teacher'
       }).finally(()=>{
         this.isLoading = false
       })
       }
      },
      clearAddModal(){
         this.teacher.first_name=''
         this.teacher.last_name=''
         this.teacher.phone_no=''
         this.teacher.email=''
         this.teacher.qualification=''
         this.teacher.gpa=''
         this.teacher.type=''
         this.resultNotifier=''
         this.v$.$reset()
      },
      editTeacher(teacher){
        this.basemodal.show();
        this.buttonType = 'edit'        
        this.teacher.first_name = teacher.first_name
        this.teacher.last_name = teacher.last_name
        this.teacher.phone_no = teacher.phone_no
        this.teacher.qualification = teacher.qualification
        this.teacher.email = teacher.email
        this.teacher.gpa=teacher.gpa
        this.teacherId = teacher.id
        this.teacher.type=teacher.type
         
      },
      saveEditedTeacher(){
        this.resultNotifier=''
        this.v$.$validate()
        if(!this.v$.$error){
          this.isLoading = true
         console.log('edit teacher')
         console.log(this.teacher)
         this.teacher.id = this.teacherId
       this.$store.dispatch('dean/updateTeacher',this.teacher).then((response)=>{
         console.log(response)
         if(response.status === 200){
           this.basemodal.hide()
           this.clearAddModal()
         }
          else{
         console.log('updated data faild validation ')
       }
       }).catch(()=>{
         this.isSuccessed = false
         this.isFaild = true
         this.resultNotifier = 'Faild to update teacher'
       }).finally(()=>{
          this.isLoading = false
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
   }, 
}
</script>

