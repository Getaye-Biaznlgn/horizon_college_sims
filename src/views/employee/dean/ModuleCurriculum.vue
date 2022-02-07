<template>
<base-card class="px-3 mx-4 mt-3">
<div>
    <div class="d-flex mb-2">
        <button class="btn btn-add ms-auto text-white shadow-sm" @click="showAddModal"> Add New Module</button> 
    </div>
    <div class="d-flex me-3">
      <div class="d-flex border rounded me-3">
          <input type="text" v-model.trim="searchValue" class="form-control search-input" placeholder="Course code" aria-label="search" aria-describedby="basic-addon2"/>
             <span  class="input-group-text search rounded-0" id="basic-addon2">
                <i class="fas fa-search"></i>
          </span>           
     </div>
      <div class="ms-auto"> 
          <select v-model="departmentForFilter" class=" form-select "  aria-label="select by department">
            <option value="all" selected>All Department</option>
            <option v-for="department in tvetDepartments" :key="department.id" :value="department.id">{{department.name}}</option>
          </select>
       </div>
      <div> 
          <select v-model="levelForFilter"  class="form-select mx-3" aria-label="select by level">
            <option value="all" selected>Occupation Level</option>
            <option value="1">Level 1</option>
            <option value="2">Level 2</option>
            <option value="3">Level 3</option>
            <option value="4">Level 4</option>
          </select>
      </div>
    </div>
</div>

<table class="mt-3">
  <tr>
    <th>No</th>
    <th>Module Code</th>
    <th>Units Of Competence</th>
    <th>Training Hour</th>
    <th>Department</th>
    <th>Occupation Level</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  
  <tr v-for="(modul, index) in filteredModules" :key="modul.id">
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
             <li @click="showEditModal(modul)"><span  class="dropdown-item">Edit</span></li>
             <li @click="showDeleteModal(modul)"><span class="dropdown-item">Delete</span></li>
          </ul>
      </div>
    </td>
  </tr>
</table>
  <p v-if="!modules.length" class="mt-1 text-center">There is no added module</p>
  <p v-if="modules.length && !filteredModules.length" class="mt-1 text-center">There is no filtered module</p>
</base-card>

<base-modal @save="save" @edit="edit" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType" @cancel="clearAddModal">
   <template #modalBody>
      <form @submit.prevent>
         <div class="mb-3" :class="{warining:v$.modul.title.$error}">
              <label for="#moduleTitle" class="form-label">Module Title</label>
              <input class="form-control " v-model.trim="modul.title" @blur="v$.modul.title.$touch" id="moduleTitle" type="text" placeholder="Eg. work with others" aria-label=".form-control">
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

<!-- delete -->
<base-modal  id="deleteBaseModal" :button-type="actionButtonType" :isLoading="isSaving" @deleteItem="deleteItem" @cancel="clearDeleteModal">
   <template #modalBody>
      <div class="form-label fw-bold">Delete</div>
      <div class="my-3">Do you want to delete <i>{{moduleForDelete.title}}</i> module?</div>
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
      
      //for search and filter
      searchValue:'',
      departmentForFilter:'all',
      levelForFilter:'all',

      modul:{
         title:'',
         code:'',
         training_hour:'',
         tvet_department_id:'',
         level_id:'',
      },
      deleteBaseModal:'',
      moduleForDelete:''
      
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
    ...mapGetters({modules:'dean/modules',tvetDepartments:'dean/tvetDepartments',tvetPrograms:'dean/tvetPrograms'}),
   selectedDepartment(){
     let dep;
      this.tvetDepartments.forEach((department)=>{
          if( department.id==this.modul.tvet_department_id){
            dep=department
          }      
        })
        return dep
   },
   filteredModules(){
      let tempModules=[...this.modules]
       if(this.searchValue!='' && this.searchValue){
         tempModules = tempModules.filter((item) => {
          return item.code
            .toUpperCase()
            .startsWith(this.searchValue.toUpperCase())
        })
       }
       //filter by department for filter
       if(this.departmentForFilter !=='all'){
            tempModules=tempModules.filter((item)=>{
              return Number(item.department.id)===Number(this.departmentForFilter)
            })
       }
       //filter level for filter
       if(this.levelForFilter !=='all'){
          tempModules=tempModules.filter((item)=>{
              return Number(item.level)===Number(this.levelForFilter)
            })
       }
       return tempModules 
    }
  },
  methods:{
      showAddModal(){
        this.actionButtonType='add'
        this.addBaseModal.show()
      },
      showEditModal(modul){
        this.modul={...modul}
        this.modul.tvet_department_id=modul.department?.id
        this.actionButtonType='edit'
        this.addBaseModal.show()
      },
        //  setDepartmentLevels(event){
       //   this.selectedDepartment=this.getDepartmentById(event.target.value)
      //    console.log('selected department'+this.selectedDepartment)
     // },
      // filterByDepartment(event){
     //  this.filteredModules =  this.modules.filter((module)=>{
    //      return module.department.id===event.target.value
   //    })
  // },
      // getDepartmentById(id){
      //   let dep;
      //   this.tvetDepartments.forEach((department)=>{
      //     if( department.id==id){
      //       dep=department
      //     }      
      //   })
      //   return dep
      // },
       
       showDeleteModal(modul){
        this.moduleForDelete={...modul}
        this.actionButtonType='delete'
        this.deleteBaseModal.show()
      },
      clearAddModal(){
         this.modul={}
         this.responseMessage=''
         this.v$.$reset()
      },
       clearDeleteModal(){
        this.responseMessage=''
      },
        async deleteItem(){
         this.responseMessage=''
          this.isSaving=true
          await this.$store.dispatch('dean/deleteModule',this.moduleForDelete.id)
          .then(()=>{
           this.isNotSucceed=false,
          this.deleteBaseModal.hide()
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage='Faild to delete Department Head'
         }).finally(()=>{
          this.isSaving=false
         })
       },
      edit(){
         this.request('dean/updateModule')
      },
      save(){
         this.request('dean/addModule')
      },
     async request(action){
       this.responseMessage=''
       this.v$.$validate()
       if(!this.v$.$error){
         this.isSaving=true
          await this.$store.dispatch(action,this.modul)
          .then(()=>{
           this.addBaseModal.hide()
           this.clearAddModal()
         }).catch((e)=>{
           this.isNotSucceed=true,
           this.responseMessage=e
         }).finally(()=>{
          this.isSaving=false
         })
       }
       else{
         console.log('form  validation faild')
       }
      },
  
    },
    created(){
       
    },
  mounted() {
   this.addBaseModal = new Modal(document.getElementById('addBaseModal'));
   this.deleteBaseModal = new Modal(document.getElementById('deleteBaseModal'));
  }
}
</script>
