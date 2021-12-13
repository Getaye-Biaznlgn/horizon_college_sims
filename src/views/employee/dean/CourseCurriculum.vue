<template>
<base-card class="px-3 mx-4 mt-3">

<div class="d-flex justify-content-between">
    <div class="d-flex">
       <div class="d-flex border rounded">
          <input type="text" class="form-control search-input" placeholder="Course code" aria-label="search" aria-describedby="basic-addon2"/>
             <span  class="input-group-text search rounded-0" id="basic-addon2">
                <i class="fas fa-search"></i>
             </span>           
       </div>
        <div class="px-2"> 
        <select class="form-select" aria-label="select by department">
           <option selected value="here we go">Department</option>
        </select>
       </div>
     <div class="pe-2"> 
        <select class="form-select" aria-label="select by program">
           <option selected value="here we go">Program</option>
        </select>
     </div>
     
       <div class="pe-2"> 
          <select class="form-select " aria-label="select by year">
            <option selected value="here we go">Year</option>
          </select>
       </div>
       <div class="pe-2"> 
          <select class="form-select" aria-label="select by semester">
            <option selected value="here we go">Semester</option>
          </select>
       </div>
       <div class="pe-2"> 
        <select class="form-select" aria-label="select by program">
           <option selected value="here we go">Type</option>
        </select>
     </div>
    </div>
       <button @click="showAddModal" class="btn ms-auto btn-add text-white shadow-sm"> Add New Course</button> 
</div>

<table class="mt-3">
  <tr class="table-header">
    <th class="text-white">No</th>
    <th class="text-white">Course Code</th>
    <th class="text-white">Course Title</th>
    <th class="text-white">Credit hour</th>
    <th class="text-white">Department</th>
    <th class="text-white">Program</th>
    <th class="text-white">Year</th>
    <th class="text-white">Semester</th>
    <th class="text-white">Type</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr v-for="(course,index) in courses" :key="course.id" class="border border-secondary rounded">
    <td>{{index+1}}</td>
    <td>{{course.code}}</td>
    <td>{{course.title}}</td>
    <td>{{course.cp}}</td>
    <td>{{course.department.name}}</td>
    <td>{{course.program}}</td>
    <td>{{course.year_no}}</td>
    <td>{{course.semester_no}}</td>
    <td>{{course.type}}</td>
    <td>
      <div class="dropdown">
          <a class="btn py-0" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>

          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="showEditModal(index)"><span  class="dropdown-item">Edit</span></li>
          </ul>
      </div>
    </td>
  </tr>
 </table>
</base-card>
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
      <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>

   </template>
</base-modal>

</template>
<script>
import { Modal } from 'bootstrap';
import useValidate from '@vuelidate/core'
import {mapGetters} from 'vuex'
import { required,alpha,helpers,numeric} from '@vuelidate/validators'

export default {

  data(){
    return{ 
      v$:useValidate(),
      addBaseModal:null,
      isSaving:false,
      actionButtonType:'',
      responseMessage:'',
      isNotSucceed:'',

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
    ...mapGetters(['degreeDepartments','courses','degreePrograms'])
  },
  validations(){
     return{
      course:{
             title:{
                 required: helpers.withMessage('Course Title name can not be empty',required),
               },
             code:{
                 required: helpers.withMessage('Course code can not be empty',required),
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
                 required: helpers.withMessage('Program can not be empty',required),
                 numeric:helpers.withMessage('Year should be only number',numeric),
              },
             semester_no:{
                 required: helpers.withMessage('Semester can not be empty',required),
                 numeric:helpers.withMessage('Semester should be only number',numeric),
              },
             type:{
                 required: helpers.withMessage('Type should be selected',required),
                 alpha:helpers.withMessage('Type must be only alpahbet letters',alpha),
              } 
            }
     }
  },
  methods:{
      showAddModal(){
        this.actionButtonType='add'
        this.addBaseModal.show()
      },
      removeModalValue(){
        this.course=''
      },
      showEditModal(index){
        this.course=this.courses[index]
        this.actionButtonType='edit'
        this.addBaseModal.show()
      },
      edit(){
        this.request('updateCourse','Course updated successfully','Faild to add update')
      },
      save(){
        this.request('addCourse','Course added successfully','Faild to add course')
      },
     async request(action, successMessage, errorMessage){
       
       this.v$.$validate()
       if(!this.v$.$error){
         this.isSaving=true
          await this.$store.dispatch(action,this.course)
          .then(()=>{
           this.isNotSucceed=false,
           this.responseMessage=successMessage
           
         }).catch((e)=>{
           this.isNotSucceed=true,
           this.responseMessage=errorMessage
           console.log('response with status'+e)
         }).finally(()=>{
          this.isSaving=false
         })
      
       }
       else{
         console.log('form  validation faild')
       }
      },
     
    },
  mounted() {
   this.addBaseModal = new Modal(document.getElementById('addBaseModal'));
  }
}
</script>
<style scoped>
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
.btn-add{
    background-color: #ff9500;
}
.btn-add:hover{
  background-color: #eca643;
}

.search, .action{
  cursor: pointer;
}
.action:hover{
  color: #fcc561;
}
input[type="radio"]:checked{
 background-color: #ff9500;
 border: none;
}
.search-input{
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
.warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;
    font-size: 14px;
  }

  .input-group{
    padding: 0 !important;
    margin: 0 !important;
  }
</style>
