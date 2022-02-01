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
     <label class="form-check-label" for="partime"> Partime </label>
   </div>
  </div>
  <div>
    <button @click="addTeacher" class="btn btn-add text-white px-2">Add New Teacher</button>
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
       <th><span class="sr-only"></span></th>
    </tr>
  </thead>
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
             <li><span @click="editTeacher(teacher,'edit')" class="dropdown-item px-4 py-2">Edit</span></li>
             <li><span @click="showDeleteModal(teacher)" class="dropdown-item px-4 py-2">Delete</span></li>
          </ul>
        </div>
    </td>
    </tr>
 </table>
 <div v-if="!teachers.length" class="text-center mt-1">Teacher isnot added</div>

</base-card>

    <!-- teracher registration form dialog-->
    <base-modal :is-loading= "isLoading" id="baseModal" :button-type="buttonType" @edit="saveEditedTeacher" @save="registerTeacher" @cancel="clearAddModal">
    <template #modalBody>
    
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
    
<p class="ms-2 mt-3" :class="{'text-success':isSuccessed,'text-danger':isFaild}">{{resultNotifier}}</p>
  </template>    
  </base-modal>

    <!-- delete -->
<base-modal  id="deleteBaseModal" :button-type="buttonType" :isLoading="isLoading" @deleteItem="deleteItem" @cancel="clearDeleteModal">
   <template #modalBody>
      <div class="form-label fw-bold">Delete</div>
      <div class="my-3">Do you want to delete <i>{{deleteTeacherTemp.first_name+' '+deleteTeacherTemp.last_name}}</i>?</div>
      <p class="ms-2 mt-3" :class="{'text-success':isSuccessed,'text-danger':isFaild}">{{resultNotifier}}</p>
   </template>
</base-modal>
</template>
<script>
import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import { required, email, minLength,numeric,helpers,maxValue,minValue, maxLength} from '@vuelidate/validators'
export default {
  props:['type'],
   data() {
       return {
         v$:useValidate(),
           basemodal:null,
           deleteBaseModal:'',
           deleteTeacherTemp:'',
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
                required: helpers.withMessage('qualification can not be empty',required)
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
            },
         gpa:{
               numeric,
               required:helpers.withMessage('GPA field can not be empty',required),
               maxValue:helpers.withMessage('Shouldn\'t be greater than 4.0', maxValue(4.0)),
               minValue:helpers.withMessage('Shouldn\'t be less than 0', minValue(0)),
             }
      }
     }
   },
   mounted() {   
     this.deleteBaseModal=new Modal(document.getElementById('deleteBaseModal'))
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
      showDeleteModal(teacher){
           this.deleteTeacherTemp={...teacher}
           this.buttonType='delete'
           this.deleteBaseModal.show()
      },
      clearDeleteModal(){
        this.resultNotifier=''
         this.deleteHead={}
      },
      registerTeacher(){
        this.resultNotifier=''
       this.v$.$validate()
       if(!this.v$.$error){
         this.isLoading = true
       this.$store.dispatch('dean/addTeachers',this.teacher).then((response)=>{
         if(response.status === 201){
           this.isFaild = false
           this.isSuccessed = true
          //  this.resultNotifier = 'You have registered one teacher succesfully'
           this.isLoading = false
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
      cancelDialog(){
          this.basemodal.hide()
      },
      clearAddModal(){
      
        this.teacher={}
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
      
      },
      
       deleteItem(){
       this.isLoading = true
       this.$store.dispatch('dean/deleteTeacher',this.deleteTeacherTemp.id).then((response)=>{
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


