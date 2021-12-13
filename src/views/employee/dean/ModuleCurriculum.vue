<template>
<base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-between">
    <div class="d-flex ">
      <div class="d-flex border rounded me-3">
          <input type="text" class="form-control search-input" placeholder="Course code" aria-label="search" aria-describedby="basic-addon2"/>
             <span  class="input-group-text search rounded-0" id="basic-addon2">
                <i class="fas fa-search"></i>
          </span>           
     </div>
      <div> 
          <select class=" form-select " @change="filterByDepartment($event)" aria-label="select by department">
            <option value="all">All Department</option>
            <option v-for="department in tvetDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
          </select>
       </div>
      <div> 
          <select class="form-select mx-3" aria-label="select by level">
            <option>Occupation Level</option>
            <option v-for="level in filteredDepartment?.levels" :key="level.id">{{'Level '+level.level_no}}</option>
          </select>
      </div>
      
    </div>
   <button class="btn btn-add text-white shadow-sm" @click="showAddModal"> Add New Module</button> 
</div>

<table class="mt-3">
  <tr class="table-header">
    <th class="text-white">No</th>
    <th class="text-white">Module Code</th>
    <th class="text-white">Module Title</th>
    <th class="text-white">Training Hour</th>
    <th class="text-white">Department</th>
    <th class="text-white">Occupation Level</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr v-for="(modul, index) in modules" :key="modul.id" class="border border-secondary rounded">
    <td>{{index+1}}</td>
    <td>{{modul.code}}</td>
    <td>{{modul.title}}</td>
    <td>{{modul.training_hour}}</td>
    <td>{{modul.department?.name}}</td>
    <td>{{'Level '+ modul.level}}</td>
    <td>
      <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li><span @click="showEditModal(index)" class="dropdown-item">Edit</span></li>
          </ul>
      </div>
    </td>
  </tr>
 </table>
</base-card>
<base-modal @save="save" @edit="edit" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType">
   <template #modalBody>
      <form @submit.prevent>
         <div class="mb-3" :class="{warining:v$.modul.title.$error}">
              <label for="#moduleTitle" class="form-label">Module Title</label>
              <input class="form-control " v-model.trim="modul.title" @blur="v$.modul.title.$touch" id="moduleTitle" type="text" placeholder="Eg. Work with Others" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.modul.title.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
         <div class="mb-3" :class="{warining:v$.modul.code.$error}">
              <label for="#moduleCode" class="form-label">Module Code</label>
              <input class="form-control " v-model.trim="modul.code" @blur="v$.modul.code.$touch" id="moduleCode" type="text" placeholder="Eg. EIS BCW1 02 0919" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.modul.code.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
          <div class="mb-3" :class="{warining:v$.modul.training_hour.$error}">
              <label for="#trainingHours" class="form-label">Training hours</label>
              <input class="form-control " v-model.trim="modul.training_hour" @blur="v$.modul.training_hour.$touch" id="trainingHours" type="number" aria-label=".form-control">
              <span class="error-msg mt-1"  v-for="(error, index) of v$.modul.training_hour.$errors" :key="index">{{ error.$message+", " }}</span>
         </div> 
        <div class="row">
            <div class="col mb-3" :class="{warining:v$.modul.tvet_department_id.$error}">
                <div class="form-label" for="#department">Department</div>
                <select class="form-select" v-model.trim="modul.tvet_department_id" @change="setDepartmentLevels($event)" @blur="v$.modul.tvet_department_id.$touch" aria-label="select">
                  <option v-for="department in tvetDepartments" :key="department.id"  :value="department.id">{{department.name}}</option>
                </select>
                <div>
                    <span class="error-msg mt-1"  v-for="(error, index) of v$.modul.tvet_department_id.$errors" :key="index">{{ error.$message+", " }}</span>
                </div>
            </div> 
            <div class="col mb-3" :class="{warining:v$.modul.level_id.$error}">
                <label class="form-label" for="#program">Occupation level</label>
                <select class=" form-select" v-model.trim="modul.level_id" @blur="v$.modul.level_id.$touch"  id="program" aria-label="select">
                   <option v-for="level in selectedDepartment?.levels" :key="level.id"  :value="level.id">{{'Level '+level.level_no}}</option>
                </select>
                <div>
                     <span class="error-msg mt-1"  v-for="(error, index) of v$.modul.level_id.$errors" :key="index">{{ error.$message+", " }}</span>
                </div>
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
import {required,helpers,numeric} from '@vuelidate/validators'
import {mapGetters} from 'vuex'
export default {

  data(){
    return{ 
      v$:useValidate(),
      addBaseModal:null,
      isSaving:false,
      actionButtonType:'',
      isNotSucceed:'',
      responseMessage:'',
      selectedDepartment:null,
      filteredDepartment:null,
      modul:{
         title:'',
         code:'',
         training_hour:'',
         tvet_department_id:'',
         level_id:'',
      }
      
    }
  },
  validations(){
     return{
      modul:{
             title:{
                 required: helpers.withMessage('Module title  can not be empty',required),
               },
             code:{
                 required: helpers.withMessage('Module code can not be empty',required),
              },
             training_hour:{
                 required: helpers.withMessage('Training hours can not be empty',required),
                 numeric: helpers.withMessage('Training hours must be only number',numeric)
              }, 
             tvet_department_id:{
                 required: helpers.withMessage('Department should be selected',required),
                 numeric,
              },
             level_id:{
                 required: helpers.withMessage('Occupation level should be selected',required),
                 numeric,
              }
            }
     }
  },
   computed:{
    ...mapGetters(['modules','tvetDepartments','tvetPrograms'])
  },
  methods:{
      showAddModal(){
        this.actionButtonType='add'
        this.addBaseModal.show()
      },
      showEditModal(index){
        this.modul=this.modules[index]
        this.actionButtonType='edit'
        this.addBaseModal.show()
      },
      setDepartmentLevels(event){
        this.selectedDepartment=this.getDepartmentById(event.target.value)
        console.log('selected department', this.selectedDepartment)
      },
      filterByDepartment(event){
       this.filteredDepartment=this.getDepartmentById(event.target.value)
      },
      getDepartmentById(id){
        let dep;
        this.tvetDepartments.forEach((department)=>{
           console.log('department id', department.id)
          if( department.id==id){
            dep=department
          }      
        })
        return dep
      },
      edit(){
         this.request('updateModule', 'Course updated successfully', 'Faild to update course')
      },
      save(){
         this.request('addModule', 'Course added successfully', 'Faild to add course')
      },
     async request(action, successMessage, errorMessage){
       this.v$.$validate()
       if(!this.v$.$error){
         this.isSaving=true
          await this.$store.dispatch(action,this.modul)
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
    console.log('modules from view', this.modules)
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
.search{
  cursor: pointer;
}
.search-input{
    border-bottom-right-radius: 0 !important;
    border-top-right-radius: 0 !important;
}
.action{
  cursor: pointer;
}
.action:hover{
  color: #fcc561;
}
input[type="radio"]:checked{
 background-color: #ff9500;
 border: none;
}
.warining input{
    border: 1px red solid;
  }
  .warining span{
    display: inline;
    color: red;
    font-size: 14px;
  }
</style>
