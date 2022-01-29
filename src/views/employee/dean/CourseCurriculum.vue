<template>
<base-card class="px-3 mx-4 mt-3">
<div class="mb-2 d-flex">
     <button @click="showAddModal" class="btn ms-auto btn-add text-white shadow-sm"> Add New Course</button> 
</div>

<div>
    <div class="d-flex">
       <div class="d-flex border rounded">
          <input type="text" v-model="searchValue" class="form-control search-input" placeholder="Course code" aria-label="search" aria-describedby="basic-addon2"/>
             <span  class="input-group-text search rounded-0" id="basic-addon2">
                <i class="fas fa-search"></i>
             </span>           
       </div>
    <div class="px-2 ms-auto"> 
        <select v-model="departmentIdForFilter" class="form-select" aria-label="select by department">
           <option  value="all">All Department</option>
           <option v-for="dep in degreeDepartments" :key="dep.id" :value="dep.id">{{dep.name}}</option>
        </select>
    </div>
     <div class="pe-2"> 
        <select v-model="programForFilter" class="form-select" aria-label="select by program">
           <option  value="all">All Program</option>
           <option  value="regular">Regular</option>
           <option  value="extension">Extension</option>
        </select>
     </div>
     
       <div class="pe-2"> 
          <select v-model="yearForFilter" class="form-select " aria-label="select by year">
            <option  value="all">All Year</option>
            <option  value="1">Year 1</option>
            <option  value="2">Year 2</option>
            <option  value="3">Year 3</option>
            <option  value="4">Year 4</option>
            <option  value="5">Year 5</option>
          </select>
       </div>
       <div class="pe-2"> 
          <select v-model="semesterForFilter" class="form-select" aria-label="select by semester">
            <option  value="all">All Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
            <option value="3">Semester 3</option>
          </select>
       </div>
       <div class=""> 
        <select v-model="typeForFilter" class="form-select" aria-label="select by program">
           <option  value="all">All Type</option>
           <option value="major">Major</option>
           <option value="common">Common</option>
           <option value="supporting">Supporting</option>
        </select>
     </div>
    </div>
</div>
<table class="mt-3">
  <tr >
    <th>No</th>
    <th>Course Code</th>
    <th>Course Title</th>
    <th>Credit hour</th>
    <th>Department</th>
    <th>Program</th>
    <th>Year</th>
    <th>Semester</th>
    <th>Type</th>
    <th><span></span></th>
  </tr>
  <tr v-for="(course,index) in filteredCourses" :key="course.id">
    <td>{{index+1}}</td>
    <td>{{course.code}}</td>
    <td>{{course.title}}</td>
    <td>{{course.cp}}</td>
    <td>{{course.department?.name}}</td>
    <td>{{course.program?.name}}</td>
    <td>{{course.year_no}}</td>
    <td>{{course.semester_no}}</td>
    <td>{{course.type}}</td>
    <td>
      <div class="dropdown">
          <a class="btn py-0" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="showEditModal(course)"><span role="button"  class="dropdown-item">Edit</span></li>
             <li @click="showDeleteModal(course)"><span  role="button"  class="dropdown-item">Delete</span></li>
          </ul>
      </div>
    </td>
  </tr>
 </table>
  <div v-if="!courses.length" class="mt-1 text-center">There is no added course</div>
  <div v-if="courses.length && !filteredCourses.length" class="mt-1 text-center">There is no filtered course</div>
 
