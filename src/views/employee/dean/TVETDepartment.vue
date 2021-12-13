<template>
<base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-end">
   <button class="btn btn-add text-white shadow-sm" @click="showAddModal"> Add New Department</button> 
</div>

<table class="mt-3">
  <tr class="table-header">
    <th class="text-white">No</th>
    <th class="text-white">Department Name</th>
    <th class="text-white">Sector</th>
    <th class="text-white">Department Head</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr v-for="(department, index) in tvetDepartments" :key="department.id" class="border border-secondary rounded">
    <td>{{index +1 }}</td>
    <td>{{department.name}}</td>
    <td>{{department.sector}}</td>
    <td>{{department.department_head}}</td>
    <td>
        <div class="dropdown">
          <a class="btn py-0 " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <span><i class="fas fa-ellipsis-v"></i></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
             <li @click="showDetailModal(index)"><span class="dropdown-item">Detail</span></li>
             <li @click="showEditModal(index)"><span  class="dropdown-item" >Edit</span></li>
             <li @click="showAssignModal(index)"><span  class="dropdown-item">Assign Head</span></li>
          </ul>
        </div>
    </td>
  </tr>
 </table>
</base-card>
<base-modal @save="save" :isLoading="isSaving" id="addBaseModal" :button-type="actionButtonType" @edit="edit">
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3" :class="{warining:v$.department.name.$error}">
           <label for="#departmentName" class="form-label">Department Name</label>
           <input class="form-control form-control-sm" v-model.trim="department.name" @blur="v$.department.name.$touch" id="departmentName" type="text" placeholder="Eg. Accounting" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.department.name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div> 
       
       <div class="mb-3" :class="{warining:v$.department.sector.$error}">
           <label for="#departmentSector" class="form-label">Sector</label>
           <input class="form-control form-control-sm" v-model.trim="department.sector" @blur="v$.department.sector.$touch" id="departmentSector" type="text" aria-label=".form-control">
           <span class="error-msg mt-1"  v-for="(error, index) of v$.department.sector.$errors" :key="index">{{ error.$message+", " }}</span>
       </div> 
           <div class="mb-3">
              <label class="form-label" for="#level1">Level I Occupation Name</label>
              <input class="form-control form-control-sm" v-model.trim="department.levelOneOccupationName" id="level1"  type="text"  aria-label=".form-control-lg">
           </div> 

           <div class="mb-3">
              <label class="form-label" for="#level2">Level II Occupation Name</label>
              <input class="form-control form-control-sm" v-model.trim="department.levelTwoOccupationName" id="level2" type="text"  aria-label=".form-control-lg">
           </div> 
        
           <div class="mb-3">
              <label class="form-label" for="#level3">Level III Occupation Name</label>
              <input class="form-control form-control-sm" v-model.trim="department.levelThreeOccupationName" id="level3" type="text"  aria-label=".form-control-lg">
           </div> 
           <div class="mb-3">
              <label class="form-label " for="#level4">Level VI Occupation Name</label>
              <input class="form-control form-control-sm" v-model.trim="department.levelFourOccupationName" id="level4" type="text"  aria-label=".form-control-lg">
           </div> 
      </form>
      <request-status-notifier :notificationMessage="responseMessage" :isNotSucceed="isNotSucceed" ></request-status-notifier>
   </template>
</base-modal>
<!-- detail -->
<base-modal @save="edit" id="detailBaseModal" :button-type="actionButtonType" @detail="forwardToEdit">
<template #modalBody>
   <div class="d-flex my-3 justify-content-between">
     <div>Department Name</div>
     <div>{{detailShowingDepartment?.name}}</div>
   </div>
<table class="mt-3">
  <tr class="table-header">
    <th class="text-white">Level</th>
    <th class="text-white">Occupation</th>
  </tr>
  <tr v-for="level in detailShowingDepartment?.levels" :key="level?.level_no">
    <td>{{level.level_no}}</td>
    <td>{{level.occupation_name}}</td>
  </tr> 
 </table>
 </template>
</base-modal>

<!-- assign -->
<base-modal  id="assignBaseModal"    :button-type="actionButtonType" :isLoading="isSaving" @assign="assignHead" @cancel="cancelAssignModal">
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
</template>

<script>
import {Modal} from 'bootstrap'
import useValidate from '@vuelidate/core'
import { required,helpers} from '@vuelidate/validators'
import { mapGetters } from 'vuex'

export default {
    
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
      //department
      department:{
        id:'',
      name:'',
      sector:'',
      levelOneOccupationName:'',
      levelTwoOccupationName:'',
      levelThreeOccupationName:'',
      levelFourOccupationName:'',
      },
       assignDepartmentHead:{
        department_id:'',
        employee_id:''
      }
      
    }
  },
  validations(){
     return{
      department:{
             name:{
               required: helpers.withMessage('department name can not be empty',required),
             },
             sector:{
               required: helpers.withMessage('sector can not be empty',required),
             },
        }
     }
  },
  computed:{
    ...mapGetters(['tvetDepartments','tvetLevels','departmentHeads'])
  },
  methods:{
      showAddModal(){
        this.actionButtonType="add"
        this.addBaseModal.show()
      },
      showDetailModal(index){
        this.actionButtonType="detail"
        this.detailShowingDepartment=this.tvetDepartments[index]
        this.detailBaseModal.show()
      },
       showAssignModal(index){
        this.assignDepartmentHead.department_id=this.tvetDepartments[index].id
        this.actionButtonType='assign'      
        this.assignBaseModal.show()
      },

      showEditModal(index){

        let department=this.tvetDepartments[index]
        console.log('show edit tvet department', department)
        this.actionButtonType="edit"
        this.department.id=department['id']
        this.department.name=department.name
        this.department.sector=department.sector
        this.department.levelOneOccupationName=department.levels[0].occupation_name
        this.department.levelTwoOccupationName=department.levels[1].occupation_name
        this.department.levelThreeOccupationName=department.levels[2].occupation_name
        this.department.levelFourOccupationName=department.levels[3].occupation_name
      
        this.addBaseModal.show()
      },
        async assignHead(){
         this.responseMessage=''
          this.isSaving=true
          await this.$store.dispatch('assignTvetDepartmentHead',this.assignDepartmentHead)
          .then(()=>{
           this.isNotSucceed=false,
           this.responseMessage='Department Head assigned successfully'
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
        this.request('updateTvetDepartment','department updated successfully', 'Faild to update department')
      },
      save(){
        this.request('addTvetDepartment','department added successfully', 'Faild to add department')
      },
     async request(action,successMessage, errorMessage){
       this.v$.$validate()
       if(!this.v$.$error){
         this.isSaving=true
          await this.$store.dispatch(action,{
           id:this.department.id ,
           name:this.department.name,
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
         }).then(()=>{
           this.isNotSucceed=false,
           this.responseMessage=successMessage
           console.log('response with status')
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
      },
    
    },
  mounted() {
   this.addBaseModal = new Modal(document.getElementById('addBaseModal'));
   this.detailBaseModal=new Modal(document.getElementById('detailBaseModal'));
   this.assignBaseModal=new Modal(document.getElementById('assignBaseModal'))
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
  }
</style>