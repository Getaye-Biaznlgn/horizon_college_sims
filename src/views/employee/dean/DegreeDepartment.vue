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
    <th>Abbreviation</th>
    <th>Department Head</th>
    <th><span class="sr-only"></span></th>
  </tr>
  <tr v-for="(department, index) in degreeDepartments" :key="department.id">
    <td>{{index+1}}</td>
    <td>{{department.name}}</td>
    <td>{{department.short_name}}</td>
    <td>{{department.department_head}}</td>
    <td>
     <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="showDetailModal(department)"><span class="dropdown-item">Detail</span></li>
             <li @click="showEditModal(department)"><span   class="dropdown-item">Edit</span></li>
             <li @click="showDeleteModal(department)"><span   class="dropdown-item">Delete</span></li>
             <li v-if="!department.department_head" @click="showAssignModal(department)"><span  class="dropdown-item" >Assign Head</span></li>
             <li v-else @click="showUnassignBaseModal(department)"><span class="dropdown-item">Unassign Head</span> </li>
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
           <input class="form-control " v-model.trim="department.name" @blur="v$.department.name.$touch" id="departmentName" type="text" placeholder="Eg. Management" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.department.name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div> 
   
        <div class="mb-3" :class="{warining:v$.department.short_name.$error}">
           <label for="#departmentName" class="form-label">Abbreviation</label>
           <input class="form-control " v-model.trim="department.short_name" @blur="v$.department.short_name.$touch" id="shortName" type="text" placeholder="Eg. mgt" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.department.short_name.$errors" :key="index">{{ error.$message+", " }}</span>
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
                 <option  v-for="head in unassignedHeads" :key="head.id"  :value="head.id">{{head.first_name+' '+ head.last_name}}</option>
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
      <div class="my-3">Do you want to remove <i>{{unassignDepHead.name}}'s </i> head?</div>
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
    <td>{{program.no_of_year}}</td>
    <td>{{program.no_of_semester}}</td>
    
  </tr> 
 </table>
 </template>
</base-modal>

</template>


<script>
import { Modal } from 'bootstrap';
import {mapGetters} from 'vuex'
import {required,helpers, maxLength} from '@vuelidate/validators'
import useValidate from '@vuelidate/core'
import apiClient from '../../../resources/baseUrl'
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
        short_name:'',
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
      unassignDepHead:{},
      depForDelete:{},
      unassignedHeads:[]
    }
  },
  computed:{
    ...mapGetters({degreeDepartments:'dean/degreeDepartments'})
  },
  created(){
      this.fetchUnassignedHeads()
  },
  validations(){
     return{
      department:{
             name:{
                required: helpers.withMessage('department name can not be empty',required),
               },
               short_name:{
                required: helpers.withMessage('Short name can not be empty',required),
                max: helpers.withMessage('Abbreviation should be 3 letters', maxLength(3))
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
        this.department.short_name=dep.short_name
        this.department.regular.noYear=dep.programs[0].no_of_year
        this.department.regular.noSemester=dep.programs[0].no_of_semester
        this.department.extension.noYear=dep.programs[1].no_of_year
        this.department.extension.noSemester=dep.programs[1].no_of_semester
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
         this.unassignDepHead={...dep}
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
          await this.$store.dispatch('dean/unAssignDegreeHead',{
            employee_id:this.unassignDepHead.head_id,
            department_id:this.unassignDepHead.id

          })
          .then(()=>{
           this.unassignedHeads.push({
                    id:this.unassignDepHead.id,
                    first_name:this.unassignDepHead.department_head,
                    //since this.unassignDepHead.department_head contains full name, last name will be empity string
                    last_name:''
                    })
           this.isNotSucceed=false,
          this.unassignBaseModal.hide()
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage='Faild to remove Department Head'
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
          const index= this.unassignedHeads.findIndex((head)=>{
             return head.id===this.assignDepartmentHead.employee_id
           })
           this.unassignedHeads.splice(index,1)
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
       this.request('dean/updateDegreeDepartment')
      },
      save() {
          this.request('dean/addDegreeDepartment')
      },
    async  request(action){
       this.responseMessage=''
       this.v$.$validate()
       if(!this.v$.$error){
          this.isSaving=true
          await this.$store.dispatch(action,{
          id:this.department.id,
           name:this.department.name,
           short_name:this.department.short_name,
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
       
           this.addBaseModal.hide()
           this.clearAddModal()
         }).catch((e)=>{
           this.isNotSucceed=true,
           this.responseMessage=e
         }).finally(()=>{
          this.isSaving=false
         })
       }
  
      },
       async fetchUnassignedHeads(){
         this.$store.commit('setIsItemLoading', true)
        try {
            var response = await apiClient.get("/api/unassigned_department_heads")
            if (response.status === 200) {
              this.unassignedHeads=response.data
            } else {
              throw 'Failed to fetch event'
            }
        }finally {
            this.$store.commit('setIsItemLoading', false)
        }
       },
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
