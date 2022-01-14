<template>
  <base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-end">
   <button class="btn btn-add text-white shadow-sm" @click="showAddModal()"> 
     Add New Department
   </button> 
</div>

<table class="mt-3">
  <tr>
    <th>No</th>
    <th>Department Name</th>
    <th>Department Head</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr v-for="(department, index) in degreeDepartments" :key="department.id">
    <td>{{index+1}}</td>
    <td>{{department.name}}</td>
    <td>{{department.department_head}}</td>
    <td>
     <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="showDetailModal(department)"><span class="dropdown-item">Detail</span></li>
             <li ><span  @click="showEditModal(department)" class="dropdown-item">Edit</span></li>
             <li ><span @click="showDeleteModal(department)"  class="dropdown-item">Delete</span></li>
             <li v-if="!department.department_head" @click="showAssignModal(department)"><span  class="dropdown-item" >Assign Head</span></li>
             <li v-else  @click="showUnassignBaseModal(department)"><span class="dropdown-item">Unassign</span> </li>
          </ul>
      </div>
    </td>
  </tr>
 </table>
   <div v-if="!degreeDepartments.length" class="text-center">Degree Department isn't added yet!</div>
 </base-card>

 <!--Add-->
<base-modal @save="save" @cancel="clearAddModal" :isLoading="isSaving" @edit="edit" id="addBaseModal" :button-type="actionButtonType" >
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3" :class="{warining:v$.department.name.$error}">
           <label for="#departmentName" class="form-label">Department Name</label>
           <input class="form-control " v-model.trim="department.name" @blur="v$.department.name.$touch" id="departmentName" type="text" placeholder="Eg. Accounting" aria-label=".form-control">
            <span class="error-msg mt-1"  v-for="(error, index) of v$.department.name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div> 
   
        <div class="my-2">Regular</div>
        <div class="row">
           <div class="col mb-3">
              <label class="form-label" for="#departmentName">How many years?</label>
              <input class="form-control " v-model.trim="department.regular.noYear" id="departmentName"  type="number" min="1" max="10" aria-label=".form-control-lg">
           </div> 
           <div class="col mb-3">
              <label class="form-label" for="#semesters">How many semesters?</label>
              <input class="form-control " v-model.trim="department.regular.noSemester" id="semesters" type="number"  min="1" max="30" aria-label=".form-control-lg">
           </div> 
       </div>

        <div class="my-2" >Extension</div>
        <div class="row">
           <div class="col mb-3">
              <label class="form-label" for="#departmentName">How many years?</label>
              <input class="form-control " v-model.trim="department.extension.noYear" id="departmentName" type="number"  min="1" max="10" aria-label=".form-control-lg">
           </div> 
           <div class="col mb-3">
              <label class="form-label " for="#semesters">How many semesters?</label>
              <input class="form-control " v-model.trim="department.extension.noSemester" id="semesters" type="number"  min="1" max="30" aria-label=".form-control-lg">
            </div> 
      </div>
      </form>
      <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>

<!-- assign -->
<base-modal  id="assignBaseModal" :button-type="actionButtonType" :isLoading="isSaving" @assign="assignHead" @cancel="cancelAssignModal">
   <template #modalBody>
     <div class="col mb-3">
          <div class="form-label" for="#department">Assign Department Head</div>
             <select class="form-select" v-model="assignDepartmentHead.employee_id"  aria-label="select">
                 <option  v-for="head in departmentHeads" :key="head.id"  :value="head.id">{{head.first_name+' '+ head.last_name}}</option>
             </select>
      </div>
     <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>

<!-- delete -->
<base-modal  id="deleteBaseModal" :button-type="actionButtonType" :isLoading="isSaving" @deleteItem="deleteItem" @cancel="clearDeleteModal">
   <template #modalBody>
      <div class="form-label fw-bold">Delete</div>
      <div class="my-3">Do you want to delete <i>{{depForDelete.name}}</i> department?</div>
      <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>

<!-- unassign -->
<base-modal  id="unassignBaseModal" :button-type="actionButtonType" :isLoading="isSaving" @deleteItem="unAssign" @cancel="clearDeleteModal">
   <template #modalBody>
      <div class="form-label fw-bold">Unassign</div>
      <div class="my-3">Do you want to remove <i>{{depForDelete.name}}'s </i> head?</div>
      <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>

<!-- detail -->
<base-modal  id="detailBaseModal" :button-type="actionButtonType">
<template #modalBody>
   <div class="d-flex my-3 justify-content-between">
     <div>Department Name</div>
     <div>{{detailShowingDepartment?.name}}</div>
   </div>
<table class="mt-3">
  <tr class="table-header">
    <th>Program</th>
    <th>Year</th>
    <th>Semester</th>
  </tr>
  <tr v-for="program in detailShowingDepartment?.programs"   :key="program.name">
    <td>{{program.name}}</td>
    <td>{{program.no_of_semester}}</td>
    <td>{{program.no_of_year}}</td>
  </tr> 
 </table>
 </template>
</base-modal>

</template>



<script>
import { Modal } from 'bootstrap';
import {mapGetters} from 'vuex'
import {required,helpers} from '@vuelidate/validators'
import useValidate from '@vuelidate/core'
import RequestStatusNotifier from '../../../components/RequestStatusNotifier.vue';
import BaseModal from '../../../components/BaseModal.vue';