</base-card>
<!-- ///add -->
<base-modal @save="save" @edit="edit" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType" @cancel="removeModalValue">
   <template #modalBody>
      <form @submit.prevent>
         <div class="mb-3" :class="{warining:v$.course.title.$error}">
              <label for="#courseTitle" class="form-label">Course Title</label>
              <input class="form-control" v-model.trim="course.title" @blur="v$.course.title.$touch" id="courseTitle" type="text" placeholder="Eg. Critical Thinking" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.course.title.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
         <div class="mb-3" :class="{warining:v$.course.code.$error}">
              <label for="#courseTitle" class="form-label">Course Code</label>
              <input class="form-control" v-model.trim="course.code" @blur="v$.course.code.$touch" id="courseTitle" type="text" placeholder="Eg. PHYL 101" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.course.code.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
         <div class="mb-3" :class="{warining:v$.course.cp.$error}">
              <label for="#cp" class="form-label">Credit Point</label>
              <input class="form-control" v-model.trim="course.cp" @blur="v$.course.cp.$touch" id="cp" type="number" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.course.cp.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
       
         <div class="row">
            <div class="col mb-3" :class="{warining:v$.course.degree_department_id.$error}">
                <div><label class="form-label" for="#department">Department</label></div>
                <select class="pb-1 px-2  form-select" v-model.trim="course.degree_department_id" @blur="v$.course.degree_department_id.$touch" aria-label="select">
                  <option v-for="department in degreeDepartments" :key="department.id"  :value="department.id" :selected="course.degree_department_id===department.id">{{department.name}}</option>
                </select>
                <div>

                </div>
                    <span class="error-msg mt-1"  v-for="(error, index) of v$.course.degree_department_id.$errors" :key="index">{{ error.$message+", " }}</span>
                </div> 
            <div class="col mb-3 mx-0" :class="{warining:v$.course.program_id.$error}">
                <div><label class="form-label" for="#program">Program</label></div>
                <select class="pb-1 px-1 form-select" v-model.trim="course.program_id" @blur="v$.course.program_id.$touch"  id="program" aria-label="select">
                   <option v-for="program in degreePrograms"  :key="program.id"  :value="program.id" :selected="course.program_id===program.id">{{program.name}}</option>
                </select>
                <span class="error-msg mt-1"  v-for="(error, index) of v$.course.program_id.$errors" :key="index">{{ error.$message+", " }}</span>
               
           </div> 
      </div>
       <div class="row">
           <div class="col" :class="{warining:v$.course.year_no.$error}">
              <label class="form-label" for="#year">Year</label>
              <input class="form-control" v-model.trim="course.year_no" @blur="v$.course.year_no.$touch" id="department"  type="number" min="1" max="10" aria-label=".form-control-lg">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.course.year_no.$errors" :key="index">{{ error.$message+", " }}</span>
           </div> 
           <div class="col" :class="{warining:v$.course.semester_no.$error}">
              <label class="form-label" for="#program">Semester</label>
              <input class="form-control " v-model.trim="course.semester_no"  @blur="v$.course.semester_no.$touch" id="program" type="number"  min="1" max="30" aria-label=".form-control-lg">
             <span class="error-msg mt-1"  v-for="(error, index) of v$.course.semester_no.$errors" :key="index">{{ error.$message+", " }}</span>
       </div> 
      </div>
      <div class="d-flex mt-3" :class="{warining:v$.course.type.$error}">
          <div class="form-check me-3">
              <input class="form-check-input " v-model.trim="course.type" :checked="course.type==='major'" name="type" value="major" type="radio" id="major">
              <label class="form-check-label" for="major">Major</label>
          </div>
          <div class="form-check me-3">
             <input class="form-check-input" v-model.trim="course.type" name="type" :checked="course.type==='common'" value="common"  type="radio"  id="common">
             <label class="form-check-label" for="common">Common</label>
          </div>
           <div class="form-check me-3">
             <input class="form-check-input" v-model.trim="course.type" name="type" :checked="course.type==='supporting'" value="supporting" type="radio"  id="supporting">
             <label class="form-check-label" for="supporting">Supporting</label>
          </div>
      </div>
      </form>
      <request-status-notifier class="mt-2" :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>

<!-- delete -->
<base-modal  id="deleteBaseModal" :button-type="actionButtonType" :isLoading="isSaving" @deleteItem="deleteItem" @cancel="clearDeleteModal">
   <template #modalBody>
      <div class="form-label fw-bold">Delete</div>
      <div class="my-3">Do you want to delete <i>{{courseForDelete.title}}</i> course?</div>
      <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>
</template>
<script>
import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import {mapGetters} from 'vuex'
import { required,alpha,helpers,numeric, maxLength, maxValue} from '@vuelidate/validators'

