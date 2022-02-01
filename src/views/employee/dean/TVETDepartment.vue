<template>
<base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-end">
   <button class="btn btn-add text-white shadow-sm" @click="showAddModal"> Add New Department</button> 
</div>

<table class="mt-3">
  <tr>
    <th>No</th>
    <th>Department Name</th>
    <th>Abbreviation</th>
    <th>Sector</th>
    <th>Department Head</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr v-for="(department, index) in tvetDepartments" :key="department.id">
    <td>{{index +1 }}</td>
    <td>{{department.name}}</td>
    <td>{{department.short_name}}</td>
    <td>{{department.sector}}</td>
    <td>{{department.department_head}}</td>
    <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="showDetailModal(index)"><span class="dropdown-item">Detail</span></li>
             <li @click="showEditModal(department)"><span  class="dropdown-item" >Edit</span></li>
             <li @click="showDeleteModal(department)"><span   class="dropdown-item">Delete</span></li>
             <li v-if="!department.department_head" @click="showAssignModal(department)"><span  class="dropdown-item">Assign Head</span></li>
             <li v-else  @click="showUnassignBaseModal(department)"><span class="dropdown-item">Unassign Head</span> </li>
          </ul>
        </div>
    </td>
  </tr>
 </table>
 <div v-if="!tvetDepartments.length" class="text-center">TVET Department isn't added yet!</div>
</base-card>

<!-- //add -->
 <base-modal @save="save" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType" @edit="edit" @cancel="clearAddModal">
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3" :class="{warining:v$.department.name.$error}">
           <label for="#departmentName" class="form-label">Department Name</label>
           <input class="form-control" v-model.trim="department.name" @blur="v$.department.name.$touch" id="departmentName" type="text" placeholder="Eg. Accounting" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.department.name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div> 
       
       <div class="mb-3" :class="{warining:v$.department.short_name.$error}">
           <label for="#departmentShort" class="form-label">Abbreviation</label>
           <input class="form-control" v-model.trim="department.short_name" @blur="v$.department.short_name.$touch" id="departmentShort" type="text" placeholder="Eg. Accounting" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.department.short_name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div> 

       <div class="mb-3" :class="{warining:v$.department.sector.$error}">
           <label for="#departmentSector" class="form-label">Sector</label>
           <input class="form-control" v-model.trim="department.sector" @blur="v$.department.sector.$touch" id="departmentSector" type="text" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.department.sector.$errors" :key="index">{{ error.$message+", " }}</span>
       </div> 
           <div class="mb-3">
              <label class="form-label" for="#level1">Level I Occupation Name</label>
              <input class="form-control" v-model.trim="department.levelOneOccupationName" id="level1"  type="text"  aria-label=".form-control-lg">
           </div> 

           <div class="mb-3">
              <label class="form-label" for="#level2">Level II Occupation Name</label>
              <input class="form-control" v-model.trim="department.levelTwoOccupationName" id="level2" type="text"  aria-label=".form-control-lg">
           </div> 
        
           <div class="mb-3">
              <label class="form-label" for="#level3">Level III Occupation Name</label>
              <input class="form-control" v-model.trim="department.levelThreeOccupationName" id="level3" type="text"  aria-label=".form-control-lg">
           </div> 
           <div class="mb-3">
              <label class="form-label " for="#level4">Level IV Occupation Name</label>
              <input class="form-control" v-model.trim="department.levelFourOccupationName" id="level4" type="text"  aria-label=".form-control-lg">
           </div> 
      </form>
      <request-status-notifier :notificationMessage="responseMessage" :isNotSucceed="isNotSucceed" ></request-status-notifier>
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
<base-modal id="unassignBaseModal" :button-type="actionButtonType" :isLoading="isSaving" @deleteItem="unAssign" @cancel="clearDeleteModal">
   <template #modalBody>
      <div class="form-label fw-bold">Unassign</div>
      <div class="my-3">Do you want to remove <i>{{unassignDepHead.name}}'s </i> head?</div>
      <request-status-notifier :notificationMessage='responseMessage' :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>

<!-- detail -->
<base-modal @save="edit" id="detailBaseModal" :button-type="actionButtonType">
<template #modalBody>
   <div class="d-flex my-3 justify-content-between">
     <div>Department Name</div>
     <div>{{detailShowingDepartment?.name}}</div>
   </div>
<table class="mt-3">
  <tr class="table-header">
    <th >Level</th>
    <th >Occupation</th>
  </tr>
  <tr v-for="level in detailShowingDepartment?.levels" :key="level?.level_no">
    <td>{{level.level_no}}</td>
    <td>{{level.occupation_name}}</td>
  </tr> 
 </table>
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
</template>