export default {
  components: { RequestStatusNotifier, BaseModal },

  data(){
    return{ 
      v$:useValidate(),
      addBaseModal:null,
      detailBaseModal:null,
      assignBaseModal:null,
      deleteBaseModal:null,
      unassignBaseModal:null,
      //
      isSaving:false,
      detailShowingDepartment:null,
      
      actionButtonType:'',

      //server response issue
      responseMessage:'',
      isNotSucceed:true,
      //
      department:{
        id:'',
        name:'',
      regular:{
        noYear:'',
        noSemester:''
      },
      extension:{
        noYear:'',
        noSemester:''
      }
      },
      assignDepartmentHead:{
        department_id:'',
        employee_id:''
      },
      depForDelete:{}
      
    }
  },
  computed:{
    ...mapGetters({degreeDepartments:'dean/degreeDepartments',departmentHeads:'dean/departmentHeads'})
  },
  created(){
   
  },
  validations(){
     return{
      department:{
             name:{
                required: helpers.withMessage('department name can not be empty',required),
               },
             regular:{
               noYear:{
                 required:helpers.withMessage('Number of year can not be empty', required)
               }
             }  
           }
     }
  },
 
  methods:{
      showAddModal(){
        this.actionButtonType="add"
        this.addBaseModal.show()
      },
      showDeleteModal(dep){
        this.depForDelete=dep
        this.actionButtonType='delete'
        this.deleteBaseModal.show()
      },
      showEditModal(dep){
        this.department.id=dep.id
        this.department.name=dep.name
        this.department.regular.noYear=dep.programs[0].no_of_year
        this.department.regular.noSemester=dep.programs[0].no_of_semester
        this.department.extension.noYear=dep.programs[0].no_of_year
        this.department.extension.noSemester=dep.programs[0].no_of_semester
        this.actionButtonType="edit"
        //addBaseModal used for add and edit
        this.addBaseModal.show()
      },
      showDetailModal(dep){
       this.actionButtonType="detail"
       this.detailShowingDepartment=dep
       this.detailBaseModal.show()
      },
      showAssignModal(dep){
        this.assignDepartmentHead.department_id=dep.id
        this.actionButtonType='assign'      
        this.assignBaseModal.show()
      },
      showUnassignBaseModal(dep){
         this.depForDelete=dep
         this.actionButtonType='delete'
         this.unassignBaseModal.show()
      },
      clearAddModal(){
        this.department.name=''
        this.department.regular.noYear=''
        this.department.regular.noSemester=''
        this.department.extension.noYear=''
        this.department.extension.noSemester=''
        this.responseMessage=''
        this.v$.$reset()
      },
      clearDeleteModal(){
        this.responseMessage=''
      },
      async unAssign(){
         this.responseMessage=''
          this.isSaving=true
          await this.$store.dispatch('dean/unAssignDegreeHead',this.depForDelete.id)
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
        async deleteItem(){
         this.responseMessage=''
          this.isSaving=true
          await this.$store.dispatch('dean/deleteDegreeDepartment',this.depForDelete.id)
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
     async assignHead(){
         this.responseMessage=''
          this.isSaving=true
          await this.$store.dispatch('dean/assignDepartmentHead',this.assignDepartmentHead)
          .then(()=>{
           this.assignBaseModal.hide()
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage='Faild to assign Department Head'
         }).finally(()=>{
          this.isSaving=false
         })
       },
       cancelAssignModal(){
         this.responseMessage=''
         this.assignBaseModal.hide()
       },
      async edit(){
      this.request('dean/updateDegreeDepartment','department updated successfully', 'Faild to update department')
      },
      save() {
          this.request('dean/addDegreeDepartment','department added successfully', 'Faild to add department')
      },
    async  request(action, successMessage, errorMessage){
       this.responseMessage=''
       this.v$.$validate()
       if(!this.v$.$error){
          this.isSaving=true
          await this.$store.dispatch(action,{
          id:this.department.id,
           name:this.department.name,
           programs:[{
             no_of_semester:this.department.regular.noSemester,
             no_of_year:this.department.regular.noYear,
             type:'regular'
           },
           {
             no_of_semester:this.department.extension.noSemester,
             no_of_year:this.department.extension.noYear,
             type:'extension'
           },
          ]
         }).then(()=>{
           this.isNotSucceed=false,
           this.responseMessage=successMessage
           this.addBaseModal.hide()
           this.clearAddModal()
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage=errorMessage
         }).finally(()=>{
          this.isSaving=false
         })
      
       }
       else{
         console.log('form  validation faild')
       }
      }
     
    },
  mounted() {
   this.addBaseModal = new Modal(document.getElementById('addBaseModal'));
   this.detailBaseModal = new Modal(document.getElementById('detailBaseModal'));
   this.assignBaseModal = new Modal(document.getElementById('assignBaseModal'));
   this.deleteBaseModal = new Modal(document.getElementById('deleteBaseModal'));
   this.unassignBaseModal = new Modal(document.getElementById('unassignBaseModal'));
 }
}
</script>
<style scoped>
/* table {
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

.action{
  cursor: pointer;
}
.action:hover{
  color: #fcc561;
}
input[type="checkbox"]:checked{
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
  } */
</style>