export default {

  data(){
    return{ 
      v$:useValidate(),
      addBaseModal:null,
      isSaving:false,
      actionButtonType:'',
      responseMessage:'',
      isNotSucceed:'',
       /////////////////////////|
      //for filter and search//|/
     /////////////////////////|/
      searchValue:'',
      departmentIdForFilter:'all',
      programForFilter:'all',
      yearForFilter:'all',
      semesterForFilter:'all',
      typeForFilter:'all',
      
      deleteBaseModal:'',
      courseForDelete:'',
 course:{
      id:'',
      title:'',
      code:'',
      cp:'',
      degree_department_id:'',
      program_id:'',
      year_no:'',
      semester_no:'',
      type:''
      }
      
    }
  },
computed:{
    ...mapGetters({degreeDepartments:'dean/degreeDepartments',courses:'dean/courses', programs:'programs'}),
   degreePrograms(){
      return this.programs.filter((program)=>{
        return program.type==='degree'
      })
      },
  filteredCourses(){
     ////////////search
      let tempCourses=[...this.courses]
      if(this.searchValue!=''&& this.searchValue){
        tempCourses=tempCourses.filter((item)=>{
          return item.code
                  .toLowerCase()
                  .startsWith(this.searchValue.toLowerCase())
       })
     }
  
  //filter by department//
     if(this.departmentIdForFilter !=='all'){
            tempCourses=tempCourses.filter((item)=>{
              return Number(item.department.id)===Number(this.departmentIdForFilter)
            })
       }
      
  //filter by program//
      if(this.programForFilter.toLowerCase() !=='all'){
            tempCourses=tempCourses.filter((item)=>{
              return item.program?.name.toLowerCase()==this.programForFilter
            })
       }
    
   //filter by year//
      if(this.yearForFilter.toLowerCase() !=='all'){
        console.log('here we go year for filter')
            tempCourses=tempCourses.filter((item)=>{
              return Number(item.year_no)===Number(this.yearForFilter)
            })
       }
     
   //filter by semester//
      if(this.semesterForFilter.toLowerCase() !=='all'){
            tempCourses=tempCourses.filter((item)=>{
              return Number(item.semester_no)===Number(this.semesterForFilter)
            })
       }

   //filter by type//
      if(this.typeForFilter.toLowerCase() !=='all'){
            tempCourses=tempCourses.filter((item)=>{
              return item.type.toLowerCase()===this.typeForFilter.toLowerCase()
            })
       }   
    return tempCourses
   }
 },
  validations(){
     return{
      course:{
             title:{
                 required: helpers.withMessage('Course Title name can not be empty',required),
               },
             code:{
                 required: helpers.withMessage('Course code can not be empty',required),
                 max:helpers.withMessage('Course code shoudn\'t be greater than 20 letters', maxLength(20))
             },
             cp:{
                 required: helpers.withMessage('Credit point can not be empty',required),
                 numeric: helpers.withMessage('Credit point must be only number',numeric)
              }, 
             degree_department_id:{
                 required: helpers.withMessage('Department should be selected',required),
              },
             program_id:{
                 required: helpers.withMessage('Program should be selected',required),
              },
             year_no:{
                 required: helpers.withMessage('Year can not be empty',required),
                 numeric:helpers.withMessage('Year should be only number',numeric),
                 maxValue:helpers.withMessage('Value too high',maxValue(6))
              },
             semester_no:{
                 required: helpers.withMessage('Semester can not be empty',required),
                 numeric:helpers.withMessage('Semester should be only number',numeric),
              },
             type:{
                 required: helpers.withMessage('Type should be selected',required),
                 alpha:helpers.withMessage('Type must be only alpahbet letters',alpha),
              },
               
            }
     }
  },
  methods:{
      showAddModal(){
        this.actionButtonType='add'
        this.addBaseModal.show()
      },
     
      removeModalValue(){
        this.course={}
        this.responseMessage=''
        this.v$.$reset()
      },
      showEditModal(course){
        this.course={...course}
        this.course.degree_department_id=course.department?.id
        this.course.program_id=course.program?.id
        this.actionButtonType='edit'
        this.addBaseModal.show()
      },
       
       showDeleteModal(course){
        this.courseForDelete=course
        this.actionButtonType='delete'
        this.deleteBaseModal.show()
      },
       clearDeleteModal(){
        this.responseMessage=''
      },
        async deleteItem(){
         this.responseMessage=''
          this.isSaving=true
          await this.$store.dispatch('dean/deleteCourse',this.courseForDelete.id)
          .then(()=>{
          this.deleteBaseModal.hide()
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage='Faild to delete Department Head'
         }).finally(()=>{
          this.isSaving=false
         })
       },
      edit(){
        this.request('dean/updateCourse')
      },
      save(){
        this.request('dean/addCourse')
      },
     async request(action){
       this.responseMessage=''
       this.v$.$validate()
       if(!this.v$.$error){
         this.isSaving=true
          await this.$store.dispatch(action,this.course)
          .then(()=>{
            this.addBaseModal.hide()
            this.removeModalValue()
         }).catch((e)=>{
           this.isNotSucceed=true,
           this.responseMessage=e
         }).finally(()=>{
          this.isSaving=false
         })
       }
     
      },
     
    },
  mounted() {
   this.addBaseModal = new Modal(document.getElementById('addBaseModal'));
   this.deleteBaseModal=new Modal(document.getElementById('deleteBaseModal'))
  }
 }
 </script>


