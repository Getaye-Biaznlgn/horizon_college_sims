<template>
<base-card class="px-3 mx-4 mt-3">
<div class="d-flex justify-content-end">
   <button class="btn text-white shadow-sm" @click="showModal"> Add New Department</button> 
</div>

<table class="mt-3">
  <tr class="table-header">
    <th class="text-white">No</th>
    <th class="text-white">Department Name</th>
    <th class="text-white">Up to level</th>
    <th class="text-white">Department Head</th>
    <th><span class="sr-only">action</span></th>
  </tr>
  <tr class="border border-secondary rounded">
    <td>1</td>
    <td>Accounting</td>
    <td>Alemayehu Gelagay</td>
    <td></td>
  </tr>
 </table>
</base-card>
<base-modal @save="save" :isLoading="isSaving">
   <template #modalBody>
      <form @submit.prevent>
        <div class="mb-3" :class="{warining:v$.department.name.$error}">
           <label for="#departmentName" class="form-label">Department Name</label>
           <input class="form-control form-control-sm" v-model.trim="department.name" @blur="v$.department.name.$touch" id="departmentName" type="text" placeholder="Eg. Accounting" aria-label=".form-control">
            <span class="error-msg mt-1"  v-for="(error, index) of v$.department.name.$errors" :key="index">{{ error.$message+", " }}</span>
        </div> 
   
       <div class="form-check">
           <input class="form-check-input" @change="regularChecked" type="checkbox" value="" id="regualr">
           <label class="form-check-label" for="regular">Regular</label>
       </div>

        <div v-if="isRegularChecked" class="d-flex justify-content-between">
           <div class="mb-3">
              <label class="form-label" for="#departmentName">How many years?</label>
              <input class="form-control form-control-sm" v-model.trim="department.regular.year" id="departmentName"  type="number" min="1" max="10" aria-label=".form-control-lg">
           </div> 

           <div class="mb-3">
              <label class="form-label" for="#semesters">How many semesters?</label>
              <input class="form-control form-control-sm" v-model.trim="department.regular.semester" id="semesters" type="number"  min="1" max="30" aria-label=".form-control-lg">
            </div> 
      </div>
       <div class="form-check">
           <input class="form-check-input" @change="extensionChecked" type="checkbox"  id="extension">
           <label class="form-check-label" for="extension">Extension</label>
       </div>
        <div v-if="isExtensionChecked" class="d-flex justify-content-between">
           <div class="mb-3">
              <label class="form-label" for="#departmentName">How many years?</label>
              <input class="form-control form-control-sm" v-model.trim="department.extension.year" id="departmentName" type="number"  min="1" max="10" aria-label=".form-control-lg">
           </div> 
           <div class="mb-3">
              <label class="form-label " for="#semesters">How many semesters?</label>
              <input class="form-control form-control-sm" v-model.trim="department.extension.semester" id="semesters" type="number"  min="1" max="30" aria-label=".form-control-lg">
            </div> 
      </div>
      </form>
   </template>
</base-modal>
</template>

<script>
import {Modal} from 'bootstrap'
import useValidate from '@vuelidate/core'
import { required,alpha,helpers} from '@vuelidate/validators'

export default {
    
  data(){
    return{ 
      v$:useValidate(),
      baseModal:null,
      isSaving:false,
      isExtensionChecked:false,
      isRegularChecked:false,
      //department
      department:{
      name:'',
      regular:{
        year:'',
        semester:''
      },
      extension:{
        year:'',
        semester:''
      }
      }
      
    }
  },
  validations(){
     return{
      department:{
             name:{required: helpers.withMessage('department name can not be empty',required),
               alpha:helpers.withMessage('the value must be only alpahbet letters',alpha)
               },
              }
     }
  },
  methods:{
      showModal(){
        this.baseModal.show()
      },
      save(){
       this.isSaving=true
       this.v$.$validate()
       if(!this.v$.error){
         this.isSaving=false
       }
       else{
         console.log('form  validation faild')
       }
      },
      regularChecked(){
        this.isRegularChecked=!this.isRegularChecked
      },
      extensionChecked(){
        this.isExtensionChecked=!this.isExtensionChecked;
      }
    },
  mounted() {
   this.baseModal = new Modal(document.getElementById('baseModal'));
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
.btn{
    background-color: #ff9500;
    
}
.btn:hover{
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