<script>
import {Modal} from 'bootstrap'
import useValidate from '@vuelidate/core'
import { required,helpers} from '@vuelidate/validators'
import { mapGetters } from 'vuex'
import apiClient from '../../../resources/baseUrl'
export default {
    //deleteTvetDepartment
  data(){
    return{ 
      v$:useValidate(),
      addBaseModal:null,
      detailBaseModal:null,
      isSaving:false,
      actionButtonType:'',
      responseMessage:'',
      isNotSucceed:'',
      assignBaseModal:null,
      detailShowingDepartment:null,
      unassignBaseModal:null,
      //department
      department:{
        id:'',
      name:'',
      short_name:'',
      sector:'',
      levelOneOccupationName:'',
      levelTwoOccupationName:'',
      levelThreeOccupationName:'',
      levelFourOccupationName:'',
      },
       assignDepartmentHead:{
        department_id:'',
        employee_id:''
      },
      unassignDepHead:{},
      unassignedHeads:[],
      depForDelete:''
    }
  },
  validations(){
     return{
      department:{
             name:{
               required: helpers.withMessage('department name can not be empty',required),
             },
             short_name:{
               required: helpers.withMessage('Short name can not be empty',required),
             },
             sector:{
               required: helpers.withMessage('sector can not be empty',required),
             },
        }
     }
  },
  computed:{
    ...mapGetters({tvetDepartments:'dean/tvetDepartments',tvetLevels:'dean/tvetLevels'})
  },
  methods:{
      showAddModal(){
        this.actionButtonType="add"
        this.addBaseModal.show()
      },
      clearAddModal(){
       this.department={} 
       this.responseMessage=''
       this.v$.$reset()
      },
      showDetailModal(index){
        this.actionButtonType="detail"
        this.detailShowingDepartment=this.tvetDepartments[index]
        this.detailBaseModal.show()
      },
       showAssignModal(dep){
        this.assignDepartmentHead.department_id=dep.id
        this.actionButtonType='assign'      
        this.assignBaseModal.show()
      },
        showDeleteModal(dep){
        this.depForDelete=dep
        this.actionButtonType='delete'
        this.deleteBaseModal.show()
      },
       showUnassignBaseModal(dep){
         this.unassignDepHead=dep
         this.actionButtonType='delete'
         this.unassignBaseModal.show()
      },
        clearDeleteModal(){
        this.responseMessage=''

      },
        async unAssign(){
         this.responseMessage=''
          this.isSaving=true
          await this.$store.dispatch('dean/unAssignTvetHead',{
            employee_id:this.unassignDepHead.head_id,
            department_id:this.unassignDepHead.id
          })
          .then(()=>{
             this.unassignedHeads.push({
                    id:this.unassignDepHead.head_id,
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
          await this.$store.dispatch('dean/deleteTvetDepartment',this.depForDelete.id)
          .then(()=>{
           this.isNotSucceed=false,
          this.deleteBaseModal.hide()
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage='Faild to Delete Department'
         }).finally(()=>{
          this.isSaving=false
         })
       },
      showEditModal(department){
        this.actionButtonType="edit"
        this.department.id=department?.id
        this.department.name=department.name
        this.department.short_name=department.short_name
        this.department.sector=department.sector
        this.department.levelOneOccupationName=department?.levels?.[0]?.occupation_name
        this.department.levelTwoOccupationName=department?.levels?.[1]?.occupation_name
        this.department.levelThreeOccupationName=department?.levels?.[2]?.occupation_name
        this.department.levelFourOccupationName=department?.levels?.[3]?.occupation_name
        this.addBaseModal.show()
      },
        async assignHead(){
         this.responseMessage=''
          this.isSaving=true
          await this.$store.dispatch('dean/assignTvetDepartmentHead',this.assignDepartmentHead)
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
      edit(){
        this.request('dean/updateTvetDepartment','department updated successfully', 'Faild to update department')
      },
      save(){
        this.request('dean/addTvetDepartment','department added successfully', 'Faild to add department')
      },
     async request(action,successMessage, errorMessage){
       this.v$.$validate()
       if(!this.v$.$error){
         this.isSaving=true
          await this.$store.dispatch(action,{
           id:this.department.id ,
           name:this.department.name,
           short_name:this.department.short_name,
           sector:this.department.sector,
           levels:[{
             occupation_name:this.department.levelOneOccupationName,
             level_no:1,
           },
           {
             occupation_name:this.department.levelTwoOccupationName,
             level_no:2,
           },
           {
             occupation_name:this.department.levelThreeOccupationName,
             level_no:3,
           },
           {
             occupation_name:this.department.levelFourOccupationName,
             level_no:4,
           },
          ]
         })
         .then(()=>{
           this.isNotSucceed=false,
           this.clearAddModal()
           this.addBaseModal.hide()
         }).catch(()=>{
           this.isNotSucceed=true,
           this.responseMessage=errorMessage
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
   this.detailBaseModal=new Modal(document.getElementById('detailBaseModal'));
   this.assignBaseModal=new Modal(document.getElementById('assignBaseModal'))
   this.deleteBaseModal=new Modal(document.getElementById('deleteBaseModal'))
   this.unassignBaseModal=new Modal(document.getElementById('unassignBaseModal'))
  },
  created(){
    this.fetchUnassignedHeads()
  }
}
</script>
